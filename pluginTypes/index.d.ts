/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-commission-proxy-contract/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@scom/scom-token-modal/@ijstech/eth-wallet/index.d.ts" />
/// <amd-module name="@scom/scom-commission-claim/interface.ts" />
declare module "@scom/scom-commission-claim/interface.ts" {
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
}
/// <amd-module name="@scom/scom-commission-claim/store/index.ts" />
declare module "@scom/scom-commission-claim/store/index.ts" {
    export interface IContractDetailInfo {
        address: string;
    }
    export type ContractType = 'Proxy' | 'Distributor';
    export interface IContractInfo {
        Proxy?: IContractDetailInfo;
        Distributor?: IContractDetailInfo;
    }
    export type ContractInfoByChainType = {
        [key: number]: IContractInfo;
    };
    export class State {
        contractInfoByChain: ContractInfoByChainType;
        rpcWalletId: string;
        ipfsGatewayUrl: string;
        constructor(options: any);
        private initData;
        initRpcWallet(defaultChainId: number): string;
        getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
        isRpcWalletConnected(): boolean;
        getChainId(): number;
        getContractAddress(type: ContractType): string;
    }
    export function isClientWalletConnected(): boolean;
}
/// <amd-module name="@scom/scom-commission-claim/index.css.ts" />
declare module "@scom/scom-commission-claim/index.css.ts" {
    export const imageStyle: string;
    export const markdownStyle: string;
    export const inputStyle: string;
    export const tokenSelectionStyle: string;
}
/// <amd-module name="@scom/scom-commission-claim/utils/index.ts" />
declare module "@scom/scom-commission-claim/utils/index.ts" {
    import { BigNumber, ISendTxEventsOptions } from "@ijstech/eth-wallet";
    export const formatNumber: (value: number | string | BigNumber, decimalFigures?: number) => string;
    export const registerSendTxEvents: (sendTxEventHandlers: ISendTxEventsOptions) => void;
}
/// <amd-module name="@scom/scom-commission-claim/API.ts" />
declare module "@scom/scom-commission-claim/API.ts" {
    import { TransactionReceipt } from '@ijstech/eth-wallet';
    import { State } from "@scom/scom-commission-claim/store/index.ts";
    import { ITokenObject } from '@scom/scom-token-list';
    function getClaimAmount(state: State, token: ITokenObject): Promise<import("@ijstech/eth-wallet").BigNumber>;
    function claim(state: State, token: ITokenObject, callback?: any, confirmationCallback?: any): Promise<TransactionReceipt>;
    export { getClaimAmount, claim };
}
/// <amd-module name="@scom/scom-commission-claim/data.json.ts" />
declare module "@scom/scom-commission-claim/data.json.ts" {
    const _default: {
        ipfsGatewayUrl: string;
        contractInfo: {
            "97": {
                Proxy: {
                    address: string;
                };
            };
            "43113": {
                Proxy: {
                    address: string;
                };
            };
        };
        defaultBuilderData: {
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
            defaultChainId: number;
        };
    };
    export default _default;
}
/// <amd-module name="@scom/scom-commission-claim/formSchema.json.ts" />
declare module "@scom/scom-commission-claim/formSchema.json.ts" {
    const _default_1: {
        builderSchema: {
            type: string;
            properties: {
                dark: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                    };
                };
                light: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                    };
                };
                description: {
                    type: string;
                    format: string;
                };
                logo: {
                    type: string;
                    format: string;
                };
                logoUrl: {
                    type: string;
                    title: string;
                };
            };
        };
        embedderSchema: {
            type: string;
            properties: {
                dark: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                    };
                };
                light: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                    };
                };
                description: {
                    type: string;
                    format: string;
                };
            };
        };
        builderUISchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        label: string;
                        scope: string;
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
        embedderUISchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        label: string;
                        scope: string;
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-commission-claim" />
declare module "@scom/scom-commission-claim" {
    import { Module, Container, ControlElement, IDataSchema, IUISchema } from '@ijstech/components';
    import { IConfig, INetworkConfig } from "@scom/scom-commission-claim/interface.ts";
    import { ContractInfoByChainType } from "@scom/scom-commission-claim/store/index.ts";
    import { IWalletPlugin } from '@scom/scom-wallet-modal';
    interface ScomCommissionClaimElement extends ControlElement {
        lazyLoad?: boolean;
        description?: string;
        logo?: string;
        logoUrl?: string;
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        contractInfo?: ContractInfoByChainType;
        showHeader?: boolean;
        showFooter?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-commission-claim']: ScomCommissionClaimElement;
            }
        }
    }
    export default class ScomCommissionClaim extends Module {
        private state;
        private imgLogo;
        private markdownDescription;
        private lbClaimable;
        private btnClaim;
        private tokenSelection;
        private txStatusModal;
        private lblAddress;
        private dappContainer;
        private mdWallet;
        private _data;
        tag: any;
        defaultEdit: boolean;
        private rpcWalletEvents;
        constructor(parent?: Container, options?: ScomCommissionClaimElement);
        removeRpcWalletEvents(): void;
        onHide(): void;
        static create(options?: ScomCommissionClaimElement, parent?: Container): Promise<ScomCommissionClaim>;
        private onChainChanged;
        private refreshWidget;
        private updateBtnClaim;
        private initWallet;
        private get chainId();
        private get rpcWallet();
        get description(): string;
        set description(value: string);
        get logo(): string;
        set logo(value: string);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        get showFooter(): boolean;
        set showFooter(value: boolean);
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get contractInfo(): ContractInfoByChainType;
        set contractInfo(value: ContractInfoByChainType);
        private getData;
        private resetRpcWallet;
        private setData;
        private getTag;
        private updateTag;
        private setTag;
        private updateStyle;
        private updateTheme;
        private initTag;
        private refetchClaimAmount;
        private selectToken;
        private onClaim;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
            }[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
            }[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        init(): Promise<void>;
        render(): any;
    }
}
