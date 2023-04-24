import { Module, customModule, Container, VStack, application } from '@ijstech/components';
import ScomCommissionClaim from '@scom/scom-commission-claim';

@customModule
export default class Module1 extends Module {
    private dapp: ScomCommissionClaim;
    private mainStack: VStack;
    private _content: any;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }
    async getEmbedElement(path: string) {
        application.currentModuleDir = path;
        await application.loadScript(`${path}/index.js`);
        application.currentModuleDir = '';
        const elementName = `i-${path.split('/').pop()}`;
        const element = document.createElement(elementName);
        return element;
    }
    
    async init() {
        super.init();
        this.dapp = await ScomCommissionClaim.create({
            description: 'Commission Claim',
            logo: 'ipfs://bafkreid4rgdbomv7lbboqo7kvmyruwulotrvqslej4jbwmd2ruzkmn4xte'
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