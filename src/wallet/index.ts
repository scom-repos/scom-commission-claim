import { application } from "@ijstech/components";
import { IWallet, Wallet } from "@ijstech/eth-wallet";
import { EventId, WalletPlugin } from "../store/index";

const defaultChainId = 1;

export function isWalletConnected() {
  const wallet = Wallet.getClientInstance();
  return wallet.isConnected;
}

export const hasWallet = () => {
  let hasWallet = false;
  // for (let wallet of walletList) {
  //   if (Wallet.isInstalled(wallet.name)) {
  //     hasWallet = true;
  //     break;
  //   } 
  // }
  return hasWallet;
}

export const getChainId = () => {
  const wallet = Wallet.getClientInstance();
  return isWalletConnected() ? wallet.chainId : defaultChainId;
}