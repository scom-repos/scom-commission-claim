var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define("@scom/scom-commission-claim/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-commission-claim/store/index.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet"], function (require, exports, components_1, eth_wallet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isClientWalletConnected = exports.State = void 0;
    class State {
        constructor(options) {
            this.contractInfoByChain = {};
            this.rpcWalletId = '';
            this.ipfsGatewayUrl = '';
            this.initData(options);
        }
        initData(options) {
            if (options.contractInfo) {
                this.contractInfoByChain = options.contractInfo;
            }
            if (options.ipfsGatewayUrl) {
                this.ipfsGatewayUrl = options.ipfsGatewayUrl;
            }
        }
        initRpcWallet(defaultChainId) {
            var _a, _b, _c;
            if (this.rpcWalletId) {
                return this.rpcWalletId;
            }
            const clientWallet = eth_wallet_1.Wallet.getClientInstance();
            const networkList = Object.values(((_a = components_1.application.store) === null || _a === void 0 ? void 0 : _a.networkMap) || []);
            const instanceId = clientWallet.initRpcWallet({
                networks: networkList,
                defaultChainId,
                infuraId: (_b = components_1.application.store) === null || _b === void 0 ? void 0 : _b.infuraId,
                multicalls: (_c = components_1.application.store) === null || _c === void 0 ? void 0 : _c.multicalls
            });
            this.rpcWalletId = instanceId;
            if (clientWallet.address) {
                const rpcWallet = eth_wallet_1.Wallet.getRpcWalletInstance(instanceId);
                rpcWallet.address = clientWallet.address;
            }
            return instanceId;
        }
        getRpcWallet() {
            return this.rpcWalletId ? eth_wallet_1.Wallet.getRpcWalletInstance(this.rpcWalletId) : null;
        }
        isRpcWalletConnected() {
            const wallet = this.getRpcWallet();
            return wallet === null || wallet === void 0 ? void 0 : wallet.isConnected;
        }
        getChainId() {
            const rpcWallet = this.getRpcWallet();
            return rpcWallet === null || rpcWallet === void 0 ? void 0 : rpcWallet.chainId;
        }
        getContractAddress(type) {
            var _a;
            const chainId = this.getChainId();
            const contracts = this.contractInfoByChain[chainId] || {};
            return (_a = contracts[type]) === null || _a === void 0 ? void 0 : _a.address;
        }
    }
    exports.State = State;
    function isClientWalletConnected() {
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isClientWalletConnected = isClientWalletConnected;
});
define("@scom/scom-commission-claim/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.markdownStyle = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    exports.markdownStyle = components_2.Styles.style({
        overflowWrap: 'break-word',
        color: Theme.text.primary
    });
});
define("@scom/scom-commission-claim/utils/index.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet"], function (require, exports, components_3, eth_wallet_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSendTxEvents = exports.formatNumber = void 0;
    const formatNumber = (value, decimalFigures) => {
        if (typeof value === 'object') {
            value = value.toString();
        }
        const minValue = '0.0000001';
        return components_3.FormatUtils.formatNumber(value, { decimalFigures: decimalFigures || 4, minValue });
    };
    exports.formatNumber = formatNumber;
    const registerSendTxEvents = (sendTxEventHandlers) => {
        const wallet = eth_wallet_2.Wallet.getClientInstance();
        wallet.registerSendTxEvents({
            transactionHash: (error, receipt) => {
                if (sendTxEventHandlers.transactionHash) {
                    sendTxEventHandlers.transactionHash(error, receipt);
                }
            },
            confirmation: (receipt) => {
                if (sendTxEventHandlers.confirmation) {
                    sendTxEventHandlers.confirmation(receipt);
                }
            },
        });
    };
    exports.registerSendTxEvents = registerSendTxEvents;
});
define("@scom/scom-commission-claim/API.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-commission-proxy-contract", "@scom/scom-commission-claim/utils/index.ts"], function (require, exports, eth_wallet_3, scom_commission_proxy_contract_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.claim = exports.getClaimAmount = void 0;
    async function getClaimAmount(state, token) {
        var _a;
        const wallet = state.getRpcWallet();
        const distributorAddress = state.getContractAddress('Proxy');
        const distributor = new scom_commission_proxy_contract_1.Contracts.Proxy(wallet, distributorAddress);
        const amount = await distributor.getClaimantBalance({
            claimant: wallet.address,
            token: (_a = token.address) !== null && _a !== void 0 ? _a : eth_wallet_3.Utils.nullAddress
        });
        return eth_wallet_3.Utils.fromDecimals(amount, token.decimals || 18);
    }
    exports.getClaimAmount = getClaimAmount;
    async function claim(state, token, callback, confirmationCallback) {
        var _a;
        const wallet = eth_wallet_3.Wallet.getClientInstance();
        const distributorAddress = state.getContractAddress('Proxy');
        const distributor = new scom_commission_proxy_contract_1.Contracts.Proxy(wallet, distributorAddress);
        (0, index_1.registerSendTxEvents)({
            transactionHash: callback,
            confirmation: confirmationCallback
        });
        let receipt;
        try {
            receipt = await distributor.claim((_a = token.address) !== null && _a !== void 0 ? _a : eth_wallet_3.Utils.nullAddress);
        }
        catch (error) {
            callback(error);
        }
        return receipt;
    }
    exports.claim = claim;
});
define("@scom/scom-commission-claim/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-claim/data.json.ts'/> 
    exports.default = {
        "ipfsGatewayUrl": "https://ipfs.scom.dev/ipfs/",
        "contractInfo": {
            "97": {
                "Proxy": {
                    "address": "0x9602cB9A782babc72b1b6C96E050273F631a6870"
                }
            },
            "43113": {
                "Proxy": {
                    "address": "0x7f1EAB0db83c02263539E3bFf99b638E61916B96"
                }
            }
        },
        "defaultBuilderData": {
            "networks": [
                {
                    "chainId": 97
                },
                {
                    "chainId": 43113
                }
            ],
            "wallets": [
                {
                    "name": "metamask"
                }
            ],
            "defaultChainId": 43113
        }
    };
});
define("@scom/scom-commission-claim/formSchema.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-claim/formSchema.json.ts'/> 
    const theme = {
        backgroundColor: {
            type: 'string',
            format: 'color'
        },
        fontColor: {
            type: 'string',
            format: 'color'
        }
    };
    const themeDataSchema = {
        dark: {
            type: 'object',
            properties: theme
        },
        light: {
            type: 'object',
            properties: theme
        }
    };
    const themeUISchema = {
        type: 'Category',
        label: 'Theme',
        elements: [
            {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'Control',
                        label: 'Dark',
                        scope: '#/properties/dark'
                    },
                    {
                        type: 'Control',
                        label: 'Light',
                        scope: '#/properties/light'
                    }
                ]
            }
        ]
    };
    exports.default = {
        builderSchema: {
            type: 'object',
            properties: Object.assign({ description: {
                    type: 'string',
                    format: 'multi'
                }, logo: {
                    type: 'string',
                    format: 'data-cid'
                }, logoUrl: {
                    type: 'string',
                    title: 'Logo URL'
                } }, themeDataSchema)
        },
        embedderSchema: {
            type: 'object',
            properties: Object.assign({ description: {
                    type: 'string',
                    format: 'multi'
                } }, themeDataSchema)
        },
        builderUISchema: {
            type: 'Categorization',
            elements: [
                {
                    type: 'Category',
                    label: 'General',
                    elements: [
                        {
                            type: 'VerticalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/description'
                                },
                                {
                                    type: 'Control',
                                    scope: '#/properties/logo'
                                },
                                {
                                    type: 'Control',
                                    scope: '#/properties/logoUrl'
                                }
                            ]
                        }
                    ]
                },
                themeUISchema
            ]
        },
        embedderUISchema: {
            type: 'Categorization',
            elements: [
                {
                    type: 'Category',
                    label: 'General',
                    elements: [
                        {
                            type: 'VerticalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/description'
                                }
                            ]
                        }
                    ]
                },
                themeUISchema
            ]
        }
    };
});
define("@scom/scom-commission-claim", ["require", "exports", "@ijstech/components", "@scom/scom-commission-claim/store/index.ts", "@scom/scom-commission-claim/index.css.ts", "@scom/scom-commission-claim/API.ts", "@scom/scom-commission-claim/data.json.ts", "@scom/scom-commission-claim/utils/index.ts", "@ijstech/eth-wallet", "@scom/scom-commission-claim/formSchema.json.ts"], function (require, exports, components_4, index_2, index_css_1, API_1, data_json_1, index_3, eth_wallet_4, formSchema_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomCommissionClaim = class ScomCommissionClaim extends components_4.Module {
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                defaultChainId: 0,
                wallets: [],
                networks: []
            };
            this.tag = {};
            this.defaultEdit = true;
            this.rpcWalletEvents = [];
            this.onChainChanged = async () => {
                if (this.tokenSelection) {
                    this.tokenSelection.token = undefined;
                    this.tokenSelection.chainId = this.state.getChainId();
                }
                await this.refreshWidget();
            };
            this.refreshWidget = async () => {
                var _a;
                if (!this.lblAddress.isConnected)
                    await this.lblAddress.ready();
                if (!this.imgLogo.isConnected)
                    await this.imgLogo.ready();
                if (!this.markdownDescription.isConnected)
                    await this.markdownDescription.ready();
                this.lblAddress.caption = this.state.getContractAddress('Proxy');
                let url = '';
                if (!this._data.logo && !this._data.logoUrl && !this._data.description) {
                    url = 'https://placehold.co/150x100?text=No+Image';
                }
                else if ((_a = this._data.logo) === null || _a === void 0 ? void 0 : _a.startsWith('ipfs://')) {
                    url = this._data.logo.replace('ipfs://', this.state.ipfsGatewayUrl);
                }
                else {
                    url = this._data.logo || this._data.logoUrl;
                }
                this.imgLogo.url = url;
                this.markdownDescription.load(this._data.description || '');
                await this.initWallet();
                this.updateBtnClaim(false);
                this.refetchClaimAmount(this.tokenSelection.token);
            };
            this.updateBtnClaim = async (enabled) => {
                if (!this.btnClaim.isConnected)
                    await this.btnClaim.ready();
                if (!(0, index_2.isClientWalletConnected)()) {
                    this.btnClaim.enabled = true;
                    this.btnClaim.caption = 'Connect Wallet';
                }
                else if (!this.state.isRpcWalletConnected()) {
                    this.btnClaim.enabled = true;
                    this.btnClaim.caption = 'Switch Network';
                }
                else {
                    this.btnClaim.caption = 'Claim';
                    this.btnClaim.enabled = enabled;
                }
            };
            this.initWallet = async () => {
                try {
                    await eth_wallet_4.Wallet.getClientInstance().init();
                    await this.rpcWallet.init();
                }
                catch (err) {
                    console.log(err);
                }
            };
            this.state = new index_2.State(data_json_1.default);
        }
        removeRpcWalletEvents() {
            const rpcWallet = this.rpcWallet;
            for (let event of this.rpcWalletEvents) {
                rpcWallet.unregisterWalletEvent(event);
            }
            this.rpcWalletEvents = [];
        }
        onHide() {
            this.dappContainer.onHide();
            this.removeRpcWalletEvents();
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get chainId() {
            return this.state.getChainId();
        }
        get rpcWallet() {
            return this.state.getRpcWallet();
        }
        get description() {
            var _a;
            return (_a = this._data.description) !== null && _a !== void 0 ? _a : '';
        }
        set description(value) {
            this._data.description = value;
        }
        get logo() {
            var _a;
            return (_a = this._data.logo) !== null && _a !== void 0 ? _a : '';
        }
        set logo(value) {
            this._data.logo = value;
        }
        get wallets() {
            var _a;
            return (_a = this._data.wallets) !== null && _a !== void 0 ? _a : [];
        }
        set wallets(value) {
            this._data.wallets = value;
        }
        get networks() {
            var _a;
            return (_a = this._data.networks) !== null && _a !== void 0 ? _a : [];
        }
        set networks(value) {
            this._data.networks = value;
        }
        get showHeader() {
            var _a;
            return (_a = this._data.showHeader) !== null && _a !== void 0 ? _a : true;
        }
        set showHeader(value) {
            this._data.showHeader = value;
        }
        get showFooter() {
            var _a;
            return (_a = this._data.showFooter) !== null && _a !== void 0 ? _a : true;
        }
        set showFooter(value) {
            this._data.showFooter = value;
        }
        get defaultChainId() {
            return this._data.defaultChainId;
        }
        set defaultChainId(value) {
            this._data.defaultChainId = value;
        }
        get contractInfo() {
            return this.state.contractInfoByChain;
        }
        set contractInfo(value) {
            this.state.contractInfoByChain = value;
        }
        getData() {
            return this._data;
        }
        async resetRpcWallet() {
            var _a;
            this.removeRpcWalletEvents();
            const rpcWalletId = await this.state.initRpcWallet(this.defaultChainId);
            const rpcWallet = this.rpcWallet;
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_4.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
                this.onChainChanged();
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_4.Constants.RpcWalletEvent.Connected, async (connected) => {
                this.refreshWidget();
            });
            this.rpcWalletEvents.push(chainChangedEvent, connectedEvent);
            const data = {
                defaultChainId: this.defaultChainId,
                wallets: this.wallets,
                networks: this.networks,
                showHeader: this.showHeader,
                showFooter: this.showFooter,
                rpcWalletId: (rpcWallet === null || rpcWallet === void 0 ? void 0 : rpcWallet.instanceId) || ''
            };
            if ((_a = this.dappContainer) === null || _a === void 0 ? void 0 : _a.setData)
                this.dappContainer.setData(data);
        }
        async setData(data) {
            var _a;
            this._data = data;
            await this.resetRpcWallet();
            if (!this.tokenSelection.isConnected)
                await this.tokenSelection.ready();
            // if (this.tokenSelection.rpcWalletId !== this.rpcWallet.instanceId) {
            //   this.tokenSelection.rpcWalletId = this.rpcWallet.instanceId;
            // }
            this.tokenSelection.chainId = (_a = this.state.getChainId()) !== null && _a !== void 0 ? _a : this.defaultChainId;
            await this.refreshWidget();
        }
        getTag() {
            return this.tag;
        }
        updateTag(type, value) {
            var _a;
            this.tag[type] = (_a = this.tag[type]) !== null && _a !== void 0 ? _a : {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this.tag[prop] = newValue[prop];
                }
            }
            this.updateTheme();
        }
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c;
            const themeVar = ((_a = this.dappContainer) === null || _a === void 0 ? void 0 : _a.theme) || 'light';
            this.updateStyle('--text-primary', (_b = this.tag[themeVar]) === null || _b === void 0 ? void 0 : _b.fontColor);
            this.updateStyle('--background-main', (_c = this.tag[themeVar]) === null || _c === void 0 ? void 0 : _c.backgroundColor);
        }
        initTag() {
            const getColors = (vars) => {
                return {
                    "backgroundColor": vars.background.main,
                    "fontColor": vars.text.primary
                };
            };
            const defaultTag = {
                dark: getColors(components_4.Styles.Theme.darkTheme),
                light: getColors(components_4.Styles.Theme.defaultTheme)
            };
            this.setTag(defaultTag);
        }
        async refetchClaimAmount(token) {
            if (!token) {
                this.lbClaimable.caption = '0.00';
                this.updateBtnClaim(false);
                return;
            }
            ;
            const claimAmount = await (0, API_1.getClaimAmount)(this.state, token);
            this.lbClaimable.caption = `${(0, index_3.formatNumber)(claimAmount)} ${token.symbol || ''}`;
            this.updateBtnClaim(claimAmount.gt(0));
        }
        async selectToken(token) {
            await this.refetchClaimAmount(token);
        }
        async onClaim() {
            if (!(0, index_2.isClientWalletConnected)()) {
                if (this.mdWallet) {
                    await components_4.application.loadPackage('@scom/scom-wallet-modal', '*');
                    this.mdWallet.networks = this.networks;
                    this.mdWallet.wallets = this.wallets;
                    this.mdWallet.showModal();
                }
                return;
            }
            if (!this.state.isRpcWalletConnected()) {
                const clientWallet = eth_wallet_4.Wallet.getClientInstance();
                await clientWallet.switchNetwork(this.chainId);
                return;
            }
            this.txStatusModal.message = {
                status: 'warning',
                content: 'Confirming'
            };
            this.txStatusModal.showModal();
            (0, API_1.claim)(this.state, this.tokenSelection.token, (error, receipt) => {
                if (error) {
                    this.txStatusModal.message = {
                        status: 'error',
                        content: error
                    };
                    this.txStatusModal.showModal();
                }
                else if (receipt) {
                    this.txStatusModal.message = {
                        status: 'success',
                        content: receipt
                    };
                    this.txStatusModal.showModal();
                }
            }, () => {
                this.refetchClaimAmount(this.tokenSelection.token);
            });
        }
        _getActions(dataSchema, uiSchema) {
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData = {
                            defaultChainId: 0,
                            wallets: [],
                            networks: []
                        };
                        let oldTag = {};
                        return {
                            execute: async () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { logo, logoUrl, description } = userInputData, themeSettings = __rest(userInputData, ["logo", "logoUrl", "description"]);
                                const generalSettings = {
                                    logo,
                                    logoUrl,
                                    description,
                                };
                                this._data.logo = generalSettings.logo;
                                this._data.logoUrl = generalSettings.logoUrl;
                                this._data.description = generalSettings.description;
                                this.setData(this._data);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(themeSettings);
                            },
                            undo: () => {
                                this._data = JSON.parse(JSON.stringify(oldData));
                                this.setData(this._data);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(oldData);
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: dataSchema,
                    userInputUISchema: uiSchema
                }
            ];
            return actions;
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        return this._getActions(formSchema_json_1.default.builderSchema, formSchema_json_1.default.builderUISchema);
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        return this._getActions(formSchema_json_1.default.embedderSchema, formSchema_json_1.default.embedderUISchema);
                    },
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign(Object.assign({}, self._data), newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            this.initTag();
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const description = this.getAttribute('description', true);
                const logo = this.getAttribute('logo', true);
                const logoUrl = this.getAttribute('logoUrl', true);
                const networks = this.getAttribute('networks', true);
                const wallets = this.getAttribute('wallets', true);
                const showHeader = this.getAttribute('showHeader', true);
                const showFooter = this.getAttribute('showFooter', true);
                const defaultChainId = this.getAttribute('defaultChainId', true);
                const contractInfo = this.getAttribute('contractInfo', true, {});
                this.state.contractInfoByChain = contractInfo;
                await this.setData({ description, logo, logoUrl, networks, wallets, showHeader, showFooter, defaultChainId });
            }
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
        }
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer", showFooter: true, showHeader: true },
                this.$render("i-panel", { background: { color: Theme.background.main } },
                    this.$render("i-grid-layout", { id: "gridDApp", maxWidth: "500px", margin: { right: "auto", left: "auto", top: '0.5rem', bottom: '0.5rem' }, height: "100%" },
                        this.$render("i-vstack", { gap: 8, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, verticalAlignment: "space-between", horizontalAlignment: "center" },
                            this.$render("i-label", { caption: "Commission Claim", font: { bold: true, size: '1rem' } }),
                            this.$render("i-vstack", { gap: 8 },
                                this.$render("i-image", { id: "imgLogo", maxWidth: 'unset', maxHeight: 'unset', border: { radius: 4 }, height: 100 }),
                                this.$render("i-markdown", { id: "markdownDescription", class: index_css_1.markdownStyle, width: "100%", height: "100%" })),
                            this.$render("i-vstack", { gap: 12 },
                                this.$render("i-hstack", { gap: 8, width: "100%", verticalAlignment: "center" },
                                    this.$render("i-label", { caption: "Token:", font: { size: '0.875rem' }, margin: { top: 8 } }),
                                    this.$render("i-scom-token-input", { id: "tokenSelection", type: "combobox", isBalanceShown: false, isInputShown: false, isCommonShown: false, isBtnMaxShown: false, isSortBalanceShown: false, modalStyles: {
                                            maxWidth: 140
                                        }, onSelectToken: this.selectToken })),
                                this.$render("i-hstack", { width: "100%", gap: "0.5rem", verticalAlignment: "center" },
                                    this.$render("i-label", { caption: "Claimable:", font: { size: '0.875rem' } }),
                                    this.$render("i-label", { id: "lbClaimable", caption: "0.00", font: { size: '0.875rem' } })),
                                this.$render("i-hstack", { horizontalAlignment: "center", verticalAlignment: 'center', gap: "8px" },
                                    this.$render("i-button", { id: "btnClaim", width: 180, caption: "Claim", padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, font: { size: '0.875rem', color: Theme.colors.primary.contrastText }, rightIcon: { visible: false, fill: Theme.colors.primary.contrastText }, background: { color: Theme.colors.primary.main }, onClick: this.onClaim, enabled: false }))),
                            this.$render("i-vstack", { gap: 8 },
                                this.$render("i-label", { id: "lblRef", font: { size: '0.75rem' } }),
                                this.$render("i-label", { id: "lblAddress", font: { size: '0.75rem' }, overflowWrap: "anywhere" })),
                            this.$render("i-label", { caption: "Terms & Condition", font: { size: '0.75rem' }, link: { href: 'https://docs.scom.dev/' } }))),
                    this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }),
                    this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] }))));
        }
    };
    ScomCommissionClaim = __decorate([
        components_4.customModule,
        (0, components_4.customElements)('i-scom-commission-claim')
    ], ScomCommissionClaim);
    exports.default = ScomCommissionClaim;
});
