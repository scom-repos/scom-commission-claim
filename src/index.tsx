import {
  Module,
  customModule,
  Markdown,
  Image,
  Label,
  Styles,
  Button,
  Container,
  application,
  customElements,
  ControlElement,
  IDataSchema
} from '@ijstech/components';
import { IConfig, INetworkConfig } from './interface';
import { isClientWalletConnected, State } from './store/index';
import { imageStyle, markdownStyle, tokenSelectionStyle } from './index.css';
import { claim, getClaimAmount } from './API';
import ScomDappContainer from '@scom/scom-dapp-container';
import configData from './data.json';
import { formatNumber } from './utils/index';
import { ITokenObject } from '@scom/scom-token-list';
import { Constants, IEventBusRegistry, Wallet } from '@ijstech/eth-wallet';
import ScomWalletModal, { IWalletPlugin } from '@scom/scom-wallet-modal';
import ScomTokenInput from '@scom/scom-token-input';
import ScomTxStatusModal from '@scom/scom-tx-status-modal';
import formSchema from './formSchema.json';

const Theme = Styles.Theme.ThemeVars;

interface ScomCommissionClaimElement extends ControlElement {
  lazyLoad?: boolean;
  description?: string;
  logo?: string;
  logoUrl?: string;
  defaultChainId: number;
  wallets: IWalletPlugin[];
  networks: INetworkConfig[];
  showHeader?: boolean;
  showFooter?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-commission-claim']: ScomCommissionClaimElement;
    }
  }
}

@customModule
@customElements('i-scom-commission-claim')
export default class ScomCommissionClaim extends Module {
  private state: State;
  private imgLogo: Image;
  private markdownDescription: Markdown;
  private lbClaimable: Label;
  private btnClaim: Button;
  private tokenSelection: ScomTokenInput;
  private txStatusModal: ScomTxStatusModal;
  private lblAddress: Label;
  private dappContainer: ScomDappContainer;
  private mdWallet: ScomWalletModal;

  private _data: IConfig = {
    defaultChainId: 0,
    wallets: [],
    networks: []
  };
  tag: any = {};
  defaultEdit: boolean = true;

  private rpcWalletEvents: IEventBusRegistry[] = [];

  constructor(parent?: Container, options?: ScomCommissionClaimElement) {
    super(parent, options);
    this.state = new State(configData);
  }

  removeRpcWalletEvents() {
    const rpcWallet = this.rpcWallet;
    for (let event of this.rpcWalletEvents) {
      rpcWallet.unregisterWalletEvent(event);
    }
    this.rpcWalletEvents = [];
  }

  onHide() {
    this.dappContainer.onHide();
    this.removeRpcWalletEvents();
  }

  static async create(options?: ScomCommissionClaimElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  private onChainChanged = async () => {
    if (this.tokenSelection) {
      this.tokenSelection.token = undefined;
    }
    await this.refreshWidget();
  }

  private refreshWidget = async () => {
    if (!this.lblAddress.isConnected) await this.lblAddress.ready();
    if (!this.imgLogo.isConnected) await this.imgLogo.ready();
    if (!this.markdownDescription.isConnected) await this.markdownDescription.ready();
    this.lblAddress.caption = this.state.getContractAddress('Proxy');
    let url = '';
    if (!this._data.logo && !this._data.logoUrl && !this._data.description) {
      url = 'https://placehold.co/150x100?text=No+Image';
    } else if (this._data.logo?.startsWith('ipfs://')) {
      url = this._data.logo.replace('ipfs://', this.state.ipfsGatewayUrl);
    } else {
      url = this._data.logo || this._data.logoUrl;
    }
    this.imgLogo.url = url;
    this.markdownDescription.load(this._data.description || '');
    await this.initWallet();
    this.updateBtnClaim(false);
    this.refetchClaimAmount(this.tokenSelection.token);
  }

  private updateBtnClaim = async (enabled: boolean) => {
    if (!this.btnClaim.isConnected) await this.btnClaim.ready();
    if (!isClientWalletConnected()) {
      this.btnClaim.enabled = true;
      this.btnClaim.caption = 'Connect Wallet';
    } else if (!this.state.isRpcWalletConnected()) {
      this.btnClaim.enabled = true;
      this.btnClaim.caption = 'Switch Network';
    } else {
      this.btnClaim.caption = 'Claim';
      this.btnClaim.enabled = enabled;
    }
  }

  private initWallet = async () => {
    try {
      await Wallet.getClientInstance().init();
      await this.rpcWallet.init();
    } catch (err) {
      console.log(err);
    }
  }

  private get chainId() {
    return this.state.getChainId();
  }

  private get rpcWallet() {
    return this.state.getRpcWallet();
  }


  get description() {
    return this._data.description ?? '';
  }

  set description(value: string) {
    this._data.description = value;
  }

  get logo() {
    return this._data.logo ?? '';
  }

  set logo(value: string) {
    this._data.logo = value;
  }

  get wallets() {
    return this._data.wallets ?? [];
  }
  set wallets(value: IWalletPlugin[]) {
    this._data.wallets = value;
  }

  get networks() {
    return this._data.networks ?? [];
  }
  set networks(value: INetworkConfig[]) {
    this._data.networks = value;
  }

  get showHeader() {
    return this._data.showHeader ?? true;
  }
  set showHeader(value: boolean) {
    this._data.showHeader = value;
  }

  get showFooter() {
    return this._data.showFooter ?? true;
  }
  set showFooter(value: boolean) {
    this._data.showFooter = value;
  }

  get defaultChainId() {
    return this._data.defaultChainId;
  }
  set defaultChainId(value: number) {
    this._data.defaultChainId = value;
  }

  private getData() {
    return this._data;
  }

  private async resetRpcWallet() {
    this.removeRpcWalletEvents();
    const rpcWalletId = await this.state.initRpcWallet(this.defaultChainId);
    const rpcWallet = this.rpcWallet;
    const chainChangedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.ChainChanged, async (chainId: number) => {
      this.onChainChanged();
    });
    const connectedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.Connected, async (connected: boolean) => {
      this.refreshWidget();
    });
    this.rpcWalletEvents.push(chainChangedEvent, connectedEvent);

    const data = {
      defaultChainId: this.defaultChainId,
      wallets: this.wallets,
      networks: this.networks,
      showHeader: this.showHeader,
      showFooter: this.showFooter,
      rpcWalletId: rpcWallet?.instanceId || ''
    }
    if (this.dappContainer?.setData) this.dappContainer.setData(data);
  }

  private async setData(data: IConfig) {
    this._data = data;
    await this.resetRpcWallet();
    if (!this.tokenSelection.isConnected) await this.tokenSelection.ready();
    if (this.tokenSelection.rpcWalletId !== this.rpcWallet.instanceId) {
      this.tokenSelection.rpcWalletId = this.rpcWallet.instanceId;
    }
    await this.refreshWidget();
  }

  private getTag() {
    return this.tag;
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this.tag[type] = this.tag[type] ?? {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop))
        this.tag[type][prop] = value[prop];
    }
  }

  private async setTag(value: any) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark')
          this.updateTag(prop, newValue[prop]);
        else
          this.tag[prop] = newValue[prop];
      }
    }
    this.updateTheme();
  }

  private updateStyle(name: string, value: any) {
    value ?
      this.style.setProperty(name, value) :
      this.style.removeProperty(name);
  }

  private updateTheme() {
    const themeVar = this.dappContainer?.theme || 'light';
    this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
    this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
  }

  private initTag() {
    const getColors = (vars: any) => {
      return {
        "backgroundColor": vars.background.main,
        "fontColor": vars.text.primary
      }
    }
    const defaultTag = {
      dark: getColors(Styles.Theme.darkTheme),
      light: getColors(Styles.Theme.defaultTheme)
    }
    this.setTag(defaultTag);
  }

  private async refetchClaimAmount(token?: ITokenObject) {
    if (!token) {
      this.lbClaimable.caption = '0.00';
      this.updateBtnClaim(false);
      return;
    };
    const claimAmount = await getClaimAmount(this.state, token);
    this.lbClaimable.caption = `${formatNumber(claimAmount)} ${token.symbol || ''}`;
    this.updateBtnClaim(claimAmount.gt(0));
  }

  private async selectToken(token: ITokenObject) {
    await this.refetchClaimAmount(token);
  }

  private async onClaim() {
    if (!isClientWalletConnected()) {
      if (this.mdWallet) {
        await application.loadPackage('@scom/scom-wallet-modal', '*');
        this.mdWallet.networks = this.networks;
        this.mdWallet.wallets = this.wallets;
        this.mdWallet.showModal();
      }
      return;
    }
    if (!this.state.isRpcWalletConnected()) {
      const clientWallet = Wallet.getClientInstance();
      await clientWallet.switchNetwork(this.chainId);
      return;
    }
    this.txStatusModal.message = {
      status: 'warning',
      content: 'Confirming'
    };
    this.txStatusModal.showModal();
    claim(this.state, this.tokenSelection.token, (error: Error, receipt?: string) => {
      if (error) {
        this.txStatusModal.message = {
          status: 'error',
          content: error
        };
        this.txStatusModal.showModal();
      }
    }, () => {
      this.refetchClaimAmount(this.tokenSelection.token);
    });
  }

  private _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions = [
      {
        name: 'Settings',
        icon: 'cog',
        command: (builder: any, userInputData: any) => {
          let _oldData: IConfig = {
            defaultChainId: 0,
            wallets: [],
            networks: []
          };
          return {
            execute: async () => {
              _oldData = { ...this._data };
              this._data.logo = userInputData.logo;
              this._data.logoUrl = userInputData.logoUrl;
              this._data.description = userInputData.description;
              this.setData(this._data);
              if (builder?.setData) builder.setData(this._data);
            },
            undo: () => {
              this.setData(_oldData);
              if (builder?.setData) builder.setData(_oldData);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: propertiesSchema
      },
      {
        name: 'Theme Settings',
        icon: 'palette',
        command: (builder: any, userInputData: any) => {
          let oldTag = {};
          return {
            execute: async () => {
              if (!userInputData) return;
              oldTag = JSON.parse(JSON.stringify(this.tag));
              if (builder) builder.setTag(userInputData);
              else this.setTag(userInputData);
              if (this.dappContainer) this.dappContainer.setTag(userInputData);
            },
            undo: () => {
              if (!userInputData) return;
              this.tag = JSON.parse(JSON.stringify(oldTag));
              if (builder) builder.setTag(this.tag);
              else this.setTag(this.tag);
              if (this.dappContainer) this.dappContainer.setTag(this.tag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: themeSchema
      }
    ]
    return actions
  }

  getConfigurators() {
    const self = this;
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          return this._getActions(formSchema.general.dataSchema as IDataSchema, formSchema.theme.dataSchema as IDataSchema);
        },
        getData: this.getData.bind(this),
        setData: async (data: IConfig) => {
          const defaultData = configData.defaultBuilderData;
          await this.setData({ ...defaultData, ...data });
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getActions: () => {
          return this._getActions(formSchema.general.embedderSchema as IDataSchema, formSchema.theme.dataSchema as IDataSchema);
        },
        getLinkParams: () => {
          const data = this._data || {};
          return {
            data: window.btoa(JSON.stringify(data))
          }
        },
        setLinkParams: async (params: any) => {
          if (params.data) {
            const utf8String = decodeURIComponent(params.data);
            const decodedString = window.atob(utf8String);
            const newData = JSON.parse(decodedString);
            let resultingData = {
              ...self._data,
              ...newData
            };
            await this.setData(resultingData);
          }
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }

  async init() {
    this.isReadyCallbackQueued = true;
    super.init();
    this.initTag();
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const description = this.getAttribute('description', true);
      const logo = this.getAttribute('logo', true);
      const logoUrl = this.getAttribute('logoUrl', true);
      const networks = this.getAttribute('networks', true);
      const wallets = this.getAttribute('wallets', true);
      const showHeader = this.getAttribute('showHeader', true);
      const showFooter = this.getAttribute('showFooter', true);
      const defaultChainId = this.getAttribute('defaultChainId', true);

      await this.setData({ description, logo, logoUrl, networks, wallets, showHeader, showFooter, defaultChainId });
    }
    this.isReadyCallbackQueued = false;
    this.executeReadyCallback();
  }

  render() {
    return (
      <i-scom-dapp-container id="dappContainer" showFooter={true} showHeader={true}>
        <i-panel background={{ color: Theme.background.main }}>
          <i-grid-layout
            id="gridDApp"
            maxWidth="500px"
            margin={{ right: "auto", left: "auto", top: '0.5rem', bottom: '0.5rem' }}
            height="100%"
          >
            <i-vstack
              gap={8}
              padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }}
              verticalAlignment="space-between" horizontalAlignment="center"
            >
              <i-label caption="Commission Claim" font={{ bold: true, size: '1rem' }} />
              <i-vstack gap={8}>
                <i-image id="imgLogo" class={imageStyle} height={100} />
                <i-markdown
                  id="markdownDescription"
                  class={markdownStyle}
                  width="100%"
                  height="100%"
                />
              </i-vstack>
              <i-vstack gap={12}>
                <i-hstack gap={8} width="100%" verticalAlignment="center">
                  <i-label caption="Token:" font={{ size: '0.875rem' }} margin={{ top: 8 }} />
                  <i-scom-token-input
                    id="tokenSelection"
                    type="combobox"
                    isBalanceShown={false}
                    isInputShown={false}
                    isCommonShown={false}
                    isBtnMaxShown={false}
                    isSortBalanceShown={false}
                    class={tokenSelectionStyle}
                    onSelectToken={this.selectToken}
                  />
                </i-hstack>
                <i-hstack width="100%" gap="0.5rem" verticalAlignment="center">
                  <i-label caption="Claimable:" font={{ size: '0.875rem' }} />
                  <i-label id="lbClaimable" caption="0.00" font={{ size: '0.875rem' }} />
                </i-hstack>
                <i-hstack horizontalAlignment="center" verticalAlignment='center' gap="8px">
                  <i-button
                    id="btnClaim"
                    width={180}
                    caption="Claim"
                    padding={{ top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }}
                    font={{ size: '0.875rem', color: Theme.colors.primary.contrastText }}
                    rightIcon={{ visible: false, fill: Theme.colors.primary.contrastText }}
                    background={{ color: Theme.colors.primary.main }}
                    onClick={this.onClaim}
                    enabled={false}
                  />
                </i-hstack>
              </i-vstack>
              <i-vstack gap={8}>
                <i-label id="lblRef" font={{ size: '0.75rem' }} />
                <i-label id="lblAddress" font={{ size: '0.75rem' }} overflowWrap="anywhere" />
              </i-vstack>
              <i-label caption="Terms & Condition" font={{ size: '0.75rem' }} link={{ href: 'https://docs.scom.dev/' }} />
            </i-vstack>
          </i-grid-layout>
          <i-scom-tx-status-modal id="txStatusModal" />
          <i-scom-wallet-modal id="mdWallet" wallets={[]} />
        </i-panel>
      </i-scom-dapp-container>
    )
  }
}