import { FormatUtils } from "@ijstech/components";
import { BigNumber, ISendTxEventsOptions, Wallet } from "@ijstech/eth-wallet";

export const formatNumber = (value: number | string | BigNumber, decimalFigures?: number) => {
  if (typeof value === 'object') {
    value = value.toString();
  }
  const minValue = '0.0000001';
  return FormatUtils.formatNumber(value, {decimalFigures: decimalFigures || 4, minValue});
};

export const registerSendTxEvents = (sendTxEventHandlers: ISendTxEventsOptions) => {
  const wallet = Wallet.getClientInstance();
  wallet.registerSendTxEvents({
    transactionHash: (error: Error, receipt?: string) => {
      if (sendTxEventHandlers.transactionHash) {
        sendTxEventHandlers.transactionHash(error, receipt);
      }
    },
    confirmation: (receipt: any) => {
      if (sendTxEventHandlers.confirmation) {
        sendTxEventHandlers.confirmation(receipt);
      }
    },
  })
}