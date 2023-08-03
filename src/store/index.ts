import { application } from "@ijstech/components";
import { INetwork, Wallet } from "@ijstech/eth-wallet";

export interface IContractDetailInfo {
  address: string;
}

export type ContractType = 'Proxy' | 'Distributor';

export interface IContractInfo {
  Proxy: IContractDetailInfo;
  Distributor: IContractDetailInfo;
}

export type ContractInfoByChainType = { [key: number]: IContractInfo };

export class State {
  contractInfoByChain: ContractInfoByChainType = {};
  rpcWalletId: string = '';
  ipfsGatewayUrl: string = '';

  constructor(options: any) {
    this.initData(options);
  }

  private initData(options: any) {
    if (options.contractInfo) {
      this.contractInfoByChain = options.contractInfo;
    }
    if (options.ipfsGatewayUrl) {
      this.ipfsGatewayUrl = options.ipfsGatewayUrl;
    }
  }

  initRpcWallet(defaultChainId: number) {
    if (this.rpcWalletId) {
      return this.rpcWalletId;
    }
    const clientWallet = Wallet.getClientInstance();
    const networkList: INetwork[] = Object.values(application.store?.networkMap || []);
    const instanceId = clientWallet.initRpcWallet({
      networks: networkList,
      defaultChainId,
      infuraId: application.store?.infuraId,
      multicalls: application.store?.multicalls
    });
    this.rpcWalletId = instanceId;
    if (clientWallet.address) {
      const rpcWallet = Wallet.getRpcWalletInstance(instanceId);
      rpcWallet.address = clientWallet.address;
    }
    return instanceId;
  }
  getRpcWallet() {
    return this.rpcWalletId ? Wallet.getRpcWalletInstance(this.rpcWalletId) : null;
  }

  isRpcWalletConnected() {
    const wallet = this.getRpcWallet();
    return wallet?.isConnected;
  }

  getChainId() {
    const rpcWallet = this.getRpcWallet();
    return rpcWallet?.chainId;
  }

  getContractAddress(type: ContractType) {
    const chainId = this.getChainId();
    const contracts = this.contractInfoByChain[chainId] || {};
    return contracts[type]?.address;
  }
}

export function isClientWalletConnected() {
  const wallet = Wallet.getClientInstance();
  return wallet.isConnected;
}
