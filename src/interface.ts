import { IClientSideProvider } from '@ijstech/eth-wallet';
export interface PageBlock {
  // Properties
  getData: () => any;
  setData: (data: any) => Promise<void>;
  getTag: () => any;
  setTag: (tag: any) => Promise<void>
  validate?: () => boolean;
  defaultEdit?: boolean;
  tag?: any;

  // Page Events
  readonly onEdit: () => Promise<void>;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  // onClear: () => void;

  // Page Block Events
  edit: () => Promise<void>;
  confirm: () => Promise<void>;
  discard: () => Promise<void>;
  config: () => Promise<void>;
}

export interface IConfig {
  description?: string;
  logo?: string;
  logoUrl?: string;
  defaultChainId: number;
  wallets: IWalletPlugin[];
  networks: INetworkConfig[];
  showHeader?: boolean;
  showFooter?: boolean;
}

export interface IWalletPlugin {
  name: string;
  packageName?: string;
  provider?: IClientSideProvider;
}

export interface INetworkConfig {
  chainName?: string;
  chainId: number;
}
