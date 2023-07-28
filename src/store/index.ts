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

export const state = {
  contractInfoByChain: {} as ContractInfoByChainType,
  rpcWalletId: ''
}

export const setDataFromConfig = (options: any) => {
  if (options.contractInfo) {
    setContractInfo(options.contractInfo);
  }
}

const setContractInfo = (data: ContractInfoByChainType) => {
  state.contractInfoByChain = data;
}

const getContractInfo = (chainId: number) => {
  return state.contractInfoByChain[chainId];
}

export const getContractAddress = (type: ContractType) => {
  const chainId = getChainId();
  const contracts = getContractInfo(chainId) || {};
  return contracts[type]?.address;
}

export function isClientWalletConnected() {
  const wallet = Wallet.getClientInstance();
  return wallet.isConnected;
}

export function isRpcWalletConnected() {
  const wallet = getRpcWallet();
  return wallet?.isConnected;
}

export function getChainId() {
  const rpcWallet = getRpcWallet();
  return rpcWallet?.chainId;
}

export function initRpcWallet(defaultChainId: number) {
  if (state.rpcWalletId) {
    return state.rpcWalletId;
  }
  const clientWallet = Wallet.getClientInstance();
  const networkList: INetwork[] = Object.values(application.store.networkMap);
  const instanceId = clientWallet.initRpcWallet({
    networks: networkList,
    defaultChainId,
    infuraId: application.store.infuraId,
    multicalls: application.store.multicalls
  });
  state.rpcWalletId = instanceId;
  if (clientWallet.address) {
    const rpcWallet = Wallet.getRpcWalletInstance(instanceId);
    rpcWallet.address = clientWallet.address;
  }
  return instanceId;
}

export function getRpcWallet() {
  return Wallet.getRpcWalletInstance(state.rpcWalletId);
}

export function getClientWallet() {
  return Wallet.getClientInstance();
}
