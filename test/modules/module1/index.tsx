import { Module, customModule, Container, application } from '@ijstech/components';
import { getMulticallInfoList } from '@scom/scom-multicall';
import { INetwork } from '@ijstech/eth-wallet';
import getNetworkList from '@scom/scom-network-list';
import ScomCommissionClaim from '@scom/scom-commission-claim';

@customModule
export default class Module1 extends Module {

    constructor(parent?: Container, options?: any) {
        super(parent, options);
        const multicalls = getMulticallInfoList();
        const networkMap = this.getNetworkMap(options.infuraId);
        application.store = {
            infuraId: options.infuraId,
            multicalls,
            networkMap
        }
    }

    private getNetworkMap = (infuraId?: string) => {
        const networkMap = {};
        const defaultNetworkList: INetwork[] = getNetworkList();
        const defaultNetworkMap: Record<number, INetwork> = defaultNetworkList.reduce((acc, cur) => {
            acc[cur.chainId] = cur;
            return acc;
        }, {});
        for (const chainId in defaultNetworkMap) {
            const networkInfo = defaultNetworkMap[chainId];
            const explorerUrl = networkInfo.blockExplorerUrls && networkInfo.blockExplorerUrls.length ? networkInfo.blockExplorerUrls[0] : "";
            if (infuraId && networkInfo.rpcUrls && networkInfo.rpcUrls.length > 0) {
                for (let i = 0; i < networkInfo.rpcUrls.length; i++) {
                    networkInfo.rpcUrls[i] = networkInfo.rpcUrls[i].replace(/{INFURA_ID}/g, infuraId);
                }
            }
            networkMap[networkInfo.chainId] = {
                ...networkInfo,
                symbol: networkInfo.nativeCurrency?.symbol || "",
                explorerTxUrl: explorerUrl ? `${explorerUrl}${explorerUrl.endsWith("/") ? "" : "/"}tx/` : "",
                explorerAddressUrl: explorerUrl ? `${explorerUrl}${explorerUrl.endsWith("/") ? "" : "/"}address/` : ""
            }
        }
        return networkMap;
    }

    async init() {
        super.init();
    }

    render() {
        return <i-panel>
            <i-hstack margin={{ top: '1rem', left: '1rem' }} gap="2rem">
                <i-scom-commission-claim
                    description="Commission Claim"
                    logoUrl="https://ipfs.scom.dev/ipfs/bafybeiaabddf67ht6nohe37bvg75ifgvrqeti4iuipuoxhpuvrfg3f4tdi/microdapps/commission.png"
                    contractInfo={{
                        97: {
                            Proxy: {
                                address: '0x9602cB9A782babc72b1b6C96E050273F631a6870'
                            }
                        },
                        43113: {
                            Proxy: {
                                address: '0x7f1EAB0db83c02263539E3bFf99b638E61916B96'
                            }
                        }
                    }}
                    networks={[{
                        chainId: 43113
                    }]}
                    wallets={[{
                        name: 'metamask'
                    }]}
                    defaultChainId={43113}
                />
            </i-hstack>
        </i-panel>
    }
}