import { BigNumber, Utils, Wallet } from '@ijstech/eth-wallet';
import { ITokenObject } from '@modules/interface';
import { Contracts as ProxyContracts } from '@scom/commission-proxy';
import { getContractAddress } from '@modules/store';
import { registerSendTxEvents } from '@modules/utils';

async function getClaimAmount(token: ITokenObject) {
  const wallet = Wallet.getClientInstance();
  const distributorAddress = getContractAddress('Distributor');
  const distributor = new ProxyContracts.Distributor(wallet, distributorAddress);

  const amount = await distributor.distributions({
    param1: wallet.address,
    param2: token.address ?? Utils.nullAddress
  })
  return Utils.fromDecimals(amount, token.decimals || 18);
}

async function claim(token: ITokenObject, callback?: any, confirmationCallback?: any) {
  const wallet = Wallet.getClientInstance();
  const distributorAddress = getContractAddress('Distributor');
  const distributor = new ProxyContracts.Distributor(wallet, distributorAddress);
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