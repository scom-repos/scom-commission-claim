import {
  Module,
  customModule,
  GridLayout,
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
import { IConfig, INetworkConfig, ITokenObject, IWalletPlugin } from './interface';
import { EventId, getContractAddress, setDataFromSCConfig } from './store/index';
import { getChainId, isWalletConnected } from './wallet/index';
import Config from './config/index';
import { TokenSelection } from './token-selection/index';
import { imageStyle, markdownStyle, tokenSelectionStyle } from './index.css';
import { Alert } from './alert/index';
import { claim, getClaimAmount } from './API';
import ScomDappContainer from '@scom/scom-dapp-container';
import scconfig from './scconfig.json';
import { getImageIpfsUrl } from './utils/index';

const Theme = Styles.Theme.ThemeVars;

interface ScomCommissionClaimElement extends ControlElement {
  description?: string;
  logo?: string;
  defaultChainId: number;
  wallets: IWalletPlugin[];
  networks: INetworkConfig[];
  showHeader?: boolean;
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
  private gridDApp: GridLayout;
  private lbClaimable: Label;
  private btnClaim: Button;
  private tokenSelection: TokenSelection;
  private configDApp: Config;
  private mdAlert: Alert;
  private lblAddress: Label;
  private dappContainer: ScomDappContainer;

  private _data: IConfig = {
    defaultChainId: 0,
    wallets: [],
    networks: []
  };
  private _oldData: IConfig = {
    defaultChainId: 0,
    wallets: [],
    networks: []
  };
  private $eventBus: IEventBus;
  tag: any = {};
  private oldTag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    if (options) {
      setDataFromSCConfig(scconfig);
    }
    this.$eventBus = application.EventBus;
    this.registerEvent();
  }

  static async create(options?: ScomCommissionClaimElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  private registerEvent() {
    this.$eventBus.register(this, EventId.IsWalletConnected, () => this.onWalletConnect(true));
    this.$eventBus.register(this, EventId.IsWalletDisconnected, () => this.onWalletConnect(false));
    this.$eventBus.register(this, EventId.chainChanged, this.onChainChanged);
  }

  private onWalletConnect = async (connected: boolean) => {
    await this.onSetupPage((connected && !getChainId()) || connected);
  }

  private onChainChanged = async () => {
    await this.onSetupPage(true);
  }

  private async onSetupPage(isWalletConnected: boolean) {
    if (isWalletConnected) {
      if (!this.lblAddress.isConnected) await this.lblAddress.ready();
      this.lblAddress.caption = getContractAddress('Proxy');
      if (this.tokenSelection.token) {
        this.refetchClaimAmount(this.tokenSelection.token);
      }
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
    // if (!this.configDApp.isConnected) await this.configDApp.ready();
    if (this.configDApp.isConnected) this.configDApp.data = data;
    await this.refreshDApp();
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
    const themeVar = document.body.style.getPropertyValue('--theme') || 'light';
    this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
    this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
  }

  // private async edit() {
  //   this.gridDApp.visible = false;
  //   this.configDApp.visible = true;
  // }

  // private async confirm() {
  //   this.gridDApp.visible = true;
  //   this.configDApp.visible = false;
  //   this._data = this.configDApp.data;
  //   this.refreshDApp();
  // }

  // private async discard() {
  //   this.gridDApp.visible = true;
  //   this.configDApp.visible = false;
  // }

  // private async config() { }

  // private validate() {
  //   const data = this.configDApp.data;
  //   if (
  //     !data
  //   ) {
  //     this.mdAlert.message = {
  //       status: 'error',
  //       content: 'Required field is missing.'
  //     };
  //     this.mdAlert.showModal();
  //     return false;
  //   }
  //   return true;
  // }

  private async refreshDApp() {
    this.imgLogo.url = getImageIpfsUrl(this._data.logo);
    this.markdownDescription.load(this._data.description || '');
    const data: any = {
      wallets: this.wallets,
      networks: this.networks,
      showHeader: this.showHeader,
      defaultChainId: this.defaultChainId
    }
    if (this.dappContainer?.setData) this.dappContainer.setData(data)
  }

  async init() {
    this.isReadyCallbackQueued = true;
    super.init();
    this.initTag();
    // await this.initWalletData();
    const description = this.getAttribute('description', true);
    const logo = this.getAttribute('logo', true);
    const networks = this.getAttribute('networks', true);
    const wallets = this.getAttribute('wallets', true);
    const showHeader = this.getAttribute('showHeader', true);
    const defaultChainId = this.getAttribute('defaultChainId', true);

    await this.setData({description, logo, networks, wallets, showHeader, defaultChainId});
    await this.onSetupPage(isWalletConnected());
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
    this.oldTag = JSON.parse(JSON.stringify(defaultTag));
    this.setTag(defaultTag);
  }

  // private async initWalletData() {
  //   const selectedProvider = localStorage.getItem('walletProvider') as WalletPlugin;
  //   const isValidProvider = Object.values(WalletPlugin).includes(selectedProvider);
  //   if (hasWallet() && isValidProvider) {
  //     await connectWallet(selectedProvider);
  //   }
  // }

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
          format: 'data-url'
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
          return {
            execute: async () => {
              this._oldData = { ...this._data };
              if (userInputData.logo != undefined) this._data.logo = userInputData.logo;
              if (userInputData.description != undefined) this._data.description = userInputData.description;
              this.configDApp.data = this._data;
              this.setData(this._data);
              if (builder?.setData) builder.setData(this._data);
            },
            undo: () => {
              this._data = { ...this._oldData };
              this.configDApp.data = this._data;
              this.setData(this._data);
              if (builder?.setData) builder.setData(this._data);
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
          return {
            execute: async () => {
              if (!userInputData) return;
              this.oldTag = JSON.parse(JSON.stringify(this.tag));
              if (builder) builder.setTag(userInputData);
              else this.setTag(userInputData);
              if (this.dappContainer) this.dappContainer.setTag(userInputData);
            },
            undo: () => {
              if (!userInputData) return;
              this.tag = JSON.parse(JSON.stringify(this.oldTag));
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
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: this.getActions.bind(this),
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getActions: this.getEmbedderActions.bind(this),
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }

  render() {
    return (
      <i-scom-dapp-container id="dappContainer">
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
          <commission-claim-config id='configDApp' visible={false}></commission-claim-config>
          <commission-claim-alert id='mdAlert'></commission-claim-alert>
        </i-panel>
      </i-scom-dapp-container>
    )
  }
}