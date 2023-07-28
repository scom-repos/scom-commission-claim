import { Utils, Wallet } from '@ijstech/eth-wallet';
import { Contracts as ProxyContracts } from './contracts/scom-commission-proxy-contract/index';
import { getContractAddress, getRpcWallet } from './store/index';
import { registerSendTxEvents } from './utils/index';
import { ITokenObject } from '@scom/scom-token-list';

async function getClaimAmount(token: ITokenObject) {
  const wallet = getRpcWallet();
  const distributorAddress = getContractAddress('Proxy');
  const distributor = new ProxyContracts.Proxy(wallet, distributorAddress);

  const amount = await distributor.getClaimantBalance({
    claimant: wallet.address,
    token: token.address ?? Utils.nullAddress
  })
  return Utils.fromDecimals(amount, token.decimals || 18);
}

async function claim(token: ITokenObject, callback?: any, confirmationCallback?: any) {
  const wallet = Wallet.getClientInstance();
  const distributorAddress = getContractAddress('Proxy');
  const distributor = new ProxyContracts.Proxy(wallet, distributorAddress);
  registerSendTxEvents({
    transactionHash: callback,
    confirmation: confirmationCallback
  });
  const receipt = await distributor.claim(token.address ?? Utils.nullAddress);
  return receipt;
}

export {
  getClaimAmount,
  claim
}