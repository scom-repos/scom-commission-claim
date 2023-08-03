/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@scom/scom-token-modal/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-contract/index.d.ts" />
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
        Proxy: IContractDetailInfo;
        Distributor: IContractDetailInfo;
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
        getContractAddress(type: ContractType): any;
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
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.json.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.json.ts" {
    const _default: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, Event, TransactionOptions } from "@ijstech/eth-contract";
    export class Authorization extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAuthorizeEvent(receipt: TransactionReceipt): Authorization.AuthorizeEvent[];
        decodeAuthorizeEvent(event: Event): Authorization.AuthorizeEvent;
        parseDeauthorizeEvent(receipt: TransactionReceipt): Authorization.DeauthorizeEvent[];
        decodeDeauthorizeEvent(event: Event): Authorization.DeauthorizeEvent;
        parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Authorization.StartOwnershipTransferEvent[];
        decodeStartOwnershipTransferEvent(event: Event): Authorization.StartOwnershipTransferEvent;
        parseTransferOwnershipEvent(receipt: TransactionReceipt): Authorization.TransferOwnershipEvent[];
        decodeTransferOwnershipEvent(event: Event): Authorization.TransferOwnershipEvent;
        deny: {
            (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (user: string, options?: TransactionOptions) => Promise<void>;
            txData: (user: string, options?: TransactionOptions) => Promise<string>;
        };
        isPermitted: {
            (param1: string, options?: TransactionOptions): Promise<boolean>;
        };
        newOwner: {
            (options?: TransactionOptions): Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        permit: {
            (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (user: string, options?: TransactionOptions) => Promise<void>;
            txData: (user: string, options?: TransactionOptions) => Promise<string>;
        };
        takeOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
            txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module Authorization {
        interface AuthorizeEvent {
            user: string;
            _event: Event;
        }
        interface DeauthorizeEvent {
            user: string;
            _event: Event;
        }
        interface StartOwnershipTransferEvent {
            user: string;
            _event: Event;
        }
        interface TransferOwnershipEvent {
            user: string;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.json.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.json.ts" {
    const _default_1: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            })[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IClaimantIdsParams {
        param1: string;
        param2: string;
    }
    export interface IEthInParams {
        target: string;
        commissions: {
            to: string;
            amount: number | BigNumber;
        }[];
        data: string;
    }
    export interface IGetClaimantBalanceParams {
        claimant: string;
        token: string;
    }
    export interface IGetClaimantsInfoParams {
        fromId: number | BigNumber;
        count: number | BigNumber;
    }
    export interface IProxyCallParams {
        target: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
            directTransfer: boolean;
            commissions: {
                to: string;
                amount: number | BigNumber;
            }[];
        }[];
        to: string;
        tokensOut: string[];
        data: string;
    }
    export interface ITokenInParams {
        target: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
            directTransfer: boolean;
            commissions: {
                to: string;
                amount: number | BigNumber;
            }[];
        };
        data: string;
    }
    export class Proxy extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAddCommissionEvent(receipt: TransactionReceipt): Proxy.AddCommissionEvent[];
        decodeAddCommissionEvent(event: Event): Proxy.AddCommissionEvent;
        parseClaimEvent(receipt: TransactionReceipt): Proxy.ClaimEvent[];
        decodeClaimEvent(event: Event): Proxy.ClaimEvent;
        parseSkimEvent(receipt: TransactionReceipt): Proxy.SkimEvent[];
        decodeSkimEvent(event: Event): Proxy.SkimEvent;
        parseTransferBackEvent(receipt: TransactionReceipt): Proxy.TransferBackEvent[];
        decodeTransferBackEvent(event: Event): Proxy.TransferBackEvent;
        parseTransferForwardEvent(receipt: TransactionReceipt): Proxy.TransferForwardEvent[];
        decodeTransferForwardEvent(event: Event): Proxy.TransferForwardEvent;
        claim: {
            (token: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (token: string, options?: TransactionOptions) => Promise<void>;
            txData: (token: string, options?: TransactionOptions) => Promise<string>;
        };
        claimMultiple: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        claimantIdCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantIds: {
            (params: IClaimantIdsParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantsInfo: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }>;
        };
        ethIn: {
            (params: IEthInParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        getClaimantBalance: {
            (params: IGetClaimantBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getClaimantsInfo: {
            (params: IGetClaimantsInfoParams, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }[]>;
        };
        lastBalance: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        proxyCall: {
            (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        skim: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        tokenIn: {
            (params: ITokenInParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITokenInParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ITokenInParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module Proxy {
        interface AddCommissionEvent {
            to: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface ClaimEvent {
            from: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface SkimEvent {
            token: string;
            to: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferBackEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferForwardEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            commissions: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.json.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.json.ts" {
    const _default_2: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            })[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IClaimantIdsParams {
        param1: string;
        param2: string;
    }
    export interface IEthInParams {
        target: string;
        commissions: {
            to: string;
            amount: number | BigNumber;
        }[];
        data: string;
    }
    export interface IGetClaimantBalanceParams {
        claimant: string;
        token: string;
    }
    export interface IGetClaimantsInfoParams {
        fromId: number | BigNumber;
        count: number | BigNumber;
    }
    export interface IProxyCallParams {
        target: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
            directTransfer: boolean;
            commissions: {
                to: string;
                amount: number | BigNumber;
            }[];
            totalCommissions: number | BigNumber;
        }[];
        to: string;
        tokensOut: string[];
        data: string;
    }
    export interface ITokenInParams {
        target: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
            directTransfer: boolean;
            commissions: {
                to: string;
                amount: number | BigNumber;
            }[];
            totalCommissions: number | BigNumber;
        };
        data: string;
    }
    export class ProxyV2 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAddCommissionEvent(receipt: TransactionReceipt): ProxyV2.AddCommissionEvent[];
        decodeAddCommissionEvent(event: Event): ProxyV2.AddCommissionEvent;
        parseClaimEvent(receipt: TransactionReceipt): ProxyV2.ClaimEvent[];
        decodeClaimEvent(event: Event): ProxyV2.ClaimEvent;
        parseSkimEvent(receipt: TransactionReceipt): ProxyV2.SkimEvent[];
        decodeSkimEvent(event: Event): ProxyV2.SkimEvent;
        parseTransferBackEvent(receipt: TransactionReceipt): ProxyV2.TransferBackEvent[];
        decodeTransferBackEvent(event: Event): ProxyV2.TransferBackEvent;
        parseTransferForwardEvent(receipt: TransactionReceipt): ProxyV2.TransferForwardEvent[];
        decodeTransferForwardEvent(event: Event): ProxyV2.TransferForwardEvent;
        claim: {
            (token: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (token: string, options?: TransactionOptions) => Promise<void>;
            txData: (token: string, options?: TransactionOptions) => Promise<string>;
        };
        claimMultiple: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        claimantIdCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantIds: {
            (params: IClaimantIdsParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantsInfo: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }>;
        };
        ethIn: {
            (params: IEthInParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        getClaimantBalance: {
            (params: IGetClaimantBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getClaimantsInfo: {
            (params: IGetClaimantsInfoParams, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }[]>;
        };
        lastBalance: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        proxyCall: {
            (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        skim: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        tokenIn: {
            (params: ITokenInParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITokenInParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ITokenInParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module ProxyV2 {
        interface AddCommissionEvent {
            to: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface ClaimEvent {
            from: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface SkimEvent {
            token: string;
            to: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferBackEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferForwardEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            commissions: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.json.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.json.ts" {
    const _default_3: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_3;
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAddProjectAdminParams {
        projectId: number | BigNumber;
        admin: string;
    }
    export interface ICampaignAccumulatedCommissionParams {
        param1: number | BigNumber;
        param2: string;
    }
    export interface IClaimantIdsParams {
        param1: string;
        param2: string;
    }
    export interface IGetCampaignParams {
        campaignId: number | BigNumber;
        returnArrays: boolean;
    }
    export interface IGetCampaignArrayData1Params {
        campaignId: number | BigNumber;
        targetAndSelectorsStart: number | BigNumber;
        targetAndSelectorsLength: number | BigNumber;
        referrersStart: number | BigNumber;
        referrersLength: number | BigNumber;
    }
    export interface IGetCampaignArrayData2Params {
        campaignId: number | BigNumber;
        inTokensStart: number | BigNumber;
        inTokensLength: number | BigNumber;
        outTokensStart: number | BigNumber;
        outTokensLength: number | BigNumber;
    }
    export interface IGetClaimantBalanceParams {
        claimant: string;
        token: string;
    }
    export interface IGetClaimantsInfoParams {
        fromId: number | BigNumber;
        count: number | BigNumber;
    }
    export interface IProxyCallParams {
        campaignId: number | BigNumber;
        target: string;
        data: string;
        referrer: string;
        to: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
        }[];
        tokensOut: string[];
    }
    export interface IRemoveProjectAdminParams {
        projectId: number | BigNumber;
        admin: string;
    }
    export interface IStakeParams {
        projectId: number | BigNumber;
        token: string;
        amount: number | BigNumber;
    }
    export interface IStakeMultipleParams {
        projectId: number | BigNumber;
        token: string[];
        amount: (number | BigNumber)[];
    }
    export interface IStakesBalanceParams {
        param1: number | BigNumber;
        param2: string;
    }
    export interface ITransferProjectOwnershipParams {
        projectId: number | BigNumber;
        newOwner: string;
    }
    export interface IUnstakeParams {
        projectId: number | BigNumber;
        token: string;
        amount: number | BigNumber;
    }
    export interface IUnstakeMultipleParams {
        projectId: number | BigNumber;
        token: string[];
        amount: (number | BigNumber)[];
    }
    export class ProxyV3 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(protocolRate: number | BigNumber, options?: TransactionOptions): Promise<string>;
        parseAddCommissionEvent(receipt: TransactionReceipt): ProxyV3.AddCommissionEvent[];
        decodeAddCommissionEvent(event: Event): ProxyV3.AddCommissionEvent;
        parseAddProjectAdminEvent(receipt: TransactionReceipt): ProxyV3.AddProjectAdminEvent[];
        decodeAddProjectAdminEvent(event: Event): ProxyV3.AddProjectAdminEvent;
        parseAuthorizeEvent(receipt: TransactionReceipt): ProxyV3.AuthorizeEvent[];
        decodeAuthorizeEvent(event: Event): ProxyV3.AuthorizeEvent;
        parseClaimEvent(receipt: TransactionReceipt): ProxyV3.ClaimEvent[];
        decodeClaimEvent(event: Event): ProxyV3.ClaimEvent;
        parseClaimProtocolFeeEvent(receipt: TransactionReceipt): ProxyV3.ClaimProtocolFeeEvent[];
        decodeClaimProtocolFeeEvent(event: Event): ProxyV3.ClaimProtocolFeeEvent;
        parseDeauthorizeEvent(receipt: TransactionReceipt): ProxyV3.DeauthorizeEvent[];
        decodeDeauthorizeEvent(event: Event): ProxyV3.DeauthorizeEvent;
        parseNewCampaignEvent(receipt: TransactionReceipt): ProxyV3.NewCampaignEvent[];
        decodeNewCampaignEvent(event: Event): ProxyV3.NewCampaignEvent;
        parseNewProjectEvent(receipt: TransactionReceipt): ProxyV3.NewProjectEvent[];
        decodeNewProjectEvent(event: Event): ProxyV3.NewProjectEvent;
        parseRemoveProjectAdminEvent(receipt: TransactionReceipt): ProxyV3.RemoveProjectAdminEvent[];
        decodeRemoveProjectAdminEvent(event: Event): ProxyV3.RemoveProjectAdminEvent;
        parseSetProtocolRateEvent(receipt: TransactionReceipt): ProxyV3.SetProtocolRateEvent[];
        decodeSetProtocolRateEvent(event: Event): ProxyV3.SetProtocolRateEvent;
        parseSkimEvent(receipt: TransactionReceipt): ProxyV3.SkimEvent[];
        decodeSkimEvent(event: Event): ProxyV3.SkimEvent;
        parseStakeEvent(receipt: TransactionReceipt): ProxyV3.StakeEvent[];
        decodeStakeEvent(event: Event): ProxyV3.StakeEvent;
        parseStartOwnershipTransferEvent(receipt: TransactionReceipt): ProxyV3.StartOwnershipTransferEvent[];
        decodeStartOwnershipTransferEvent(event: Event): ProxyV3.StartOwnershipTransferEvent;
        parseTakeoverProjectOwnershipEvent(receipt: TransactionReceipt): ProxyV3.TakeoverProjectOwnershipEvent[];
        decodeTakeoverProjectOwnershipEvent(event: Event): ProxyV3.TakeoverProjectOwnershipEvent;
        parseTransferBackEvent(receipt: TransactionReceipt): ProxyV3.TransferBackEvent[];
        decodeTransferBackEvent(event: Event): ProxyV3.TransferBackEvent;
        parseTransferForwardEvent(receipt: TransactionReceipt): ProxyV3.TransferForwardEvent[];
        decodeTransferForwardEvent(event: Event): ProxyV3.TransferForwardEvent;
        parseTransferOwnershipEvent(receipt: TransactionReceipt): ProxyV3.TransferOwnershipEvent[];
        decodeTransferOwnershipEvent(event: Event): ProxyV3.TransferOwnershipEvent;
        parseTransferProjectOwnershipEvent(receipt: TransactionReceipt): ProxyV3.TransferProjectOwnershipEvent[];
        decodeTransferProjectOwnershipEvent(event: Event): ProxyV3.TransferProjectOwnershipEvent;
        parseUnstakeEvent(receipt: TransactionReceipt): ProxyV3.UnstakeEvent[];
        decodeUnstakeEvent(event: Event): ProxyV3.UnstakeEvent;
        addProjectAdmin: {
            (params: IAddProjectAdminParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddProjectAdminParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IAddProjectAdminParams, options?: TransactionOptions) => Promise<string>;
        };
        campaignAccumulatedCommission: {
            (params: ICampaignAccumulatedCommissionParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        claim: {
            (token: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (token: string, options?: TransactionOptions) => Promise<void>;
            txData: (token: string, options?: TransactionOptions) => Promise<string>;
        };
        claimMultiple: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        claimMultipleProtocolFee: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        claimProtocolFee: {
            (token: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (token: string, options?: TransactionOptions) => Promise<void>;
            txData: (token: string, options?: TransactionOptions) => Promise<string>;
        };
        claimantIdCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantIds: {
            (params: IClaimantIdsParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantsInfo: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }>;
        };
        deny: {
            (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (user: string, options?: TransactionOptions) => Promise<void>;
            txData: (user: string, options?: TransactionOptions) => Promise<string>;
        };
        getCampaign: {
            (params: IGetCampaignParams, options?: TransactionOptions): Promise<{
                projectId: BigNumber;
                maxInputTokensInEachCall: BigNumber;
                maxOutputTokensInEachCall: BigNumber;
                referrersRequireApproval: boolean;
                startDate: BigNumber;
                endDate: BigNumber;
                targetAndSelectors: string[];
                acceptAnyInToken: boolean;
                acceptAnyOutToken: boolean;
                inTokens: string[];
                directTransferInToken: boolean[];
                commissionInTokenConfig: {
                    rate: BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: BigNumber;
                    capPerCampaign: BigNumber;
                }[];
                outTokens: string[];
                commissionOutTokenConfig: {
                    rate: BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: BigNumber;
                    capPerCampaign: BigNumber;
                }[];
                referrers: string[];
            }>;
        };
        getCampaignArrayData1: {
            (params: IGetCampaignArrayData1Params, options?: TransactionOptions): Promise<{
                targetAndSelectors: string[];
                referrers: string[];
            }>;
        };
        getCampaignArrayData2: {
            (params: IGetCampaignArrayData2Params, options?: TransactionOptions): Promise<{
                inTokens: string[];
                directTransferInToken: boolean[];
                commissionInTokenConfig: {
                    rate: BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: BigNumber;
                    capPerCampaign: BigNumber;
                }[];
                outTokens: string[];
                commissionOutTokenConfig: {
                    rate: BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: BigNumber;
                    capPerCampaign: BigNumber;
                }[];
            }>;
        };
        getCampaignArrayLength: {
            (campaignId: number | BigNumber, options?: TransactionOptions): Promise<{
                targetAndSelectorsLength: BigNumber;
                inTokensLength: BigNumber;
                outTokensLength: BigNumber;
                referrersLength: BigNumber;
            }>;
        };
        getCampaignsLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getClaimantBalance: {
            (params: IGetClaimantBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getClaimantsInfo: {
            (params: IGetClaimantsInfoParams, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }[]>;
        };
        getProject: {
            (projectId: number | BigNumber, options?: TransactionOptions): Promise<{
                owner: string;
                newOwner: string;
                projectAdmins: string[];
            }>;
        };
        getProjectAdminsLength: {
            (projectId: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        getProjectsLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        isPermitted: {
            (param1: string, options?: TransactionOptions): Promise<boolean>;
        };
        lastBalance: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        newCampaign: {
            (params: {
                projectId: number | BigNumber;
                maxInputTokensInEachCall: number | BigNumber;
                maxOutputTokensInEachCall: number | BigNumber;
                referrersRequireApproval: boolean;
                startDate: number | BigNumber;
                endDate: number | BigNumber;
                targetAndSelectors: string[];
                acceptAnyInToken: boolean;
                acceptAnyOutToken: boolean;
                inTokens: string[];
                directTransferInToken: boolean[];
                commissionInTokenConfig: {
                    rate: number | BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: number | BigNumber;
                    capPerCampaign: number | BigNumber;
                }[];
                outTokens: string[];
                commissionOutTokenConfig: {
                    rate: number | BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: number | BigNumber;
                    capPerCampaign: number | BigNumber;
                }[];
                referrers: string[];
            }, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: {
                projectId: number | BigNumber;
                maxInputTokensInEachCall: number | BigNumber;
                maxOutputTokensInEachCall: number | BigNumber;
                referrersRequireApproval: boolean;
                startDate: number | BigNumber;
                endDate: number | BigNumber;
                targetAndSelectors: string[];
                acceptAnyInToken: boolean;
                acceptAnyOutToken: boolean;
                inTokens: string[];
                directTransferInToken: boolean[];
                commissionInTokenConfig: {
                    rate: number | BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: number | BigNumber;
                    capPerCampaign: number | BigNumber;
                }[];
                outTokens: string[];
                commissionOutTokenConfig: {
                    rate: number | BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: number | BigNumber;
                    capPerCampaign: number | BigNumber;
                }[];
                referrers: string[];
            }, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: {
                projectId: number | BigNumber;
                maxInputTokensInEachCall: number | BigNumber;
                maxOutputTokensInEachCall: number | BigNumber;
                referrersRequireApproval: boolean;
                startDate: number | BigNumber;
                endDate: number | BigNumber;
                targetAndSelectors: string[];
                acceptAnyInToken: boolean;
                acceptAnyOutToken: boolean;
                inTokens: string[];
                directTransferInToken: boolean[];
                commissionInTokenConfig: {
                    rate: number | BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: number | BigNumber;
                    capPerCampaign: number | BigNumber;
                }[];
                outTokens: string[];
                commissionOutTokenConfig: {
                    rate: number | BigNumber;
                    feeOnProjectOwner: boolean;
                    capPerTransaction: number | BigNumber;
                    capPerCampaign: number | BigNumber;
                }[];
                referrers: string[];
            }, options?: TransactionOptions) => Promise<string>;
        };
        newOwner: {
            (options?: TransactionOptions): Promise<string>;
        };
        newProject: {
            (admins: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (admins: string[], options?: TransactionOptions) => Promise<BigNumber>;
            txData: (admins: string[], options?: TransactionOptions) => Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        permit: {
            (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (user: string, options?: TransactionOptions) => Promise<void>;
            txData: (user: string, options?: TransactionOptions) => Promise<string>;
        };
        protocolFeeBalance: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolRate: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        proxyCall: {
            (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        removeProjectAdmin: {
            (params: IRemoveProjectAdminParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveProjectAdminParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveProjectAdminParams, options?: TransactionOptions) => Promise<string>;
        };
        setProtocolRate: {
            (newRate: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newRate: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (newRate: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        skim: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        stake: {
            (params: IStakeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IStakeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IStakeParams, options?: TransactionOptions) => Promise<string>;
        };
        stakeETH: {
            (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        stakeMultiple: {
            (params: IStakeMultipleParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IStakeMultipleParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IStakeMultipleParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        stakesBalance: {
            (params: IStakesBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        takeOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        takeoverProjectOwnership: {
            (projectId: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (projectId: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (projectId: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
            txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
        };
        transferProjectOwnership: {
            (params: ITransferProjectOwnershipParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferProjectOwnershipParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ITransferProjectOwnershipParams, options?: TransactionOptions) => Promise<string>;
        };
        unstake: {
            (params: IUnstakeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IUnstakeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IUnstakeParams, options?: TransactionOptions) => Promise<string>;
        };
        unstakeETH: {
            (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        unstakeMultiple: {
            (params: IUnstakeMultipleParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IUnstakeMultipleParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IUnstakeMultipleParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module ProxyV3 {
        interface AddCommissionEvent {
            to: string;
            token: string;
            commission: BigNumber;
            commissionBalance: BigNumber;
            protocolFee: BigNumber;
            protocolFeeBalance: BigNumber;
            _event: Event;
        }
        interface AddProjectAdminEvent {
            projectId: BigNumber;
            admin: string;
            _event: Event;
        }
        interface AuthorizeEvent {
            user: string;
            _event: Event;
        }
        interface ClaimEvent {
            from: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface ClaimProtocolFeeEvent {
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface DeauthorizeEvent {
            user: string;
            _event: Event;
        }
        interface NewCampaignEvent {
            campaignId: BigNumber;
            _event: Event;
        }
        interface NewProjectEvent {
            projectId: BigNumber;
            _event: Event;
        }
        interface RemoveProjectAdminEvent {
            projectId: BigNumber;
            admin: string;
            _event: Event;
        }
        interface SetProtocolRateEvent {
            protocolRate: BigNumber;
            _event: Event;
        }
        interface SkimEvent {
            token: string;
            to: string;
            amount: BigNumber;
            _event: Event;
        }
        interface StakeEvent {
            projectId: BigNumber;
            token: string;
            amount: BigNumber;
            balance: BigNumber;
            _event: Event;
        }
        interface StartOwnershipTransferEvent {
            user: string;
            _event: Event;
        }
        interface TakeoverProjectOwnershipEvent {
            projectId: BigNumber;
            newOwner: string;
            _event: Event;
        }
        interface TransferBackEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferForwardEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferOwnershipEvent {
            user: string;
            _event: Event;
        }
        interface TransferProjectOwnershipEvent {
            projectId: BigNumber;
            newOwner: string;
            _event: Event;
        }
        interface UnstakeEvent {
            projectId: BigNumber;
            token: string;
            amount: BigNumber;
            balance: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/index.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/index.ts" {
    export { Authorization } from "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.ts";
    export { Proxy } from "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.ts";
    export { ProxyV2 } from "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.ts";
    export { ProxyV3 } from "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.ts";
}
/// <amd-module name="@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/index.ts" />
declare module "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/index.ts" {
    import * as Contracts from "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/index.ts";
    export { Contracts };
    import { IWallet } from '@ijstech/eth-wallet';
    export interface IDeployOptions {
        version?: string;
        protocolRate?: string;
    }
    export interface IDeployResult {
        proxy: string;
    }
    export var DefaultDeployOptions: IDeployOptions;
    export function deploy(wallet: IWallet, options?: IDeployOptions): Promise<IDeployResult>;
    export function onProgress(handler: any): void;
    const _default_4: {
        Contracts: typeof Contracts;
        deploy: typeof deploy;
        DefaultDeployOptions: IDeployOptions;
        onProgress: typeof onProgress;
    };
    export default _default_4;
}
/// <amd-module name="@scom/scom-commission-claim/utils/index.ts" />
declare module "@scom/scom-commission-claim/utils/index.ts" {
    import { ISendTxEventsOptions } from "@ijstech/eth-wallet";
    export const formatNumber: (value: any, decimals?: number) => string;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const registerSendTxEvents: (sendTxEventHandlers: ISendTxEventsOptions) => void;
}
/// <amd-module name="@scom/scom-commission-claim/API.ts" />
declare module "@scom/scom-commission-claim/API.ts" {
    import { State } from "@scom/scom-commission-claim/store/index.ts";
    import { ITokenObject } from '@scom/scom-token-list';
    function getClaimAmount(state: State, token: ITokenObject): Promise<import("@ijstech/eth-wallet").BigNumber>;
    function claim(state: State, token: ITokenObject, callback?: any, confirmationCallback?: any): Promise<import("@ijstech/eth-contract").TransactionReceipt>;
    export { getClaimAmount, claim };
}
/// <amd-module name="@scom/scom-commission-claim/data.json.ts" />
declare module "@scom/scom-commission-claim/data.json.ts" {
    const _default_5: {
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
    export default _default_5;
}
/// <amd-module name="@scom/scom-commission-claim/formSchema.json.ts" />
declare module "@scom/scom-commission-claim/formSchema.json.ts" {
    const _default_6: {
        general: {
            dataSchema: {
                type: string;
                properties: {
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
                    description: {
                        type: string;
                        format: string;
                    };
                };
            };
        };
        theme: {
            dataSchema: {
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
                };
            };
        };
    };
    export default _default_6;
}
/// <amd-module name="@scom/scom-commission-claim" />
declare module "@scom/scom-commission-claim" {
    import { Module, Container, ControlElement, IDataSchema } from '@ijstech/components';
    import { IConfig, INetworkConfig } from "@scom/scom-commission-claim/interface.ts";
    import { IWalletPlugin } from '@scom/scom-wallet-modal';
    interface ScomCommissionClaimElement extends ControlElement {
        lazyLoad?: boolean;
        description?: string;
        logo?: string;
        logoUrl?: string;
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
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
