import { IWalletPlugin } from "@scom/scom-wallet-modal";

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
export interface INetworkConfig {
  chainName?: string;
  chainId: number;
}
