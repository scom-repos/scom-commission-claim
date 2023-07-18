import {
  Module,
  customModule,
  Markdown,
  Image,
  Label,
  Styles,
  Button,
  Container,
  IEventBus,
  application,
  customElements,
  ControlElement,
  IDataSchema
} from '@ijstech/components';
import { IConfig, INetworkConfig, IWalletPlugin } from './interface';
import { EventId, getContractAddress, getRpcWallet, initRpcWallet, isRpcWalletConnected, setDataFromConfig, getChainId } from './store/index';
import { TokenSelection } from './token-selection/index';
import { imageStyle, markdownStyle, tokenSelectionStyle } from './index.css';
import { Alert } from './alert/index';
import { claim, getClaimAmount } from './API';
import ScomDappContainer from '@scom/scom-dapp-container';
import configData from './data.json';
import { getImageIpfsUrl } from './utils/index';
import { ITokenObject } from '@scom/scom-token-list';
import { Constants, Wallet } from '@ijstech/eth-wallet';

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
      ["i-scom-commission-claim"]: ScomCommissionClaimElement;
    }
  }
}

@customModule
@customElements('i-scom-commission-claim')
export default class ScomCommissionClaim extends Module {
  private imgLogo: Image;
  private markdownDescription: Markdown;
  private lbClaimable: Label;
  private btnClaim: Button;
  private tokenSelection: TokenSelection;
  private mdAlert: Alert;
  private lblAddress: Label;
  private dappContainer: ScomDappContainer;

  private _data: IConfig = {
    defaultChainId: 0,
    wallets: [],
    networks: []
  };
  private $eventBus: IEventBus;
  tag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  private rpcWalletEvents: any = [];
  private clientEvents: any = [];

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    setDataFromConfig(configData);
    this.$eventBus = application.EventBus;
    this.registerEvent();
  }

  static async create(options?: ScomCommissionClaimElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  private registerEvent() {
    this.clientEvents.push(this.$eventBus.register(this, EventId.chainChanged, this.onChainChanged))
  }

  private onChainChanged = async () => {
    await this.onSetupPage();
  }

  private onSetupPage = async () => {
    if (!this.lblAddress.isConnected) await this.lblAddress.ready();
    if (!this.imgLogo.isConnected) await this.imgLogo.ready();
    if (!this.markdownDescription.isConnected) await this.markdownDescription.ready();
    this.lblAddress.caption = getContractAddress('Proxy');
    let url = '';
    if (!this._data.logo && !this._data.logoUrl && !this._data.description) {
      url = 'https://placehold.co/150x100?text=No+Image';
    } else {
      url = getImageIpfsUrl(this._data.logo) || this._data.logoUrl;
    }
    this.imgLogo.url = url;
    this.markdownDescription.load(this._data.description || '');
    try {
      await Wallet.getClientInstance().init();
    } catch { }
    if (this.tokenSelection.token) {
      this.refetchClaimAmount(this.tokenSelection.token);
    }
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

  private async setData(data: IConfig) {
    this._data = data;
    initRpcWallet(this.defaultChainId);
    const rpcWallet = getRpcWallet();
    const event = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.Connected, async (connected: boolean) => {
      await this.onSetupPage();
    });
    this.rpcWalletEvents.push(event);
    const containerData: any = {
      wallets: this.wallets,
      networks: this.networks,
      showHeader: this.showHeader,
      showFooter: this.showFooter,
      defaultChainId: this.defaultChainId,
      rpcWalletId: rpcWallet?.instanceId || ''
    }
    if (this.dappContainer?.setData) {
      this.dappContainer.setData(containerData)
    }
    await this.onSetupPage();
  }

  onHide() {
    this.dappContainer.onHide();
    const rpcWallet = getRpcWallet();
    for (let event of this.rpcWalletEvents) {
      rpcWallet.unregisterWalletEvent(event);
    }
    this.rpcWalletEvents = [];
    for (let event of this.clientEvents) {
      event.unregister();
    }
    this.clientEvents = [];
  }

  private getTag() {
    return this.tag;
  }

  private updateTag(type: 'light'|'dark', value: any) {
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

      await this.setData({description, logo, logoUrl, networks, wallets, showHeader, showFooter, defaultChainId});
    }
    this.isReadyCallbackQueued = false;
    this.executeReadyCallback();
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

  private async refetchClaimAmount(token: ITokenObject) {
    const claimAmount = await getClaimAmount(token);
    this.lbClaimable.caption = claimAmount.toFixed(4);
    this.btnClaim.enabled = claimAmount.gt(0);
  }

  private async selectToken(token: ITokenObject) {
    await this.refetchClaimAmount(token);
  }

  private async onClaim() {
    this.mdAlert.message = {
      status: 'warning',
      content: 'Confirming'
    };
    this.mdAlert.showModal();
    claim(this.tokenSelection.token, (error: Error, receipt?: string) => {
      if (error) {
        this.mdAlert.message = {
          status: 'error',
          content: error.message
        };
        this.mdAlert.showModal();
      }
    }, () => {
      this.refetchClaimAmount(this.tokenSelection.token);
    });
  }

  private getEmbedderActions() {
    const propertiesSchema: IDataSchema = {
      type: 'object',
      properties: {
        "description": {
          type: 'string',
          format: 'multi'
        }
      }
    };
    const themeSchema: IDataSchema = {
      type: 'object',
      properties: {
        dark: {
          type: 'object',
          properties: {
            backgroundColor: {
              type: 'string',
              format: 'color',
              readOnly: true
            },
            fontColor: {
              type: 'string',
              format: 'color',
              readOnly: true
            }
          }
        },
        light: {
          type: 'object',
          properties: {
            backgroundColor: {
              type: 'string',
              format: 'color',
              readOnly: true
            },
            fontColor: {
              type: 'string',
              format: 'color',
              readOnly: true
            }
          }
        }
      }
    }

    return this._getActions(propertiesSchema, themeSchema);
  }

  private getActions() {
    const propertiesSchema: IDataSchema = {
      type: 'object',
      properties: {
        "description": {
          type: 'string',
          format: 'multi'
        },
        "logo": {
          type: 'string',
          format: 'data-cid'
        },
        "logoUrl": {
          type: 'string',
          title: 'Logo URL'
        }
      }
    };

    const themeSchema: IDataSchema = {
      type: 'object',
      properties: {
        dark: {
          type: 'object',
          properties: {
            backgroundColor: {
              type: 'string',
              format: 'color'
            },
            fontColor: {
              type: 'string',
              format: 'color'
            }
          }
        },
        light: {
          type: 'object',
          properties: {
            backgroundColor: {
              type: 'string',
              format: 'color'
            },
            fontColor: {
              type: 'string',
              format: 'color'
            }
          }
        }
      }
    }

    return this._getActions(propertiesSchema, themeSchema);
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
        getActions: this.getActions.bind(this),
        getData: this.getData.bind(this),
        setData: async (data: IConfig) => {
          const defaultData = configData.defaultBuilderData;
          await this.setData({...defaultData, ...data});
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getActions: this.getEmbedderActions.bind(this),
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

  render() {
    return (
      <i-scom-dapp-container id="dappContainer" showFooter={true} showHeader={true}>
        <i-panel background={{color: Theme.background.main}}>
          <i-grid-layout
            id='gridDApp'
            maxWidth="500px"
            margin={{right:"auto", left:"auto", top: '0.5rem', bottom: '0.5rem'}}
            height='100%'
          >
            <i-vstack 
              gap="0.5rem" 
              padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }} 
              verticalAlignment='space-between' horizontalAlignment="center">
              <i-label caption="Commission Claim" font={{ bold: true, size: '1rem' }}></i-label>
              <i-vstack gap='0.25rem'>
                <i-image id='imgLogo' class={imageStyle} height={100}></i-image>
                <i-markdown
                  id='markdownDescription'
                  class={markdownStyle}
                  width='100%'
                  height='100%'
                ></i-markdown>
              </i-vstack>
              <i-vstack gap='0.25rem'>
                <i-hstack width="100%" verticalAlignment="center">
                  <i-label caption='Token:' font={{ size: '0.875rem' }}></i-label>
                  <commission-claim-token-selection
                    id='tokenSelection'
                    class={tokenSelectionStyle}
                    onSelectToken={this.selectToken.bind(this)}
                  ></commission-claim-token-selection>
                </i-hstack>
                <i-hstack width="100%" gap="0.5rem" verticalAlignment="center">
                  <i-label caption='Claimable:' font={{ size: '0.875rem' }}></i-label>
                  <i-label id='lbClaimable' font={{ size: '0.875rem' }}></i-label>
                </i-hstack>                
                <i-hstack horizontalAlignment="center" verticalAlignment='center' gap="8px">
                  <i-button
                    id='btnClaim'
                    width='100px'
                    caption='Claim'
                    padding={{ top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }}
                    font={{ size: '0.875rem', color: Theme.colors.primary.contrastText }}
                    rightIcon={{ visible: false, fill: Theme.colors.primary.contrastText }}
                    onClick={this.onClaim.bind(this)}
                    enabled={false}
                  ></i-button>
                </i-hstack>
              </i-vstack>
              <i-vstack gap='0.25rem'>
                <i-label id='lblRef' font={{ size: '0.75rem' }}></i-label>
                <i-label id='lblAddress' font={{ size: '0.75rem' }} overflowWrap='anywhere'></i-label>
              </i-vstack>
              <i-label caption='Terms & Condition' font={{ size: '0.75rem' }} link={{ href: 'https://docs.scom.dev/' }}></i-label>
            </i-vstack>
          </i-grid-layout>
          <commission-claim-alert id='mdAlert'></commission-claim-alert>
        </i-panel>
      </i-scom-dapp-container>
    )
  }
}