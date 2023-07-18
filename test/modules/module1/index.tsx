import { Module, customModule, Container, VStack, application } from '@ijstech/components';
import ScomCommissionClaim from '@scom/scom-commission-claim';

@customModule
export default class Module1 extends Module {
    private dapp: ScomCommissionClaim;
    private mainStack: VStack;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }
    
    async init() {
        super.init();
        this.dapp = await ScomCommissionClaim.create({
            description: 'Commission Claim',
            "networks": [
                {
                  "chainId": 43113
                }
              ],
            "wallets": [
              { "name": "metamask" }
            ],
            defaultChainId: 43113
        });
        this.mainStack.appendChild(this.dapp);
    }

    render() {
        return <i-panel>
            <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem">
            </i-hstack>
        </i-panel>
    }
}