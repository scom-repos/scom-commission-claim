import {
  Module,
  customModule,
  GridLayout,
  Markdown,
  Image,
  Label,
  Styles,
  HStack,
  Input,
  Button,
  Container,
  IEventBus,
  application
} from '@ijstech/components';
import { BigNumber, WalletPlugin } from '@ijstech/eth-wallet';
import { IConfig, ITokenObject, PageBlock } from '@modules/interface';
import { EventId, getContractAddress, getNetworkName, getTokenList, setDataFromSCConfig } from '@modules/store';
import { connectWallet, getChainId, hasWallet, isWalletConnected } from '@modules/wallet';
import Config from '@modules/config';
import { TokenSelection } from '@modules/token-selection';
import { imageStyle, markdownStyle, tokenSelectionStyle } from './index.css';
import { Alert } from '@modules/alert';
import { claim, getClaimAmount } from './API';

const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Main extends Module implements PageBlock {
  private imgLogo: Image;
  private markdownDescription: Markdown;
  private gridDApp: GridLayout;
  private lbClaimable: Label;
  private btnClaim: Button;
  private tokenSelection: TokenSelection;
  private configDApp: Config;
  private mdAlert: Alert;
  private lblAddress: Label;

  private _data: IConfig = {};
  private $eventBus: IEventBus;
  tag: any;
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    if (options) {
      setDataFromSCConfig(options);
    }
    this.$eventBus = application.EventBus;
    this.registerEvent();
  }

  private registerEvent() {
    this.$eventBus.register(this, EventId.IsWalletConnected, () => this.onWalletConnect(true));
    this.$eventBus.register(this, EventId.IsWalletDisconnected, () => this.onWalletConnect(false));
    this.$eventBus.register(this, EventId.chainChanged, this.onChainChanged);
  }

  onWalletConnect = async (connected: boolean) => {
    let chainId = getChainId();
    if (connected && !chainId) {
      this.onSetupPage(true);
    } else {
      this.onSetupPage(connected);
    }
  }

  onChainChanged = async () => {
    this.onSetupPage(true);
  }

  private onSetupPage(isWalletConnected: boolean) {
    if (isWalletConnected) {
      this.lblAddress.caption = getContractAddress('Distributor');
      if (this.tokenSelection.token) {
        this.refetchClaimAmount(this.tokenSelection.token);
      }
    }
  }

  getData() {
    return this._data;
  }

  async setData(data: IConfig) {
    this._data = data;
    this.configDApp.data = data;
    this.refreshDApp();
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
  }

  async edit() {
    this.gridDApp.visible = false;
    this.configDApp.visible = true;
  }

  async confirm() {
    this.gridDApp.visible = true;
    this.configDApp.visible = false;
    this._data = this.configDApp.data;
    this.refreshDApp();
  }

  async discard() {
    this.gridDApp.visible = true;
    this.configDApp.visible = false;
  }

  async config() { }

  validate() {
    const data = this.configDApp.data;
    if (
      !data
    ) {
      this.mdAlert.message = {
        status: 'error',
        content: 'Required field is missing.'
      };
      this.mdAlert.showModal();
      return false;
    }
    return true;
  }

  private async refreshDApp() {
    this.imgLogo.url = this._data.logo;
    this.markdownDescription.load(this._data.description || '');
  }

  async init() {
    super.init();
    await this.initWalletData();
    await this.onSetupPage(isWalletConnected());
  }

  private async initWalletData() {
    const selectedProvider = localStorage.getItem('walletProvider') as WalletPlugin;
    const isValidProvider = Object.values(WalletPlugin).includes(selectedProvider);
    if (hasWallet() && isValidProvider) {
      await connectWallet(selectedProvider);
    }
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

  render() {
    return (
      <i-panel>
        <i-grid-layout
          id='gridDApp'
          maxWidth="500px"
          margin={{right:"auto", left:"auto", top: 0, bottom: 0}}
          height='100%'
        >
          <i-vstack 
            gap="0.5rem" 
            padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }} 
            background={{ color: '#f1f1f1' }} verticalAlignment='space-between' horizontalAlignment="center">
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
    )
  }
}