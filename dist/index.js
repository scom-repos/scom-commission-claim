var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    exports.tokenSelectionStyle = exports.inputStyle = exports.markdownStyle = exports.imageStyle = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    exports.imageStyle = components_2.Styles.style({
        $nest: {
            '&>img': {
                maxWidth: 'unset',
                maxHeight: 'unset',
                borderRadius: 4
            }
        }
    });
    exports.markdownStyle = components_2.Styles.style({
        overflowWrap: 'break-word',
        color: Theme.text.primary
    });
    exports.inputStyle = components_2.Styles.style({
        $nest: {
            '> input': {
                background: 'transparent',
                border: 0,
                padding: '0.25rem 0.5rem',
                textAlign: 'right'
            }
        }
    });
    exports.tokenSelectionStyle = components_2.Styles.style({
        $nest: {
            'i-modal': {
                minWidth: 'auto !important',
                maxWidth: '140px !important'
            },
            '.modal': {
                minWidth: 'auto !important',
            }
        }
    });
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50600080546001600160a01b031916331790556104e4806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80639c52a7f11161005b5780639c52a7f114610109578063a2f55ae51461011c578063d4ee1d901461012f578063f2fde38b1461014f57600080fd5b80633fd8cc4e1461008257806360536172146100ba5780638da5cb5b146100c4575b600080fd5b6100a5610090366004610471565b60026020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b6100c2610162565b005b6000546100e49073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b1565b6100c2610117366004610471565b610290565b6100c261012a366004610471565b610337565b6001546100e49073ffffffffffffffffffffffffffffffffffffffff1681565b6100c261015d366004610471565b6103da565b60015473ffffffffffffffffffffffffffffffffffffffff16331461020d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840160405180910390fd5b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102b457600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff16331461035b57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf5910161032c565b60005473ffffffffffffffffffffffffffffffffffffffff1633146103fe57600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b9060200161032c565b60006020828403121561048357600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146104a757600080fd5b939250505056fea264697066735822122033e2168c52e6ad7dba3a67ff5b9b8ef2f2aca308087efe2ebf7dfc9d5ef61bee64736f6c63430008110033"
    };
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.json.ts"], function (require, exports, eth_contract_1, Authorization_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Authorization = void 0;
    class Authorization extends eth_contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, Authorization_json_1.default.abi, Authorization_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        assign() {
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return result;
            };
            this.isPermitted = isPermitted_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            let deny_txData = async (user, options) => {
                let result = await this.txData('deny', [user], options);
                return result;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call,
                txData: deny_txData
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            let permit_txData = async (user, options) => {
                let result = await this.txData('permit', [user], options);
                return result;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call,
                txData: permit_txData
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            let takeOwnership_txData = async (options) => {
                let result = await this.txData('takeOwnership', [], options);
                return result;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call,
                txData: takeOwnership_txData
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            let transferOwnership_txData = async (newOwner, options) => {
                let result = await this.txData('transferOwnership', [newOwner], options);
                return result;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call,
                txData: transferOwnership_txData
            });
        }
    }
    Authorization._abi = Authorization_json_1.default.abi;
    exports.Authorization = Authorization;
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.json.ts'/> 
    exports.default = {
        "abi": [
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "AddCommission", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Skim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissions", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "claimantIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "claimantIds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "claimantsInfo", "outputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "ethIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "getClaimantBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "fromId", "type": "uint256" }, { "internalType": "uint256", "name": "count", "type": "uint256" }], "name": "getClaimantsInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct Proxy.ClaimantInfo[]", "name": "claimantInfoList", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn", "name": "tokensIn", "type": "tuple" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "tokenIn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "608060405234801561001057600080fd5b5061255a806100206000396000f3fe6080604052600436106100cb5760003560e01c8063b60c164c11610074578063d3b7d4c31161004e578063d3b7d4c31461027c578063ee42d3a31461029c578063f303ad6e146102c957600080fd5b8063b60c164c146101b1578063c0da918d146101d1578063d2ef8464146101f157600080fd5b806373d8690f116100a557806373d8690f1461014257806383e40a5114610155578063b316d7141461019b57600080fd5b806301417e7b146100d7578063188ff72b146100ec5780631e83409a1461012257600080fd5b366100d257005b600080fd5b6100ea6100e5366004611f63565b6102e9565b005b3480156100f857600080fd5b5061010c610107366004612010565b610493565b6040516101199190612032565b60405180910390f35b34801561012e57600080fd5b506100ea61013d3660046120a4565b610660565b6100ea61015036600461210d565b61066c565b34801561016157600080fd5b5061018d6101703660046121c8565b600360209081526000928352604080842090915290825290205481565b604051908152602001610119565b3480156101a757600080fd5b5061018d60005481565b3480156101bd57600080fd5b506100ea6101cc366004612201565b610e01565b3480156101dd57600080fd5b506100ea6101ec366004612243565b610fe9565b3480156101fd57600080fd5b5061024961020c3660046122c1565b600260208190526000918252604090912080546001820154919092015473ffffffffffffffffffffffffffffffffffffffff928316929091169083565b6040805173ffffffffffffffffffffffffffffffffffffffff948516815293909216602084015290820152606001610119565b34801561028857600080fd5b5061018d6102973660046121c8565b61134a565b3480156102a857600080fd5b5061018d6102b73660046120a4565b60016020526000908152604090205481565b3480156102d557600080fd5b506100ea6102e4366004612201565b611393565b600082815b818110156103bb5736868683818110610309576103096122da565b90506040020190508060200135846103219190612338565b935061033f61033360208301836120a4565b600083602001356113e0565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61036d60208301836120a4565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806103b38161234b565b9150506102ee565b5060006103c88334612383565b600080805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4980549293508592909190610408908490612338565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af180600003610488573d6000803e3d6000fd5b503d6000803e3d6000f35b60606000831180156104a757506000548311155b610512576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f6f7574206f6620626f756e64730000000000000000000000000000000000000060448201526064015b60405180910390fd5b6000836000546105229190612383565b61052d906001612338565b90508083111561053b578092505b8267ffffffffffffffff81111561055457610554611e89565b6040519080825280602002602001820160405280156105bd57816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816105725790505b5091508360005b84811015610657576000828152600260208181526040928390208351606081018552815473ffffffffffffffffffffffffffffffffffffffff9081168252600183015416928101929092529091015491810191909152845185908390811061062e5761062e6122da565b6020026020010181905250816106439061234b565b91508061064f8161234b565b9150506105c4565b50505092915050565b61066981611505565b50565b846000805b82811015610b44573689898381811061068c5761068c6122da565b905060200281019061069e9190612396565b90506000806106b060608401846123d4565b9050905060005b818110156107a957366106cd60608601866123d4565b838181106106dd576106dd6122da565b90506040020190508060200135846106f59190612338565b935061071e61070760208301836120a4565b61071460208801886120a4565b83602001356113e0565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61074c60208301836120a4565b61075960208801886120a4565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806107a18161234b565b9150506106b7565b50600090506107bc826020850135612383565b905081600160006107d060208701876120a4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108199190612338565b909155506000905061082e60208501856120a4565b73ffffffffffffffffffffffffffffffffffffffff16036109265784156108b1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e736665720000000000006044820152606401610509565b8260200135341461091e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d617463686564000000000000000000006044820152606401610509565b809450610ac4565b610936606084016040850161244a565b156109f557600061095361094d60208601866120a4565b84611633565b90508281146109be576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d6174636865640000006044820152606401610509565b6109ef338f846109d160208901896120a4565b73ffffffffffffffffffffffffffffffffffffffff16929190611789565b50610ac4565b6000610a11610a0760208601866120a4565b8560200135611633565b905083602001358114610a80576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d61746368656400000000000000000000000000006044820152606401610509565b610ab08e6000610a9360208801886120a4565b73ffffffffffffffffffffffffffffffffffffffff169190611865565b610ac28e83610a9360208801886120a4565b505b610ad160208401846120a4565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a35050508080610b3c9061234b565b915050610671565b50600080845185602001848d5af180600003610b64573d6000803e3d6000fd5b5083915060005b8281101561048857600080878784818110610b8857610b886122da565b9050602002016020810190610b9d91906120a4565b73ffffffffffffffffffffffffffffffffffffffff1603610bfe576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954610bed9047612383565b9050610bf988826119ec565b610d70565b60016000888885818110610c1457610c146122da565b9050602002016020810190610c2991906120a4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610c7657610c766122da565b9050602002016020810190610c8b91906120a4565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610cf7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d1b9190612467565b610d259190612383565b9050610d708882898986818110610d3e57610d3e6122da565b9050602002016020810190610d5391906120a4565b73ffffffffffffffffffffffffffffffffffffffff169190611af6565b868683818110610d8257610d826122da565b9050602002016020810190610d9791906120a4565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610df98161234b565b915050610b6b565b8060005b81811015610fe357600080858584818110610e2257610e226122da565b9050602002016020810190610e3791906120a4565b905073ffffffffffffffffffffffffffffffffffffffff8116610e9d576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954479250610e8c9083612383565b9150610e9833836119ec565b610f81565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610f07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f2b9190612467565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054909250610f5e9083612383565b9150610f8173ffffffffffffffffffffffffffffffffffffffff82163384611af6565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080610fdb9061234b565b915050610e05565b50505050565b81600080610ffa60608401846123d4565b9050905060005b818110156110e9573661101760608601866123d4565b83818110611027576110276122da565b905060400201905080602001358461103f9190612338565b935061105e61105160208301836120a4565b61071460208a018a6120a4565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61108c60208301836120a4565b61109960208a018a6120a4565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806110e18161234b565b915050611001565b5060006110fa836020860135612383565b9050826001600061110e60208801886120a4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111579190612338565b9091555061116d9050606085016040860161244a565b1561120e57600061118a61118460208701876120a4565b85611633565b90508381146111f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d6174636865640000006044820152606401610509565b6112083389846109d160208a018a6120a4565b506112c0565b600061122a61122060208701876120a4565b8660200135611633565b905084602001358114611299576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d61746368656400000000000000000000000000006044820152606401610509565b6112ac886000610a9360208901896120a4565b6112be8883610a9360208901896120a4565b505b6112cd60208501856120a4565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af180600003610488573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff8083166000908152600360209081526040808320938516835292815282822054825260029081905291902001545b92915050565b8060005b81811015610fe3576113ce8484838181106113b4576113b46122da565b90506020020160208101906113c991906120a4565b611505565b806113d88161234b565b915050611397565b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600360209081526040808320938616835292905290812054908190036114d957600080815461142b9061234b565b909155506040805160608101825273ffffffffffffffffffffffffffffffffffffffff80871680835286821660208085018281528587018981526000805481526002808552898220985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a01805491909916941693909317909655519501949094558254918352600384528483209083529092529190912055610fe3565b600081815260026020819052604082200180548492906114fa908490612338565b909155505050505050565b33600090815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff8581168086529184528285205480865260028086528487208551606081018752815485168152600180830154909516818901529101805482870181905290889055938752919094529184208054939492939192839261158c908490612383565b909155505073ffffffffffffffffffffffffffffffffffffffff84166115bb576115b633826119ec565b6115dc565b6115dc73ffffffffffffffffffffffffffffffffffffffff85163383611af6565b6040805173ffffffffffffffffffffffffffffffffffffffff861681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a250505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa1580156116a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c49190612467565b90506116e873ffffffffffffffffffffffffffffffffffffffff8416333085611789565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015611754573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117789190612467565b6117829190612383565b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610fe39085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611b4c565b80158061190557506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156118df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119039190612467565b155b611991576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610509565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526119e79084907f095ea7b300000000000000000000000000000000000000000000000000000000906064016117e3565b505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051611a2391906124a4565b60006040518083038185875af1925050503d8060008114611a60576040519150601f19603f3d011682016040523d82523d6000602084013e611a65565b606091505b50509050806119e7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c454400000000000000000000000000000000000000000000000000000000006064820152608401610509565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526119e79084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064016117e3565b6000611bae826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16611c589092919063ffffffff16565b8051909150156119e75780806020019051810190611bcc91906124b6565b6119e7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610509565b6060611c678484600085611c6f565b949350505050565b606082471015611d01576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610509565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611d2a91906124a4565b60006040518083038185875af1925050503d8060008114611d67576040519150601f19603f3d011682016040523d82523d6000602084013e611d6c565b606091505b5091509150611d7d87838387611d88565b979650505050505050565b60608315611e1e578251600003611e175773ffffffffffffffffffffffffffffffffffffffff85163b611e17576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610509565b5081611c67565b611c678383815115611e335781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050991906124d3565b73ffffffffffffffffffffffffffffffffffffffff8116811461066957600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611ec957600080fd5b813567ffffffffffffffff80821115611ee457611ee4611e89565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611f2a57611f2a611e89565b81604052838152866020858801011115611f4357600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611f7957600080fd5b8435611f8481611e67565b9350602085013567ffffffffffffffff80821115611fa157600080fd5b818701915087601f830112611fb557600080fd5b813581811115611fc457600080fd5b8860208260061b8501011115611fd957600080fd5b602083019550809450506040870135915080821115611ff757600080fd5b5061200487828801611eb8565b91505092959194509250565b6000806040838503121561202357600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b82811015612097578151805173ffffffffffffffffffffffffffffffffffffffff9081168652878201511687860152850151858501526060909301929085019060010161204f565b5091979650505050505050565b6000602082840312156120b657600080fd5b813561178281611e67565b60008083601f8401126120d357600080fd5b50813567ffffffffffffffff8111156120eb57600080fd5b6020830191508360208260051b850101111561210657600080fd5b9250929050565b600080600080600080600060a0888a03121561212857600080fd5b873561213381611e67565b9650602088013567ffffffffffffffff8082111561215057600080fd5b61215c8b838c016120c1565b909850965060408a0135915061217182611e67565b9094506060890135908082111561218757600080fd5b6121938b838c016120c1565b909550935060808a01359150808211156121ac57600080fd5b506121b98a828b01611eb8565b91505092959891949750929550565b600080604083850312156121db57600080fd5b82356121e681611e67565b915060208301356121f681611e67565b809150509250929050565b6000806020838503121561221457600080fd5b823567ffffffffffffffff81111561222b57600080fd5b612237858286016120c1565b90969095509350505050565b60008060006060848603121561225857600080fd5b833561226381611e67565b9250602084013567ffffffffffffffff8082111561228057600080fd5b908501906080828803121561229457600080fd5b909250604085013590808211156122aa57600080fd5b506122b786828701611eb8565b9150509250925092565b6000602082840312156122d357600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561138d5761138d612309565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361237c5761237c612309565b5060010190565b8181038181111561138d5761138d612309565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff818336030181126123ca57600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261240957600080fd5b83018035915067ffffffffffffffff82111561242457600080fd5b6020019150600681901b360382131561210657600080fd5b801515811461066957600080fd5b60006020828403121561245c57600080fd5b81356117828161243c565b60006020828403121561247957600080fd5b5051919050565b60005b8381101561249b578181015183820152602001612483565b50506000910152565b600082516123ca818460208701612480565b6000602082840312156124c857600080fd5b81516117828161243c565b60208152600082518060208401526124f2816040850160208701612480565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212208741166fc231fb271ff0e49a5c08c7b28e738ee0db40a45e26ac068eacf5e10464736f6c63430008110033"
    };
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.json.ts"], function (require, exports, eth_contract_2, Proxy_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Proxy = void 0;
    class Proxy extends eth_contract_2.Contract {
        constructor(wallet, address) {
            super(wallet, address, Proxy_json_1.default.abi, Proxy_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseAddCommissionEvent(receipt) {
            return this.parseEvents(receipt, "AddCommission").map(e => this.decodeAddCommissionEvent(e));
        }
        decodeAddCommissionEvent(event) {
            let result = event.data;
            return {
                to: result.to,
                token: result.token,
                amount: new eth_contract_2.BigNumber(result.amount),
                _event: event
            };
        }
        parseClaimEvent(receipt) {
            return this.parseEvents(receipt, "Claim").map(e => this.decodeClaimEvent(e));
        }
        decodeClaimEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                token: result.token,
                amount: new eth_contract_2.BigNumber(result.amount),
                _event: event
            };
        }
        parseSkimEvent(receipt) {
            return this.parseEvents(receipt, "Skim").map(e => this.decodeSkimEvent(e));
        }
        decodeSkimEvent(event) {
            let result = event.data;
            return {
                token: result.token,
                to: result.to,
                amount: new eth_contract_2.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferBackEvent(receipt) {
            return this.parseEvents(receipt, "TransferBack").map(e => this.decodeTransferBackEvent(e));
        }
        decodeTransferBackEvent(event) {
            let result = event.data;
            return {
                target: result.target,
                token: result.token,
                sender: result.sender,
                amount: new eth_contract_2.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferForwardEvent(receipt) {
            return this.parseEvents(receipt, "TransferForward").map(e => this.decodeTransferForwardEvent(e));
        }
        decodeTransferForwardEvent(event) {
            let result = event.data;
            return {
                target: result.target,
                token: result.token,
                sender: result.sender,
                amount: new eth_contract_2.BigNumber(result.amount),
                commissions: new eth_contract_2.BigNumber(result.commissions),
                _event: event
            };
        }
        assign() {
            let claimantIdCount_call = async (options) => {
                let result = await this.call('claimantIdCount', [], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.claimantIdCount = claimantIdCount_call;
            let claimantIdsParams = (params) => [params.param1, params.param2];
            let claimantIds_call = async (params, options) => {
                let result = await this.call('claimantIds', claimantIdsParams(params), options);
                return new eth_contract_2.BigNumber(result);
            };
            this.claimantIds = claimantIds_call;
            let claimantsInfo_call = async (param1, options) => {
                let result = await this.call('claimantsInfo', [this.wallet.utils.toString(param1)], options);
                return {
                    claimant: result.claimant,
                    token: result.token,
                    balance: new eth_contract_2.BigNumber(result.balance)
                };
            };
            this.claimantsInfo = claimantsInfo_call;
            let getClaimantBalanceParams = (params) => [params.claimant, params.token];
            let getClaimantBalance_call = async (params, options) => {
                let result = await this.call('getClaimantBalance', getClaimantBalanceParams(params), options);
                return new eth_contract_2.BigNumber(result);
            };
            this.getClaimantBalance = getClaimantBalance_call;
            let getClaimantsInfoParams = (params) => [this.wallet.utils.toString(params.fromId), this.wallet.utils.toString(params.count)];
            let getClaimantsInfo_call = async (params, options) => {
                let result = await this.call('getClaimantsInfo', getClaimantsInfoParams(params), options);
                return (result.map(e => ({
                    claimant: e.claimant,
                    token: e.token,
                    balance: new eth_contract_2.BigNumber(e.balance)
                })));
            };
            this.getClaimantsInfo = getClaimantsInfo_call;
            let lastBalance_call = async (param1, options) => {
                let result = await this.call('lastBalance', [param1], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.lastBalance = lastBalance_call;
            let claim_send = async (token, options) => {
                let result = await this.send('claim', [token], options);
                return result;
            };
            let claim_call = async (token, options) => {
                let result = await this.call('claim', [token], options);
                return;
            };
            let claim_txData = async (token, options) => {
                let result = await this.txData('claim', [token], options);
                return result;
            };
            this.claim = Object.assign(claim_send, {
                call: claim_call,
                txData: claim_txData
            });
            let claimMultiple_send = async (tokens, options) => {
                let result = await this.send('claimMultiple', [tokens], options);
                return result;
            };
            let claimMultiple_call = async (tokens, options) => {
                let result = await this.call('claimMultiple', [tokens], options);
                return;
            };
            let claimMultiple_txData = async (tokens, options) => {
                let result = await this.txData('claimMultiple', [tokens], options);
                return result;
            };
            this.claimMultiple = Object.assign(claimMultiple_send, {
                call: claimMultiple_call,
                txData: claimMultiple_txData
            });
            let ethInParams = (params) => [params.target, params.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)])), this.wallet.utils.stringToBytes(params.data)];
            let ethIn_send = async (params, options) => {
                let result = await this.send('ethIn', ethInParams(params), options);
                return result;
            };
            let ethIn_call = async (params, options) => {
                let result = await this.call('ethIn', ethInParams(params), options);
                return;
            };
            let ethIn_txData = async (params, options) => {
                let result = await this.txData('ethIn', ethInParams(params), options);
                return result;
            };
            this.ethIn = Object.assign(ethIn_send, {
                call: ethIn_call,
                txData: ethIn_txData
            });
            let proxyCallParams = (params) => [params.target, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount), e.directTransfer, e.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))])), params.to, params.tokensOut, this.wallet.utils.stringToBytes(params.data)];
            let proxyCall_send = async (params, options) => {
                let result = await this.send('proxyCall', proxyCallParams(params), options);
                return result;
            };
            let proxyCall_call = async (params, options) => {
                let result = await this.call('proxyCall', proxyCallParams(params), options);
                return;
            };
            let proxyCall_txData = async (params, options) => {
                let result = await this.txData('proxyCall', proxyCallParams(params), options);
                return result;
            };
            this.proxyCall = Object.assign(proxyCall_send, {
                call: proxyCall_call,
                txData: proxyCall_txData
            });
            let skim_send = async (tokens, options) => {
                let result = await this.send('skim', [tokens], options);
                return result;
            };
            let skim_call = async (tokens, options) => {
                let result = await this.call('skim', [tokens], options);
                return;
            };
            let skim_txData = async (tokens, options) => {
                let result = await this.txData('skim', [tokens], options);
                return result;
            };
            this.skim = Object.assign(skim_send, {
                call: skim_call,
                txData: skim_txData
            });
            let tokenInParams = (params) => [params.target, [params.tokensIn.token, this.wallet.utils.toString(params.tokensIn.amount), params.tokensIn.directTransfer, params.tokensIn.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))], this.wallet.utils.stringToBytes(params.data)];
            let tokenIn_send = async (params, options) => {
                let result = await this.send('tokenIn', tokenInParams(params), options);
                return result;
            };
            let tokenIn_call = async (params, options) => {
                let result = await this.call('tokenIn', tokenInParams(params), options);
                return;
            };
            let tokenIn_txData = async (params, options) => {
                let result = await this.txData('tokenIn', tokenInParams(params), options);
                return result;
            };
            this.tokenIn = Object.assign(tokenIn_send, {
                call: tokenIn_call,
                txData: tokenIn_txData
            });
        }
    }
    Proxy._abi = Proxy_json_1.default.abi;
    exports.Proxy = Proxy;
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.json.ts'/> 
    exports.default = {
        "abi": [
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "AddCommission", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Skim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissions", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "claimantIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "claimantIds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "claimantsInfo", "outputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV2.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "ethIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "getClaimantBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "fromId", "type": "uint256" }, { "internalType": "uint256", "name": "count", "type": "uint256" }], "name": "getClaimantsInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct ProxyV2.ClaimantInfo[]", "name": "claimantInfoList", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV2.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "uint256", "name": "totalCommissions", "type": "uint256" }], "internalType": "struct ProxyV2.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV2.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "uint256", "name": "totalCommissions", "type": "uint256" }], "internalType": "struct ProxyV2.TokensIn", "name": "tokensIn", "type": "tuple" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "tokenIn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "608060405234801561001057600080fd5b506125ab806100206000396000f3fe6080604052600436106100cb5760003560e01c8063b60c164c11610074578063ee42d3a31161004e578063ee42d3a31461027c578063f303ad6e146102a9578063fddaea46146102c957600080fd5b8063b60c164c146101b1578063d2ef8464146101d1578063d3b7d4c31461025c57600080fd5b80637c93df2b116100a55780637c93df2b1461014257806383e40a5114610155578063b316d7141461019b57600080fd5b806301417e7b146100d7578063188ff72b146100ec5780631e83409a1461012257600080fd5b366100d257005b600080fd5b6100ea6100e5366004611fb4565b6102e9565b005b3480156100f857600080fd5b5061010c610107366004612061565b610493565b6040516101199190612083565b60405180910390f35b34801561012e57600080fd5b506100ea61013d3660046120f5565b610677565b6100ea61015036600461215e565b610683565b34801561016157600080fd5b5061018d610170366004612219565b600360209081526000928352604080842090915290825290205481565b604051908152602001610119565b3480156101a757600080fd5b5061018d60005481565b3480156101bd57600080fd5b506100ea6101cc366004612252565b610e3d565b3480156101dd57600080fd5b506102296101ec366004612294565b600260208190526000918252604090912080546001820154919092015473ffffffffffffffffffffffffffffffffffffffff928316929091169083565b6040805173ffffffffffffffffffffffffffffffffffffffff948516815293909216602084015290820152606001610119565b34801561026857600080fd5b5061018d610277366004612219565b611025565b34801561028857600080fd5b5061018d6102973660046120f5565b60016020526000908152604090205481565b3480156102b557600080fd5b506100ea6102c4366004612252565b61106e565b3480156102d557600080fd5b506100ea6102e43660046122ad565b6110bb565b600082815b818110156103bb57368686838181106103095761030961232b565b90506040020190508060200135846103219190612389565b935061033f61033360208301836120f5565b60008360200135611431565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61036d60208301836120f5565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806103b38161239c565b9150506102ee565b5060006103c883346123d4565b600080805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4980549293508592909190610408908490612389565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af180600003610488573d6000803e3d6000fd5b503d6000803e3d6000f35b60606000831180156104a757506000548311155b610512576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f6f7574206f6620626f756e64730000000000000000000000000000000000000060448201526064015b60405180910390fd5b600060016105208486612389565b61052a91906123d4565b9050600054811115610552575060005461054484826123d4565b61054f906001612389565b92505b8267ffffffffffffffff81111561056b5761056b611eda565b6040519080825280602002602001820160405280156105d457816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816105895790505b5091508360005b8481101561066e576000828152600260208181526040928390208351606081018552815473ffffffffffffffffffffffffffffffffffffffff908116825260018301541692810192909252909101549181019190915284518590839081106106455761064561232b565b60200260200101819052508161065a9061239c565b9150806106668161239c565b9150506105db565b50505092915050565b61068081611556565b50565b846000805b82811015610b8057368989838181106106a3576106a361232b565b90506020028101906106b591906123e7565b90506000806106c76060840184612425565b9050905060005b818110156107c057366106e46060860186612425565b838181106106f4576106f461232b565b905060400201905080602001358461070c9190612389565b935061073561071e60208301836120f5565b61072b60208801886120f5565b8360200135611431565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61076360208301836120f5565b61077060208801886120f5565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806107b88161239c565b9150506106ce565b5060009050816001826107d660208701876120f5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461081f9190612389565b909155506000905061083460208501856120f5565b73ffffffffffffffffffffffffffffffffffffffff160361093c5784156108b7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e736665720000000000006044820152606401610509565b82602001353414610924576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d617463686564000000000000000000006044820152606401610509565b6109328260208501356123d4565b9050809450610b00565b61094c606084016040850161249b565b15610a2457600061096d61096360208601866120f5565b8560800135611684565b9050828110156109d9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d6174636865640000006044820152606401610509565b6109eb608085013560208601356123d4565b9150610a1e338f84610a0060208901896120f5565b73ffffffffffffffffffffffffffffffffffffffff169291906117da565b50610b00565b6000610a40610a3660208601866120f5565b8560200135611684565b90508360200135811015610ab0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d61746368656400000000000000000000000000006044820152606401610509565b610aba83826123d4565b9150610aec8e6000610acf60208801886120f5565b73ffffffffffffffffffffffffffffffffffffffff1691906118b6565b610afe8e83610acf60208801886120f5565b505b610b0d60208401846120f5565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a35050508080610b789061239c565b915050610688565b50600080845185602001848d5af180600003610ba0573d6000803e3d6000fd5b5083915060005b8281101561048857600080878784818110610bc457610bc461232b565b9050602002016020810190610bd991906120f5565b73ffffffffffffffffffffffffffffffffffffffff1603610c3a576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954610c2990476123d4565b9050610c358882611a3d565b610dac565b60016000888885818110610c5057610c5061232b565b9050602002016020810190610c6591906120f5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610cb257610cb261232b565b9050602002016020810190610cc791906120f5565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610d33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d5791906124b8565b610d6191906123d4565b9050610dac8882898986818110610d7a57610d7a61232b565b9050602002016020810190610d8f91906120f5565b73ffffffffffffffffffffffffffffffffffffffff169190611b47565b868683818110610dbe57610dbe61232b565b9050602002016020810190610dd391906120f5565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610e358161239c565b915050610ba7565b8060005b8181101561101f57600080858584818110610e5e57610e5e61232b565b9050602002016020810190610e7391906120f5565b905073ffffffffffffffffffffffffffffffffffffffff8116610ed9576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954479250610ec890836123d4565b9150610ed43383611a3d565b610fbd565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610f43573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f6791906124b8565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054909250610f9a90836123d4565b9150610fbd73ffffffffffffffffffffffffffffffffffffffff82163384611b47565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a3505080806110179061239c565b915050610e41565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8083166000908152600360209081526040808320938516835292815282822054825260029081905291902001545b92915050565b8060005b8181101561101f576110a984848381811061108f5761108f61232b565b90506020020160208101906110a491906120f5565b611556565b806110b38161239c565b915050611072565b816000806110cc6060840184612425565b9050905060005b818110156111bb57366110e96060860186612425565b838181106110f9576110f961232b565b90506040020190508060200135846111119190612389565b935061113061112360208301836120f5565b61072b60208a018a6120f5565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61115e60208301836120f5565b61116b60208a018a6120f5565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806111b38161239c565b9150506110d3565b506000826001826111cf60208801886120f5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112189190612389565b9091555061122e9050606085016040860161249b565b156112e857600061124f61124560208701876120f5565b8660800135611684565b9050838110156112bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d6174636865640000006044820152606401610509565b6112cd608086013560208701356123d4565b91506112e2338984610a0060208a018a6120f5565b506113a7565b60006113046112fa60208701876120f5565b8660200135611684565b90508460200135811015611374576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d61746368656400000000000000000000000000006044820152606401610509565b61137e84826123d4565b9150611393886000610acf60208901896120f5565b6113a58883610acf60208901896120f5565b505b6113b460208501856120f5565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af180600003610488573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff80841660009081526003602090815260408083209386168352929052908120549081900361152a57600080815461147c9061239c565b909155506040805160608101825273ffffffffffffffffffffffffffffffffffffffff80871680835286821660208085018281528587018981526000805481526002808552898220985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a0180549190991694169390931790965551950194909455825491835260038452848320908352909252919091205561101f565b6000818152600260208190526040822001805484929061154b908490612389565b909155505050505050565b33600090815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff858116808652918452828520548086526002808652848720855160608101875281548516815260018083015490951681890152910180548287018190529088905593875291909452918420805493949293919283926115dd9084906123d4565b909155505073ffffffffffffffffffffffffffffffffffffffff841661160c576116073382611a3d565b61162d565b61162d73ffffffffffffffffffffffffffffffffffffffff85163383611b47565b6040805173ffffffffffffffffffffffffffffffffffffffff861681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a250505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa1580156116f1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061171591906124b8565b905061173973ffffffffffffffffffffffffffffffffffffffff84163330856117da565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa1580156117a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117c991906124b8565b6117d391906123d4565b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff8085166024830152831660448201526064810182905261101f9085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611b9d565b80158061195657506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa158015611930573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061195491906124b8565b155b6119e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610509565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052611a389084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401611834565b505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051611a7491906124f5565b60006040518083038185875af1925050503d8060008114611ab1576040519150601f19603f3d011682016040523d82523d6000602084013e611ab6565b606091505b5050905080611a38576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c454400000000000000000000000000000000000000000000000000000000006064820152608401610509565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052611a389084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401611834565b6000611bff826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16611ca99092919063ffffffff16565b805190915015611a385780806020019051810190611c1d9190612507565b611a38576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610509565b6060611cb88484600085611cc0565b949350505050565b606082471015611d52576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610509565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611d7b91906124f5565b60006040518083038185875af1925050503d8060008114611db8576040519150601f19603f3d011682016040523d82523d6000602084013e611dbd565b606091505b5091509150611dce87838387611dd9565b979650505050505050565b60608315611e6f578251600003611e685773ffffffffffffffffffffffffffffffffffffffff85163b611e68576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610509565b5081611cb8565b611cb88383815115611e845781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105099190612524565b73ffffffffffffffffffffffffffffffffffffffff8116811461068057600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611f1a57600080fd5b813567ffffffffffffffff80821115611f3557611f35611eda565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611f7b57611f7b611eda565b81604052838152866020858801011115611f9457600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611fca57600080fd5b8435611fd581611eb8565b9350602085013567ffffffffffffffff80821115611ff257600080fd5b818701915087601f83011261200657600080fd5b81358181111561201557600080fd5b8860208260061b850101111561202a57600080fd5b60208301955080945050604087013591508082111561204857600080fd5b5061205587828801611f09565b91505092959194509250565b6000806040838503121561207457600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b828110156120e8578151805173ffffffffffffffffffffffffffffffffffffffff908116865287820151168786015285015185850152606090930192908501906001016120a0565b5091979650505050505050565b60006020828403121561210757600080fd5b81356117d381611eb8565b60008083601f84011261212457600080fd5b50813567ffffffffffffffff81111561213c57600080fd5b6020830191508360208260051b850101111561215757600080fd5b9250929050565b600080600080600080600060a0888a03121561217957600080fd5b873561218481611eb8565b9650602088013567ffffffffffffffff808211156121a157600080fd5b6121ad8b838c01612112565b909850965060408a013591506121c282611eb8565b909450606089013590808211156121d857600080fd5b6121e48b838c01612112565b909550935060808a01359150808211156121fd57600080fd5b5061220a8a828b01611f09565b91505092959891949750929550565b6000806040838503121561222c57600080fd5b823561223781611eb8565b9150602083013561224781611eb8565b809150509250929050565b6000806020838503121561226557600080fd5b823567ffffffffffffffff81111561227c57600080fd5b61228885828601612112565b90969095509350505050565b6000602082840312156122a657600080fd5b5035919050565b6000806000606084860312156122c257600080fd5b83356122cd81611eb8565b9250602084013567ffffffffffffffff808211156122ea57600080fd5b9085019060a082880312156122fe57600080fd5b9092506040850135908082111561231457600080fd5b5061232186828701611f09565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156110685761106861235a565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036123cd576123cd61235a565b5060010190565b818103818111156110685761106861235a565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6183360301811261241b57600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261245a57600080fd5b83018035915067ffffffffffffffff82111561247557600080fd5b6020019150600681901b360382131561215757600080fd5b801515811461068057600080fd5b6000602082840312156124ad57600080fd5b81356117d38161248d565b6000602082840312156124ca57600080fd5b5051919050565b60005b838110156124ec5781810151838201526020016124d4565b50506000910152565b6000825161241b8184602087016124d1565b60006020828403121561251957600080fd5b81516117d38161248d565b60208152600082518060208401526125438160408501602087016124d1565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212209cca70a9576e9493198c65a6086f463ebf4f83feb8872306feb8c98fcff97b4b64736f6c63430008110033"
    };
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.json.ts"], function (require, exports, eth_contract_3, ProxyV2_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyV2 = void 0;
    class ProxyV2 extends eth_contract_3.Contract {
        constructor(wallet, address) {
            super(wallet, address, ProxyV2_json_1.default.abi, ProxyV2_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseAddCommissionEvent(receipt) {
            return this.parseEvents(receipt, "AddCommission").map(e => this.decodeAddCommissionEvent(e));
        }
        decodeAddCommissionEvent(event) {
            let result = event.data;
            return {
                to: result.to,
                token: result.token,
                amount: new eth_contract_3.BigNumber(result.amount),
                _event: event
            };
        }
        parseClaimEvent(receipt) {
            return this.parseEvents(receipt, "Claim").map(e => this.decodeClaimEvent(e));
        }
        decodeClaimEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                token: result.token,
                amount: new eth_contract_3.BigNumber(result.amount),
                _event: event
            };
        }
        parseSkimEvent(receipt) {
            return this.parseEvents(receipt, "Skim").map(e => this.decodeSkimEvent(e));
        }
        decodeSkimEvent(event) {
            let result = event.data;
            return {
                token: result.token,
                to: result.to,
                amount: new eth_contract_3.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferBackEvent(receipt) {
            return this.parseEvents(receipt, "TransferBack").map(e => this.decodeTransferBackEvent(e));
        }
        decodeTransferBackEvent(event) {
            let result = event.data;
            return {
                target: result.target,
                token: result.token,
                sender: result.sender,
                amount: new eth_contract_3.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferForwardEvent(receipt) {
            return this.parseEvents(receipt, "TransferForward").map(e => this.decodeTransferForwardEvent(e));
        }
        decodeTransferForwardEvent(event) {
            let result = event.data;
            return {
                target: result.target,
                token: result.token,
                sender: result.sender,
                amount: new eth_contract_3.BigNumber(result.amount),
                commissions: new eth_contract_3.BigNumber(result.commissions),
                _event: event
            };
        }
        assign() {
            let claimantIdCount_call = async (options) => {
                let result = await this.call('claimantIdCount', [], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.claimantIdCount = claimantIdCount_call;
            let claimantIdsParams = (params) => [params.param1, params.param2];
            let claimantIds_call = async (params, options) => {
                let result = await this.call('claimantIds', claimantIdsParams(params), options);
                return new eth_contract_3.BigNumber(result);
            };
            this.claimantIds = claimantIds_call;
            let claimantsInfo_call = async (param1, options) => {
                let result = await this.call('claimantsInfo', [this.wallet.utils.toString(param1)], options);
                return {
                    claimant: result.claimant,
                    token: result.token,
                    balance: new eth_contract_3.BigNumber(result.balance)
                };
            };
            this.claimantsInfo = claimantsInfo_call;
            let getClaimantBalanceParams = (params) => [params.claimant, params.token];
            let getClaimantBalance_call = async (params, options) => {
                let result = await this.call('getClaimantBalance', getClaimantBalanceParams(params), options);
                return new eth_contract_3.BigNumber(result);
            };
            this.getClaimantBalance = getClaimantBalance_call;
            let getClaimantsInfoParams = (params) => [this.wallet.utils.toString(params.fromId), this.wallet.utils.toString(params.count)];
            let getClaimantsInfo_call = async (params, options) => {
                let result = await this.call('getClaimantsInfo', getClaimantsInfoParams(params), options);
                return (result.map(e => ({
                    claimant: e.claimant,
                    token: e.token,
                    balance: new eth_contract_3.BigNumber(e.balance)
                })));
            };
            this.getClaimantsInfo = getClaimantsInfo_call;
            let lastBalance_call = async (param1, options) => {
                let result = await this.call('lastBalance', [param1], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.lastBalance = lastBalance_call;
            let claim_send = async (token, options) => {
                let result = await this.send('claim', [token], options);
                return result;
            };
            let claim_call = async (token, options) => {
                let result = await this.call('claim', [token], options);
                return;
            };
            let claim_txData = async (token, options) => {
                let result = await this.txData('claim', [token], options);
                return result;
            };
            this.claim = Object.assign(claim_send, {
                call: claim_call,
                txData: claim_txData
            });
            let claimMultiple_send = async (tokens, options) => {
                let result = await this.send('claimMultiple', [tokens], options);
                return result;
            };
            let claimMultiple_call = async (tokens, options) => {
                let result = await this.call('claimMultiple', [tokens], options);
                return;
            };
            let claimMultiple_txData = async (tokens, options) => {
                let result = await this.txData('claimMultiple', [tokens], options);
                return result;
            };
            this.claimMultiple = Object.assign(claimMultiple_send, {
                call: claimMultiple_call,
                txData: claimMultiple_txData
            });
            let ethInParams = (params) => [params.target, params.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)])), this.wallet.utils.stringToBytes(params.data)];
            let ethIn_send = async (params, options) => {
                let result = await this.send('ethIn', ethInParams(params), options);
                return result;
            };
            let ethIn_call = async (params, options) => {
                let result = await this.call('ethIn', ethInParams(params), options);
                return;
            };
            let ethIn_txData = async (params, options) => {
                let result = await this.txData('ethIn', ethInParams(params), options);
                return result;
            };
            this.ethIn = Object.assign(ethIn_send, {
                call: ethIn_call,
                txData: ethIn_txData
            });
            let proxyCallParams = (params) => [params.target, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount), e.directTransfer, e.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)])), this.wallet.utils.toString(e.totalCommissions)])), params.to, params.tokensOut, this.wallet.utils.stringToBytes(params.data)];
            let proxyCall_send = async (params, options) => {
                let result = await this.send('proxyCall', proxyCallParams(params), options);
                return result;
            };
            let proxyCall_call = async (params, options) => {
                let result = await this.call('proxyCall', proxyCallParams(params), options);
                return;
            };
            let proxyCall_txData = async (params, options) => {
                let result = await this.txData('proxyCall', proxyCallParams(params), options);
                return result;
            };
            this.proxyCall = Object.assign(proxyCall_send, {
                call: proxyCall_call,
                txData: proxyCall_txData
            });
            let skim_send = async (tokens, options) => {
                let result = await this.send('skim', [tokens], options);
                return result;
            };
            let skim_call = async (tokens, options) => {
                let result = await this.call('skim', [tokens], options);
                return;
            };
            let skim_txData = async (tokens, options) => {
                let result = await this.txData('skim', [tokens], options);
                return result;
            };
            this.skim = Object.assign(skim_send, {
                call: skim_call,
                txData: skim_txData
            });
            let tokenInParams = (params) => [params.target, [params.tokensIn.token, this.wallet.utils.toString(params.tokensIn.amount), params.tokensIn.directTransfer, params.tokensIn.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)])), this.wallet.utils.toString(params.tokensIn.totalCommissions)], this.wallet.utils.stringToBytes(params.data)];
            let tokenIn_send = async (params, options) => {
                let result = await this.send('tokenIn', tokenInParams(params), options);
                return result;
            };
            let tokenIn_call = async (params, options) => {
                let result = await this.call('tokenIn', tokenInParams(params), options);
                return;
            };
            let tokenIn_txData = async (params, options) => {
                let result = await this.txData('tokenIn', tokenInParams(params), options);
                return result;
            };
            this.tokenIn = Object.assign(tokenIn_send, {
                call: tokenIn_call,
                txData: tokenIn_txData
            });
        }
    }
    ProxyV2._abi = ProxyV2_json_1.default.abi;
    exports.ProxyV2 = ProxyV2;
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "uint24", "name": "_protocolRate", "type": "uint24" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "commission", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissionBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "protocolFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "protocolFeeBalance", "type": "uint256" }], "name": "AddCommission", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "admin", "type": "address" }], "name": "AddProjectAdmin", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ClaimProtocolFee", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "name": "NewCampaign", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "NewProject", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "admin", "type": "address" }], "name": "RemoveProjectAdmin", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint24", "name": "protocolRate", "type": "uint24" }], "name": "SetProtocolRate", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Skim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "balance", "type": "uint256" }], "name": "Stake", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "TakeoverProjectOwnership", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "TransferProjectOwnership", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "balance", "type": "uint256" }], "name": "Unstake", "type": "event" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "address", "name": "admin", "type": "address" }], "name": "addProjectAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "campaignAccumulatedCommission", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultipleProtocolFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claimProtocolFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "claimantIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "claimantIds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "claimantsInfo", "outputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "bool", "name": "returnArrays", "type": "bool" }], "name": "getCampaign", "outputs": [{ "components": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "uint24", "name": "maxInputTokensInEachCall", "type": "uint24" }, { "internalType": "uint24", "name": "maxOutputTokensInEachCall", "type": "uint24" }, { "internalType": "bool", "name": "referrersRequireApproval", "type": "bool" }, { "internalType": "uint64", "name": "startDate", "type": "uint64" }, { "internalType": "uint64", "name": "endDate", "type": "uint64" }, { "internalType": "bytes24[]", "name": "targetAndSelectors", "type": "bytes24[]" }, { "internalType": "bool", "name": "acceptAnyInToken", "type": "bool" }, { "internalType": "bool", "name": "acceptAnyOutToken", "type": "bool" }, { "internalType": "contract IERC20[]", "name": "inTokens", "type": "address[]" }, { "internalType": "bool[]", "name": "directTransferInToken", "type": "bool[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionInTokenConfig", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "outTokens", "type": "address[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionOutTokenConfig", "type": "tuple[]" }, { "internalType": "address[]", "name": "referrers", "type": "address[]" }], "internalType": "struct ProxyV3.CampaignParams", "name": "campaign", "type": "tuple" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "targetAndSelectorsStart", "type": "uint256" }, { "internalType": "uint256", "name": "targetAndSelectorsLength", "type": "uint256" }, { "internalType": "uint256", "name": "referrersStart", "type": "uint256" }, { "internalType": "uint256", "name": "referrersLength", "type": "uint256" }], "name": "getCampaignArrayData1", "outputs": [{ "internalType": "bytes24[]", "name": "targetAndSelectors", "type": "bytes24[]" }, { "internalType": "address[]", "name": "referrers", "type": "address[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "inTokensStart", "type": "uint256" }, { "internalType": "uint256", "name": "inTokensLength", "type": "uint256" }, { "internalType": "uint256", "name": "outTokensStart", "type": "uint256" }, { "internalType": "uint256", "name": "outTokensLength", "type": "uint256" }], "name": "getCampaignArrayData2", "outputs": [{ "internalType": "contract IERC20[]", "name": "inTokens", "type": "address[]" }, { "internalType": "bool[]", "name": "directTransferInToken", "type": "bool[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionInTokenConfig", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "outTokens", "type": "address[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionOutTokenConfig", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "name": "getCampaignArrayLength", "outputs": [{ "internalType": "uint256", "name": "targetAndSelectorsLength", "type": "uint256" }, { "internalType": "uint256", "name": "inTokensLength", "type": "uint256" }, { "internalType": "uint256", "name": "outTokensLength", "type": "uint256" }, { "internalType": "uint256", "name": "referrersLength", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "getCampaignsLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "getClaimantBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "fromId", "type": "uint256" }, { "internalType": "uint256", "name": "count", "type": "uint256" }], "name": "getClaimantsInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct ProxyV3.ClaimantInfo[]", "name": "claimantInfoList", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "getProject", "outputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" }, { "internalType": "address[]", "name": "projectAdmins", "type": "address[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "getProjectAdminsLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "getProjectsLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "uint24", "name": "maxInputTokensInEachCall", "type": "uint24" }, { "internalType": "uint24", "name": "maxOutputTokensInEachCall", "type": "uint24" }, { "internalType": "bool", "name": "referrersRequireApproval", "type": "bool" }, { "internalType": "uint64", "name": "startDate", "type": "uint64" }, { "internalType": "uint64", "name": "endDate", "type": "uint64" }, { "internalType": "bytes24[]", "name": "targetAndSelectors", "type": "bytes24[]" }, { "internalType": "bool", "name": "acceptAnyInToken", "type": "bool" }, { "internalType": "bool", "name": "acceptAnyOutToken", "type": "bool" }, { "internalType": "contract IERC20[]", "name": "inTokens", "type": "address[]" }, { "internalType": "bool[]", "name": "directTransferInToken", "type": "bool[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionInTokenConfig", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "outTokens", "type": "address[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionOutTokenConfig", "type": "tuple[]" }, { "internalType": "address[]", "name": "referrers", "type": "address[]" }], "internalType": "struct ProxyV3.CampaignParams", "name": "params", "type": "tuple" }], "name": "newCampaign", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address[]", "name": "admins", "type": "address[]" }], "name": "newProject", "outputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "protocolFeeBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "protocolRate", "outputs": [{ "internalType": "uint24", "name": "", "type": "uint24" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV3.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "address", "name": "admin", "type": "address" }], "name": "removeProjectAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint24", "name": "newRate", "type": "uint24" }], "name": "setProtocolRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "stakeETH", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "contract IERC20[]", "name": "token", "type": "address[]" }, { "internalType": "uint256[]", "name": "amount", "type": "uint256[]" }], "name": "stakeMultiple", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "stakesBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "takeoverProjectOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferProjectOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "unstakeETH", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "contract IERC20[]", "name": "token", "type": "address[]" }, { "internalType": "uint256[]", "name": "amount", "type": "uint256[]" }], "name": "unstakeMultiple", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b5060405162005e1938038062005e19833981016040819052620000349162000097565b600080546001600160a01b031916331790556003805462ffffff831662ffffff1990911681179091556040519081527ffe25e86988ec652fe5401545da69d35d6d22e8bcf8632c423f273264a656d22f9060200160405180910390a150620000c5565b600060208284031215620000aa57600080fd5b815162ffffff81168114620000be57600080fd5b9392505050565b615d4480620000d56000396000f3fe6080604052600436106102eb5760003560e01c80639c52a7f111610184578063d4ee1d90116100d6578063f2fde38b1161008a578063f9738d4211610064578063f9738d421461091f578063fb5474ae1461093f578063fec3e5531461095457600080fd5b8063f2fde38b146108a7578063f303ad6e146108c7578063f9492ad3146108e757600080fd5b8063e5e05bd7116100bb578063e5e05bd71461081e578063ee42d3a31461084b578063f0f3f2c81461087857600080fd5b8063d4ee1d90146107de578063dfecbd8e146107fe57600080fd5b8063b316d71411610138578063d224d9ec11610112578063d224d9ec14610722578063d2ef84641461074f578063d3b7d4c3146107be57600080fd5b8063b316d714146106d7578063b60c164c146106ed578063c6bdc0a21461070d57600080fd5b8063a5184fbf11610169578063a5184fbf14610684578063a8d369ff146106a4578063b0d36ce8146106c457600080fd5b80639c52a7f114610644578063a2f55ae51461066457600080fd5b80634d3c5da11161023d5780636ecc20da116101f157806384fee38e116101cb57806384fee38e146105a45780638da5cb5b146105dc57806399dd15661461061457600080fd5b80636ecc20da146105395780637eb140341461054c57806383e40a511461056c57600080fd5b8063605361721161022257806360536172146104f157806362d53403146105065780636e9c931c1461051957600080fd5b80634d3c5da1146104a357806351a7c716146104d157600080fd5b80631e83409a1161029f578063368e985211610279578063368e9852146104305780633a8c874f146104505780633fd8cc4e1461046357600080fd5b80631e83409a146103dd578063202c0cee146103fd57806332e879c71461041057600080fd5b806311e9ff02116102d057806311e9ff02146103505780631333af5214610390578063188ff72b146103b057600080fd5b80630455f177146102f7578063068c53911461032e57600080fd5b366102f257005b600080fd5b34801561030357600080fd5b50610317610312366004614e5d565b610985565b604051610325929190614edc565b60405180910390f35b34801561033a57600080fd5b5061034e610349366004614f7a565b610bc5565b005b34801561035c57600080fd5b5061037061036b366004614faa565b610c5e565b604080519485526020850193909352918301526060820152608001610325565b34801561039c57600080fd5b5061034e6103ab366004614fd4565b610cae565b3480156103bc57600080fd5b506103d06103cb366004614ff1565b610d17565b6040516103259190615013565b3480156103e957600080fd5b5061034e6103f8366004615078565b610eb8565b61034e61040b36600461525c565b610ec4565b34801561041c57600080fd5b5061034e61042b3660046153e1565b6119de565b34801561043c57600080fd5b5061034e61044b366004614f7a565b611a48565b61034e61045e366004615423565b611ad7565b34801561046f57600080fd5b5061049361047e366004615078565b60026020526000908152604090205460ff1681565b6040519015158152602001610325565b3480156104af57600080fd5b506104c36104be366004614faa565b611b9e565b604051908152602001610325565b3480156104dd57600080fd5b5061034e6104ec36600461549d565b611bcd565b3480156104fd57600080fd5b5061034e611bd8565b61034e610514366004614faa565b611cce565b34801561052557600080fd5b5061034e61053436600461549d565b611cda565b61034e610547366004614faa565b611ce5565b34801561055857600080fd5b5061034e610567366004614faa565b611cf1565b34801561057857600080fd5b506104c36105873660046154d5565b600d60209081526000928352604080842090915290825290205481565b3480156105b057600080fd5b506104c36105bf366004614f7a565b600960209081526000928352604080842090915290825290205481565b3480156105e857600080fd5b506000546105fc906001600160a01b031681565b6040516001600160a01b039091168152602001610325565b34801561062057600080fd5b506003546106309062ffffff1681565b60405162ffffff9091168152602001610325565b34801561065057600080fd5b5061034e61065f366004615078565b611e15565b34801561067057600080fd5b5061034e61067f366004615078565b611e9b565b34801561069057600080fd5b506104c361069f3660046153e1565b611f24565b3480156106b057600080fd5b506104c36106bf366004615503565b612083565b61034e6106d2366004615423565b612a0c565b3480156106e357600080fd5b506104c3600b5481565b3480156106f957600080fd5b5061034e6107083660046153e1565b612ab8565b34801561071957600080fd5b506006546104c3565b34801561072e57600080fd5b5061074261073d36600461554d565b612c59565b604051610325919061564d565b34801561075b57600080fd5b5061079861076a366004614faa565b600c602052600090815260409020805460018201546002909201546001600160a01b03918216929091169083565b604080516001600160a01b03948516815293909216602084015290820152606001610325565b3480156107ca57600080fd5b506104c36107d93660046154d5565b6132b7565b3480156107ea57600080fd5b506001546105fc906001600160a01b031681565b34801561080a57600080fd5b5061034e610819366004614f7a565b6132f1565b34801561082a57600080fd5b506104c3610839366004615078565b60046020526000908152604090205481565b34801561085757600080fd5b506104c3610866366004615078565b60056020526000908152604090205481565b34801561088457600080fd5b50610898610893366004614faa565b6133e4565b604051610325939291906157da565b3480156108b357600080fd5b5061034e6108c2366004615078565b6134d4565b3480156108d357600080fd5b5061034e6108e23660046153e1565b613551565b3480156108f357600080fd5b506104c3610902366004614f7a565b600a60209081526000928352604080842090915290825290205481565b34801561092b57600080fd5b5061034e61093a366004615078565b61359e565b34801561094b57600080fd5b506007546104c3565b34801561096057600080fd5b5061097461096f366004614e5d565b6135be565b60405161032595949392919061580f565b60608060006007888154811061099d5761099d61587c565b90600052602060002090600c02019050600081600201805490508811156109c657600282015497505b60028201546109d5888a6158da565b11156109ee5760028201546109eb9089906158ed565b96505b8667ffffffffffffffff811115610a0757610a07615095565b604051908082528060200260200182016040528015610a30578160200160208202803683370190505b5093505b86811015610abd5760028201610a4a89836158da565b81548110610a5a57610a5a61587c565b9060005260206000200160009054906101000a900460401b848281518110610a8457610a8461587c565b7fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000090921660209283029190910190910152600101610a34565b50600a810154600090861115610ad557600a82015495505b600a820154610ae486886158da565b1115610afd57600a820154610afa9087906158ed565b94505b8467ffffffffffffffff811115610b1657610b16615095565b604051908082528060200260200182016040528015610b3f578160200160208202803683370190505b5092505b84811015610bb957600a8201610b5987836158da565b81548110610b6957610b6961587c565b9060005260206000200160009054906101000a90046001600160a01b0316838281518110610b9957610b9961587c565b6001600160a01b0390921660209283029190910190910152600101610b43565b50509550959350505050565b600060068381548110610bda57610bda61587c565b6000918252602090912060049091020160018101549091506001600160a01b03163314610c4e5760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e657200000000000000000000000000000000000060448201526064015b60405180910390fd5b610c59838284613b00565b505050565b600080600080600060078681548110610c7957610c7961587c565b60009182526020909120600c90910201600281015460058201546006830154600a909301549199909850919650945092505050565b600380547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000001662ffffff83169081179091556040519081527ffe25e86988ec652fe5401545da69d35d6d22e8bcf8632c423f273264a656d22f906020015b60405180910390a150565b6060600083118015610d2b5750600b548311155b610d775760405162461bcd60e51b815260206004820152600d60248201527f6f7574206f6620626f756e6473000000000000000000000000000000000000006044820152606401610c45565b600083600b54610d8791906158ed565b610d929060016158da565b905080831115610da0578092505b8267ffffffffffffffff811115610db957610db9615095565b604051908082528060200260200182016040528015610e2257816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610dd75790505b5091508360005b84811015610eaf576000828152600c6020908152604091829020825160608101845281546001600160a01b0390811682526001830154169281019290925260020154918101919091528451859083908110610e8657610e8661587c565b602002602001018190525081610e9b90615900565b915080610ea781615900565b915050610e29565b50505092915050565b610ec181613bd4565b50565b6007548710610f155760405162461bcd60e51b815260206004820152601060248201527f696e76616c69642063616d706169676e000000000000000000000000000000006044820152606401610c45565b600060078881548110610f2a57610f2a61587c565b90600052602060002090600c020190508060030160008888610f4b90615938565b60405160609290921b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660208301527fffffffff00000000000000000000000000000000000000000000000000000000166034820152603801604051602081830303815290604052610fbd90615988565b7fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000016815260208101919091526040016000205460ff1661103f5760405162461bcd60e51b815260206004820152601460248201527f73656c6563746f72206e6f74206d6174636865640000000000000000000000006044820152606401610c45565b60018101544267010000000000000090910467ffffffffffffffff161180159061108a575060018101546f01000000000000000000000000000000900467ffffffffffffffff164211155b6110fc5760405162461bcd60e51b815260206004820152602860248201527f63616d706169676e206e6f74207374617274656420796574202f20616c72656160448201527f647920656e6465640000000000000000000000000000000000000000000000006064820152608401610c45565b60018101546601000000000000900460ff16158061116c5750600a8101541580159061116c57506001600160a01b0385166000818152600b83016020526040902054600a8301805490919081106111555761115561587c565b6000918252602090912001546001600160a01b0316145b6111b85760405162461bcd60e51b815260206004820152600e60248201527f6e6f7420612072656665727265720000000000000000000000000000000000006044820152606401610c45565b825160018201546000919062ffffff168111156112175760405162461bcd60e51b815260206004820152601760248201527f696e546f6b656e206c656e6774682065786365656465640000000000000000006044820152606401610c45565b60005b8181101561150b5760008682815181106112365761123661587c565b602002602001015160000151905060008211156112d557866112596001846158ed565b815181106112695761126961587c565b6020026020010151600001516001600160a01b0316816001600160a01b0316116112d55760405162461bcd60e51b815260206004820152601f60248201527f696e20746f6b656e206e6f7420696e20617363656e64696e67206f72646572006044820152606401610c45565b600485015460ff16611365576001600160a01b03811660009081526008860160205260409020805462ffffff16151580611317575080546301000000900460ff165b6113635760405162461bcd60e51b815260206004820152601660248201527f6e6f7420616e20616363657074656420746f6b656e73000000000000000000006044820152606401610c45565b505b60008783815181106113795761137961587c565b602002602001015160200151905060006001600160a01b0316826001600160a01b0316036114465784156113ef5760405162461bcd60e51b815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e736665720000000000006044820152606401610c45565b80341461143e5760405162461bcd60e51b815260206004820152601660248201527f45544820616d6f756e74206e6f74206d617463686564000000000000000000006044820152606401610c45565b8094506114b8565b6001600160a01b038216600090815260078701602052604090205460ff16156114835761147e6001600160a01b038316338e84613cca565b6114b8565b61148d8282613d99565b90506114a46001600160a01b0383168d6000613ec8565b6114b86001600160a01b0383168d83613ec8565b60408051338152602081018390526001600160a01b0380851692908f16917fbe526fefdf314c4faee4a30e01b840fe0c1517bd7fc9295829eb6d8441e80b18910160405180910390a3505060010161121a565b6000808a518b602001868e5af18060000361152a573d6000803e3d6000fd5b5050835160018401549092506301000000900462ffffff1682111590506115935760405162461bcd60e51b815260206004820152601860248201527f6f7574546f6b656e206c656e67746820657863656564656400000000000000006044820152606401610c45565b6000805b828210156119885760008583815181106115b3576115b361587c565b60200260200101519050600083111561164a57856115d26001856158ed565b815181106115e2576115e261587c565b60200260200101516001600160a01b0316816001600160a01b03161161164a5760405162461bcd60e51b815260206004820152601f60248201527f696e20746f6b656e206e6f7420696e20617363656e64696e67206f72646572006044820152606401610c45565b6004850154610100900460ff166116df576001600160a01b03811660009081526009860160205260409020805462ffffff16151580611691575080546301000000900460ff165b6116dd5760405162461bcd60e51b815260206004820152601660248201527f6e6f7420616e20616363657074656420746f6b656e73000000000000000000006044820152606401610c45565b505b60006001600160a01b038216611735576000805260056020527f05b8ccbb9d4d8fb16ea74ce3c29a41f1b461fbdaff4714a0d9a8eb05499746bc5461172490476158ed565b90506117308982614016565b6117e8565b6001600160a01b038216600081815260056020526040908190205490517f70a082310000000000000000000000000000000000000000000000000000000081523060048201529091906370a0823190602401602060405180830381865afa1580156117a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117c891906159d4565b6117d291906158ed565b90506117e86001600160a01b0383168a836140d3565b8751831080156118265750816001600160a01b031688848151811061180f5761180f61587c565b6020026020010151600001516001600160a01b0316105b1561187f57611874868e8c60018c88815181106118455761184561587c565b6020026020010151600001518d89815181106118635761186361587c565b60200260200101516020015161411c565b6001909201916117e8565b8751831080156118bd5750816001600160a01b03168884815181106118a6576118a661587c565b6020026020010151600001516001600160a01b0316145b1561192157611916868e8c60018c88815181106118dc576118dc61587c565b602002602001015160000151868e8a815181106118fb576118fb61587c565b60200260200101516020015161191191906158ed565b61411c565b600190920191611930565b611930868e8c6000868661411c565b604080516001600160a01b038b811682526020820184905280851692908f16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35050600190910190611597565b85518110156119d1576119c9848c8a60018a86815181106119ab576119ab61587c565b6020026020010151600001518b87815181106118635761186361587c565b600101611988565b5050503d6000803e3d6000f35b6000546001600160a01b031633146119f557600080fd5b8060005b81811015611a4257611a30848483818110611a1657611a1661587c565b9050602002016020810190611a2b9190615078565b614588565b80611a3a81615900565b9150506119f9565b50505050565b600060068381548110611a5d57611a5d61587c565b6000918252602090912060049091020160018101549091506001600160a01b03163314611acc5760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610c45565b610c59838284614632565b82818114611b275760405162461bcd60e51b815260206004820152601260248201527f6c656e677468206e6f74206d61746368656400000000000000000000000000006044820152606401610c45565b60005b81811015611b8357611b7b87878784818110611b4857611b4861587c565b9050602002016020810190611b5d9190615078565b868685818110611b6f57611b6f61587c565b9050602002013561483d565b600101611b2a565b3415611b9557611b958760003461483d565b50505050505050565b600060068281548110611bb357611bb361587c565b600091825260209091206002600490920201015492915050565b610c5983838361491f565b6001546001600160a01b03163314611c585760405162461bcd60e51b815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610c45565b60018054600080546001600160a01b0383167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b610ec18160003461491f565b610c5983838361483d565b610ec18160003461483d565b600060068281548110611d0657611d0661587c565b6000918252602090912060049091020160018101549091506001600160a01b03163314611d755760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610c45565b8054611d8d90839083906001600160a01b0316614632565b80547fffffffffffffffffffffffff0000000000000000000000000000000000000000908116331782556001808301805490921690915554611ddb90839083906001600160a01b0316613b00565b60405133815282907fcae10d66f75f577faa75ec3d290ee81497368211d6817451dae38673b5ccf992906020015b60405180910390a25050565b6000546001600160a01b03163314611e2c57600080fd5b6001600160a01b03811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a78849101610d0c565b6000546001600160a01b03163314611eb257600080fd5b6001600160a01b03811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101610d0c565b6006805460018101808355600083815291929083908110611f4757611f4761587c565b60009182526020808320600490920290910180547fffffffffffffffffffffffff00000000000000000000000000000000000000009081163390811783556002830180546001810182559086528486200180549092168117909155835260038101909152604082208290559150835b8082101561204f576000868684818110611fd257611fd261587c565b9050602002016020810190611fe79190615078565b600285018054600181810183556000928352602080842090920180546001600160a01b039095167fffffffffffffffffffffffff0000000000000000000000000000000000000000909516851790559282526003870190526040902093019283905550611fb6565b60405184907fd78a25afe0b6160e2dc1fc71b2845c76cc268398d17be04665b78ba59b47440790600090a250505092915050565b6006546000908235106120d85760405162461bcd60e51b815260206004820152601160248201527f496e76616c69642070726f6a65637449640000000000000000000000000000006044820152606401610c45565b600060068360000135815481106120f1576120f161587c565b600091825260208083203380855260049390930201600381019091526040909220546002830180549394509192811061212c5761212c61587c565b6000918252602090912001546001600160a01b03161461218e5760405162461bcd60e51b815260206004820152601360248201527f6e6f7420612070726f6a6563742061646d696e000000000000000000000000006044820152606401610c45565b61219e60c0840160a085016159ed565b67ffffffffffffffff166121b860a08501608086016159ed565b67ffffffffffffffff1611156122105760405162461bcd60e51b815260206004820152601560248201527f696e76616c69642063616d706169676e206461746500000000000000000000006044820152606401610c45565b600780548435600090815260086020908152604082208054600181810183559184529183209091018390558354018084558382529194509190849081106122595761225961587c565b60009182526020918290208635600c9092020190815591506122819060408601908601614fd4565b6001820180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000001662ffffff929092169190911790556122c76060850160408601614fd4565b60018201805462ffffff929092166301000000027fffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffff9092169190911790556123156080850160608601615a17565b6001820180549115156601000000000000027fffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffffffff90921691909117905561236160a08501608086016159ed565b60018201805467ffffffffffffffff92909216670100000000000000027fffffffffffffffffffffffffffffffffff0000000000000000ffffffffffffff9092169190911790556123b860c0850160a086016159ed565b60018201805467ffffffffffffffff929092166f01000000000000000000000000000000027fffffffffffffffffff0000000000000000ffffffffffffffffffffffffffffff90921691909117905560008061241760c0870187615a34565b9150612428905060c0870187615a34565b612436916002860191614d68565b505b808210156124e557600160038401600061245560c08a018a615a34565b868181106124655761246561587c565b905060200201602081019061247a9190615a9c565b7fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000168152602081019190915260400160002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001691151591909117905560019190910190612438565b6124f6610100870160e08801615a17565b6004840180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001691151591909117905561253961012087016101008801615a17565b600484018054911515610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff90921691909117905560009150612582610120870187615a34565b91506125949050610140870187615a34565b9050811480156125b257506125ad610160870187615ade565b905081145b6126245760405162461bcd60e51b815260206004820152602260248201527f696e20746f6b656e20636f6e666967206c656e677468206e6f74206d6174636860448201527f65640000000000000000000000000000000000000000000000000000000000006064820152608401610c45565b612632610120870187615a34565b612640916005860191614ddd565b505b8082101561278c57612658610140870187615a34565b838181106126685761266861587c565b905060200201602081019061267d9190615a17565b6007840160006126916101208a018a615a34565b868181106126a1576126a161587c565b90506020020160208101906126b69190615078565b6001600160a01b03168152602081019190915260400160002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001691151591909117905561270a610160870187615ade565b8381811061271a5761271a61587c565b905060800201836008016000888061012001906127379190615a34565b868181106127475761274761587c565b905060200201602081019061275c9190615078565b6001600160a01b03168152602081019190915260400160002061277f8282615b46565b5050600190910190612642565b6000915061279e610180870187615a34565b91506127b090506101a0870187615ade565b905081146128265760405162461bcd60e51b815260206004820152602360248201527f6f757420746f6b656e20636f6e666967206c656e677468206e6f74206d61746360448201527f68656400000000000000000000000000000000000000000000000000000000006064820152608401610c45565b612834610180870187615a34565b612842916006860191614ddd565b505b808210156128dc5761285a6101a0870187615ade565b8381811061286a5761286a61587c565b905060800201836009016000888061018001906128879190615a34565b868181106128975761289761587c565b90506020020160208101906128ac9190615078565b6001600160a01b0316815260208101919091526040016000206128cf8282615b46565b5050600190910190612844565b600091506128ee6101c0870187615a34565b9150508015156129046080880160608901615a17565b1515146129535760405162461bcd60e51b815260206004820152601860248201527f696e76616c696420726566657272657273206c656e67746800000000000000006044820152606401610c45565b6129616101c0870187615a34565b61296f91600a860191614ddd565b505b808210156129d85781600b8401600061298e6101c08a018a615a34565b8681811061299e5761299e61587c565b90506020020160208101906129b39190615078565b6001600160a01b03168152602081019190915260400160002055600190910190612971565b60405185907ff91d5ca55c5415a1aa70a5dfde98765e180ec8b56375e3de9149ee89efc28f9d90600090a250505050919050565b82818114612a5c5760405162461bcd60e51b815260206004820152601260248201527f6c656e677468206e6f74206d61746368656400000000000000000000000000006044820152606401610c45565b60005b81811015611b9557612ab087878784818110612a7d57612a7d61587c565b9050602002016020810190612a929190615078565b868685818110612aa457612aa461587c565b9050602002013561491f565b600101612a5f565b8060005b81811015611a4257600080858584818110612ad957612ad961587c565b9050602002016020810190612aee9190615078565b90506001600160a01b038116612b47576000805260056020527f05b8ccbb9d4d8fb16ea74ce3c29a41f1b461fbdaff4714a0d9a8eb05499746bc54479250612b3690836158ed565b9150612b423383614016565b612c04565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b038216906370a0823190602401602060405180830381865afa158015612ba4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bc891906159d4565b6001600160a01b038216600090815260056020526040902054909250612bee90836158ed565b9150612c046001600160a01b03821633846140d3565b60405182815233906001600160a01b038316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080612c5190615900565b915050612abc565b612cf6604051806101e0016040528060008152602001600062ffffff168152602001600062ffffff168152602001600015158152602001600067ffffffffffffffff168152602001600067ffffffffffffffff168152602001606081526020016000151581526020016000151581526020016060815260200160608152602001606081526020016060815260200160608152602001606081525090565b600060078481548110612d0b57612d0b61587c565b6000918252602091829020600c9091020180548452600181015462ffffff8082169386019390935263010000008104909216604085015260ff6601000000000000830481161515606086015267ffffffffffffffff6701000000000000008404811660808701526f0100000000000000000000000000000090930490921660a08501526004810154808316151560e086015261010090819004909216151591840191909152905082156132b05780600201805480602002602001604051908101604052809291908181526020018280548015612e2c57602002820191906000526020600020905b815460401b7fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000168152600190910190602001808311612df2575b505050505060c08301526005810180546040805160208084028201810190925282815260009390918390830182828015612e8f57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612e71575b50505050508461012001819052508067ffffffffffffffff811115612eb657612eb6615095565b604051908082528060200260200182016040528015612edf578160200160208202803683370190505b506101408501528067ffffffffffffffff811115612eff57612eff615095565b604051908082528060200260200182016040528015612f6f57816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181612f1d5790505b506101608501525b8082101561309a57826007016000846005018481548110612f9a57612f9a61587c565b60009182526020808320909101546001600160a01b03168352820192909252604001902054610140850151805160ff9092169184908110612fdd57612fdd61587c565b60200260200101901515908115158152505082600801600084600501848154811061300a5761300a61587c565b60009182526020808320909101546001600160a01b0316835282810193909352604091820190208151608081018352815462ffffff8116825260ff6301000000909104161515938101939093526001810154918301919091526002015460608201526101608501518051849081106130845761308461587c565b6020908102919091010152600190910190612f77565b505060068101805460408051602080840282018101909252828152600093909183908301828280156130f557602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116130d7575b50505050508461018001819052508067ffffffffffffffff81111561311c5761311c615095565b60405190808252806020026020018201604052801561318c57816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90920191018161313a5790505b506101a08501525b80821015613247578260090160008460060184815481106131b7576131b761587c565b60009182526020808320909101546001600160a01b0316835282810193909352604091820190208151608081018352815462ffffff8116825260ff6301000000909104161515938101939093526001810154918301919091526002015460608201526101a08501518051849081106132315761323161587c565b6020908102919091010152600190910190613194565b82600a0180548060200260200160405190810160405280929190818152602001828054801561329f57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311613281575b5050505050846101c0018190525050505b5092915050565b6001600160a01b038083166000908152600d602090815260408083209385168352928152828220548252600c905220600201545b92915050565b6000600683815481106133065761330661587c565b6000918252602090912060049091020180549091506001600160a01b031633146133725760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610c45565b6001810180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03841690811790915560405190815283907fd76f6b3fb9ea3802f0403d54d37db427cea79df08cd8817552eb23790d2b54919060200160405180910390a2505050565b60008060606000600685815481106133fe576133fe61587c565b600091825260209091206004909102018054600182015460028301546001600160a01b0392831697509116945090915067ffffffffffffffff81111561344657613446615095565b60405190808252806020026020018201604052801561346f578160200160208202803683370190505b50600282018054604080516020808402820181019092528281529395508301828280156134c557602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116134a7575b50505050509150509193909250565b6000546001600160a01b031633146134eb57600080fd5b600180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001610d0c565b8060005b81811015611a425761358c8484838181106135725761357261587c565b90506020020160208101906135879190615078565b613bd4565b8061359681615900565b915050613555565b6000546001600160a01b031633146135b557600080fd5b610ec181614588565b6060806060806060600060078b815481106135db576135db61587c565b90600052602060002090600c02019050600081600501805490508b11156136045760058201549a505b60058201546136138b8d6158da565b111561362c576005820154613629908c906158ed565b99505b8967ffffffffffffffff81111561364557613645615095565b60405190808252806020026020018201604052801561366e578160200160208202803683370190505b5096508967ffffffffffffffff81111561368a5761368a615095565b6040519080825280602002602001820160405280156136b3578160200160208202803683370190505b5095508967ffffffffffffffff8111156136cf576136cf615095565b60405190808252806020026020018201604052801561373f57816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816136ed5790505b5094505b898110156138ca57600582016137598c836158da565b815481106137695761376961587c565b9060005260206000200160009054906101000a90046001600160a01b03168782815181106137995761379961587c565b60200260200101906001600160a01b031690816001600160a01b0316815250508160070160008883815181106137d1576137d161587c565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060009054906101000a900460ff168682815181106138195761381961587c565b6020026020010190151590811515815250508160080160008883815181106138435761384361587c565b6020908102919091018101516001600160a01b031682528181019290925260409081016000208151608081018352815462ffffff811682526301000000900460ff1615159381019390935260018101549183019190915260020154606082015285518690839081106138b7576138b761587c565b6020908102919091010152600101613743565b5060068101546000908911156138e257600682015498505b60068201546138f1898b6158da565b111561390a576006820154613907908a906158ed565b97505b8767ffffffffffffffff81111561392357613923615095565b60405190808252806020026020018201604052801561394c578160200160208202803683370190505b5093508767ffffffffffffffff81111561396857613968615095565b6040519080825280602002602001820160405280156139d857816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816139865790505b5092505b87811015613af157600682016139f28a836158da565b81548110613a0257613a0261587c565b9060005260206000200160009054906101000a90046001600160a01b0316848281518110613a3257613a3261587c565b60200260200101906001600160a01b031690816001600160a01b031681525050816009016000858381518110613a6a57613a6a61587c565b6020908102919091018101516001600160a01b031682528181019290925260409081016000208151608081018352815462ffffff811682526301000000900460ff161515938101939093526001810154918301919091526002015460608201528351849083908110613ade57613ade61587c565b60209081029190910101526001016139dc565b50509550955095509550959050565b6001600160a01b03811660008181526003840160205260409020546002840180549091908110613b3257613b3261587c565b6000918252602090912001546001600160a01b031614610c59576002820180546001600160a01b03831660008181526003860160209081526040808320859055600185018655948252812090920180547fffffffffffffffffffffffff00000000000000000000000000000000000000001682179055915185917f1c3cea70d3dcea4dc82722f4fb7300d19f76e272a8349e73a99780429f2c151691a3505050565b336000908152600d602090815260408083206001600160a01b0385811680865291845282852054808652600c85528386208451606081018652815484168152600182015490931683870152600201805483860181905290879055928652600590945291842080549394929391928392613c4e9084906158ed565b90915550506001600160a01b038416613c7057613c6b3382614016565b613c84565b613c846001600160a01b03851633836140d3565b6040518181526001600160a01b0385169033907f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd9870689060200160405180910390a350505050565b6040516001600160a01b0380851660248301528316604482015260648101829052611a429085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152614adc565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015613df9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613e1d91906159d4565b9050613e346001600160a01b038416333085613cca565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015281906001600160a01b038516906370a0823190602401602060405180830381865afa158015613e93573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613eb791906159d4565b613ec191906158ed565b9392505050565b801580613f5b57506040517fdd62ed3e0000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015613f35573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613f5991906159d4565b155b613fcd5760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610c45565b6040516001600160a01b038316602482015260448101829052610c599084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401613d17565b604080516000808252602082019092526001600160a01b0384169083906040516140409190615c03565b60006040518083038185875af1925050503d806000811461407d576040519150601f19603f3d011682016040523d82523d6000602084013e614082565b606091505b5050905080610c595760405162461bcd60e51b815260206004820152601360248201527f4554485f5452414e534645525f4641494c4544000000000000000000000000006044820152606401610c45565b6040516001600160a01b038316602482015260448101829052610c599084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401613d17565b600083614142576001600160a01b0383166000908152600988016020526040902061415d565b6001600160a01b038316600090815260088801602052604090205b805490915062ffffff1615611b955786548154620f4240906141849062ffffff1685615c1f565b61418e9190615c36565b925081600101548311156141e45760405162461bcd60e51b815260206004820152600c60248201527f63617020657863656564656400000000000000000000000000000000000000006044820152606401610c45565b600354600090620f4240906141fe9062ffffff1686615c1f565b6142089190615c36565b6001600160a01b0386166000908152600460205260408120805492935083929091906142359084906158da565b9091555050825460009081906301000000900460ff16156142645785915061425d83836158da565b9050614274565b61426e83876158ed565b91508590505b60008481526009602090815260408083206001600160a01b038b1684529091529020548111156142e65760405162461bcd60e51b815260206004820152601560248201527f6e6f7420656e6f75676820636f6d6d697373696f6e00000000000000000000006044820152606401610c45565b60008481526009602090815260408083206001600160a01b038b16808552908352818420805486900390558d8452600a8352818420908452909152812080548392906143339084906158da565b9091555050600285015460008b8152600a602090815260408083206001600160a01b038c16845290915290205411156143d45760405162461bcd60e51b815260206004820152602560248201527f616363756d756c6174656420636f6d6d697373696f6e2065786365656465642060448201527f6c696d69740000000000000000000000000000000000000000000000000000006064820152608401610c45565b6001600160a01b03808a166000908152600d60209081526040808320938b16835292905290812054908190036144b857600b6000815461441390615900565b90915550604080516060810182526001600160a01b03808d168083528b821660208085018281528587018a8152600b80546000908152600c8552898120985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a01805491909916941693909317909655516002909601959095559254918452600d8352848420908452909152919020556144df565b6000818152600c6020526040812060020180548592906144d99084906158da565b90915550505b6000818152600c60209081526040808320600201546001600160a01b038c1684526004909252918290205491517fac98d1de12ec7e306f0033236185d2a9d904bb054995aa9987c7d5a6d7ff4c5792614572928e928d928992918b91906001600160a01b03968716815294909516602085015260408401929092526060830152608082015260a081019190915260c00190565b60405180910390a1505050505050505050505050565b6001600160a01b0381166000908152600460209081526040808320805490849055600590925282208054919283926145c19084906158ed565b90915550506001600160a01b0382166145e3576145de3382614016565b6145f7565b6145f76001600160a01b03831633836140d3565b816001600160a01b03167f6ec620dc21a80aff1281aac3592cbd6b0554bbf810aa4b75338ef3cc9ae1a66c82604051611e0991815260200190565b6001600160a01b0381166000818152600384016020526040902054600284018054919291839081106146665761466661587c565b6000918252602090912001546001600160a01b0316146146c85760405162461bcd60e51b815260206004820152600c60248201527f6e6f7420616e2061646d696e00000000000000000000000000000000000000006044820152606401610c45565b60028301546000906146dc906001906158ed565b90508082146147825760008460020182815481106146fc576146fc61587c565b6000918252602090912001546002860180546001600160a01b03909216925082918590811061472d5761472d61587c565b600091825260208083209190910180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0394851617905592909116815260038601909152604090208290555b8360020180548061479557614795615c71565b6000828152602080822083017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90810180547fffffffffffffffffffffffff00000000000000000000000000000000000000001690559092019092556001600160a01b03851680835260038701909152604080832083905551909187917fe76d77167882521e5d6872e780957ffd683d0e4710f4f159f4170fa42589387b9190a35050505050565b6001600160a01b03821615614859576148568282613d99565b90505b60008381526009602090815260408083206001600160a01b03861684529091528120805483929061488b9084906158da565b90915550506001600160a01b038216600090815260056020526040812080548392906148b89084906158da565b909155505060008381526009602090815260408083206001600160a01b038616808552908352928190205481518581529283015285917f507ac39eb33610191cd8fd54286e91c5cc464c262861643be3978f5a9f18ab0291015b60405180910390a3505050565b600683815481106149325761493261587c565b60009182526020909120600490910201546001600160a01b0316331461499a5760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610c45565b60008381526009602090815260408083206001600160a01b0386168452909152902054811115614a0c5760405162461bcd60e51b815260206004820152601760248201527f616d6f756e742065786365656465642062616c616e63650000000000000000006044820152606401610c45565b60008381526009602090815260408083206001600160a01b0386168452825280832080548590039055600590915281208054839290614a4c9084906158ed565b90915550506001600160a01b03821615614a7957614a746001600160a01b03831633836140d3565b614a83565b614a833382614016565b60008381526009602090815260408083206001600160a01b038616808552908352928190205481518581529283015285917fc1e00202ee2c06861d326fc6374026b751863ff64218ccbaa38c3e603a8e72c29101614912565b6000614b31826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316614bc19092919063ffffffff16565b805190915015610c595780806020019051810190614b4f9190615ca0565b610c595760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610c45565b6060614bd08484600085614bd8565b949350505050565b606082471015614c505760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610c45565b600080866001600160a01b03168587604051614c6c9190615c03565b60006040518083038185875af1925050503d8060008114614ca9576040519150601f19603f3d011682016040523d82523d6000602084013e614cae565b606091505b5091509150614cbf87838387614cca565b979650505050505050565b60608315614d39578251600003614d32576001600160a01b0385163b614d325760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610c45565b5081614bd0565b614bd08383815115614d4e5781518083602001fd5b8060405162461bcd60e51b8152600401610c459190615cbd565b828054828255906000526020600020908101928215614dcd579160200282015b82811115614dcd5781547fffffffffffffffff00000000000000000000000000000000000000000000000016833560401c178255602090920191600190910190614d88565b50614dd9929150614e48565b5090565b828054828255906000526020600020908101928215614dcd579160200282015b82811115614dcd5781547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03843516178255602090920191600190910190614dfd565b5b80821115614dd95760008155600101614e49565b600080600080600060a08688031215614e7557600080fd5b505083359560208501359550604085013594606081013594506080013592509050565b600081518084526020808501945080840160005b83811015614ed15781516001600160a01b031687529582019590820190600101614eac565b509495945050505050565b604080825283519082018190526000906020906060840190828701845b82811015614f375781517fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001684529284019290840190600101614ef9565b50505083810382850152614f4b8186614e98565b9695505050505050565b6001600160a01b0381168114610ec157600080fd5b8035614f7581614f55565b919050565b60008060408385031215614f8d57600080fd5b823591506020830135614f9f81614f55565b809150509250929050565b600060208284031215614fbc57600080fd5b5035919050565b62ffffff81168114610ec157600080fd5b600060208284031215614fe657600080fd5b8135613ec181614fc3565b6000806040838503121561500457600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b8281101561506b57815180516001600160a01b0390811686528782015116878601528501518585015260609093019290850190600101615030565b5091979650505050505050565b60006020828403121561508a57600080fd5b8135613ec181614f55565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156150e7576150e7615095565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561513457615134615095565b604052919050565b600067ffffffffffffffff82111561515657615156615095565b5060051b60200190565b600082601f83011261517157600080fd5b813560206151866151818361513c565b6150ed565b82815260069290921b840181019181810190868411156151a557600080fd5b8286015b848110156151ed57604081890312156151c25760008081fd5b6151ca6150c4565b81356151d581614f55565b815281850135858201528352918301916040016151a9565b509695505050505050565b600082601f83011261520957600080fd5b813560206152196151818361513c565b82815260059290921b8401810191818101908684111561523857600080fd5b8286015b848110156151ed57803561524f81614f55565b835291830191830161523c565b600080600080600080600060e0888a03121561527757600080fd5b8735965060208089013561528a81614f55565b9650604089013567ffffffffffffffff808211156152a757600080fd5b818b0191508b601f8301126152bb57600080fd5b8135818111156152cd576152cd615095565b6152fd847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016150ed565b8181528d8583860101111561531157600080fd5b81858501868301376000858383010152809950505061533260608c01614f6a565b965061534060808c01614f6a565b955060a08b013592508083111561535657600080fd5b6153628c848d01615160565b945060c08b013592508083111561537857600080fd5b50506153868a828b016151f8565b91505092959891949750929550565b60008083601f8401126153a757600080fd5b50813567ffffffffffffffff8111156153bf57600080fd5b6020830191508360208260051b85010111156153da57600080fd5b9250929050565b600080602083850312156153f457600080fd5b823567ffffffffffffffff81111561540b57600080fd5b61541785828601615395565b90969095509350505050565b60008060008060006060868803121561543b57600080fd5b85359450602086013567ffffffffffffffff8082111561545a57600080fd5b61546689838a01615395565b9096509450604088013591508082111561547f57600080fd5b5061548c88828901615395565b969995985093965092949392505050565b6000806000606084860312156154b257600080fd5b8335925060208401356154c481614f55565b929592945050506040919091013590565b600080604083850312156154e857600080fd5b82356154f381614f55565b91506020830135614f9f81614f55565b60006020828403121561551557600080fd5b813567ffffffffffffffff81111561552c57600080fd5b82016101e08185031215613ec157600080fd5b8015158114610ec157600080fd5b6000806040838503121561556057600080fd5b823591506020830135614f9f8161553f565b600081518084526020808501945080840160005b83811015614ed15781517fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001687529582019590820190600101615586565b600081518084526020808501945080840160005b83811015614ed15781511515875295820195908201906001016155d8565b600081518084526020808501945080840160005b83811015614ed1578151805162ffffff1688528381015115158489015260408082015190890152606090810151908801526080909601959082019060010161560a565b602081528151602082015260006020830151615670604084018262ffffff169052565b50604083015162ffffff81166060840152506060830151801515608084015250608083015167ffffffffffffffff811660a08401525060a083015167ffffffffffffffff811660c08401525060c08301516101e08060e08501526156d8610200850183615572565b915060e08501516101006156ef8187018315159052565b86015190506101206157048682018315159052565b808701519150507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe06101408187860301818801526157428584614e98565b94508088015192505061016081878603018188015261576185846155c4565b94508088015192505061018081878603018188015261578085846155f6565b9450808801519250506101a081878603018188015261579f8584614e98565b9450808801519250506101c08187860301818801526157be85846155f6565b908801518782039092018488015293509050614f4b8382614e98565b60006001600160a01b038086168352808516602084015250606060408301526158066060830184614e98565b95945050505050565b60a08152600061582260a0830188614e98565b828103602084015261583481886155c4565b9050828103604084015261584881876155f6565b9050828103606084015261585c8186614e98565b9050828103608084015261587081856155f6565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156132eb576132eb6158ab565b818103818111156132eb576132eb6158ab565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203615931576159316158ab565b5060010190565b6000815160208301517fffffffff00000000000000000000000000000000000000000000000000000000808216935060048310156159805780818460040360031b1b83161693505b505050919050565b6000815160208301517fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000808216935060188310156159805760189290920360031b82901b161692915050565b6000602082840312156159e657600080fd5b5051919050565b6000602082840312156159ff57600080fd5b813567ffffffffffffffff81168114613ec157600080fd5b600060208284031215615a2957600080fd5b8135613ec18161553f565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112615a6957600080fd5b83018035915067ffffffffffffffff821115615a8457600080fd5b6020019150600581901b36038213156153da57600080fd5b600060208284031215615aae57600080fd5b81357fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000081168114613ec157600080fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112615b1357600080fd5b83018035915067ffffffffffffffff821115615b2e57600080fd5b6020019150600781901b36038213156153da57600080fd5b8135615b5181614fc3565b62ffffff811690508154817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000082161783556020840135615b908161553f565b63ff00000081151560181b16837fffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000084161717845550505060408201356001820155606082013560028201555050565b60005b83811015615bfa578181015183820152602001615be2565b50506000910152565b60008251615c15818460208701615bdf565b9190910192915050565b80820281158282048414176132eb576132eb6158ab565b600082615c6c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600060208284031215615cb257600080fd5b8151613ec18161553f565b6020815260008251806020840152615cdc816040850160208701615bdf565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea2646970667358221220e4b6517e489844585c212afdb745911e4742f42632b8cb2120506f15878b418764736f6c63430008110033"
    };
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.json.ts"], function (require, exports, eth_contract_4, ProxyV3_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyV3 = void 0;
    class ProxyV3 extends eth_contract_4.Contract {
        constructor(wallet, address) {
            super(wallet, address, ProxyV3_json_1.default.abi, ProxyV3_json_1.default.bytecode);
            this.assign();
        }
        deploy(protocolRate, options) {
            return this.__deploy([this.wallet.utils.toString(protocolRate)], options);
        }
        parseAddCommissionEvent(receipt) {
            return this.parseEvents(receipt, "AddCommission").map(e => this.decodeAddCommissionEvent(e));
        }
        decodeAddCommissionEvent(event) {
            let result = event.data;
            return {
                to: result.to,
                token: result.token,
                commission: new eth_contract_4.BigNumber(result.commission),
                commissionBalance: new eth_contract_4.BigNumber(result.commissionBalance),
                protocolFee: new eth_contract_4.BigNumber(result.protocolFee),
                protocolFeeBalance: new eth_contract_4.BigNumber(result.protocolFeeBalance),
                _event: event
            };
        }
        parseAddProjectAdminEvent(receipt) {
            return this.parseEvents(receipt, "AddProjectAdmin").map(e => this.decodeAddProjectAdminEvent(e));
        }
        decodeAddProjectAdminEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                admin: result.admin,
                _event: event
            };
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseClaimEvent(receipt) {
            return this.parseEvents(receipt, "Claim").map(e => this.decodeClaimEvent(e));
        }
        decodeClaimEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                token: result.token,
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseClaimProtocolFeeEvent(receipt) {
            return this.parseEvents(receipt, "ClaimProtocolFee").map(e => this.decodeClaimProtocolFeeEvent(e));
        }
        decodeClaimProtocolFeeEvent(event) {
            let result = event.data;
            return {
                token: result.token,
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseNewCampaignEvent(receipt) {
            return this.parseEvents(receipt, "NewCampaign").map(e => this.decodeNewCampaignEvent(e));
        }
        decodeNewCampaignEvent(event) {
            let result = event.data;
            return {
                campaignId: new eth_contract_4.BigNumber(result.campaignId),
                _event: event
            };
        }
        parseNewProjectEvent(receipt) {
            return this.parseEvents(receipt, "NewProject").map(e => this.decodeNewProjectEvent(e));
        }
        decodeNewProjectEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                _event: event
            };
        }
        parseRemoveProjectAdminEvent(receipt) {
            return this.parseEvents(receipt, "RemoveProjectAdmin").map(e => this.decodeRemoveProjectAdminEvent(e));
        }
        decodeRemoveProjectAdminEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                admin: result.admin,
                _event: event
            };
        }
        parseSetProtocolRateEvent(receipt) {
            return this.parseEvents(receipt, "SetProtocolRate").map(e => this.decodeSetProtocolRateEvent(e));
        }
        decodeSetProtocolRateEvent(event) {
            let result = event.data;
            return {
                protocolRate: new eth_contract_4.BigNumber(result.protocolRate),
                _event: event
            };
        }
        parseSkimEvent(receipt) {
            return this.parseEvents(receipt, "Skim").map(e => this.decodeSkimEvent(e));
        }
        decodeSkimEvent(event) {
            let result = event.data;
            return {
                token: result.token,
                to: result.to,
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseStakeEvent(receipt) {
            return this.parseEvents(receipt, "Stake").map(e => this.decodeStakeEvent(e));
        }
        decodeStakeEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                token: result.token,
                amount: new eth_contract_4.BigNumber(result.amount),
                balance: new eth_contract_4.BigNumber(result.balance),
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTakeoverProjectOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TakeoverProjectOwnership").map(e => this.decodeTakeoverProjectOwnershipEvent(e));
        }
        decodeTakeoverProjectOwnershipEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                newOwner: result.newOwner,
                _event: event
            };
        }
        parseTransferBackEvent(receipt) {
            return this.parseEvents(receipt, "TransferBack").map(e => this.decodeTransferBackEvent(e));
        }
        decodeTransferBackEvent(event) {
            let result = event.data;
            return {
                target: result.target,
                token: result.token,
                sender: result.sender,
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferForwardEvent(receipt) {
            return this.parseEvents(receipt, "TransferForward").map(e => this.decodeTransferForwardEvent(e));
        }
        decodeTransferForwardEvent(event) {
            let result = event.data;
            return {
                target: result.target,
                token: result.token,
                sender: result.sender,
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferProjectOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferProjectOwnership").map(e => this.decodeTransferProjectOwnershipEvent(e));
        }
        decodeTransferProjectOwnershipEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                newOwner: result.newOwner,
                _event: event
            };
        }
        parseUnstakeEvent(receipt) {
            return this.parseEvents(receipt, "Unstake").map(e => this.decodeUnstakeEvent(e));
        }
        decodeUnstakeEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                token: result.token,
                amount: new eth_contract_4.BigNumber(result.amount),
                balance: new eth_contract_4.BigNumber(result.balance),
                _event: event
            };
        }
        assign() {
            let campaignAccumulatedCommissionParams = (params) => [this.wallet.utils.toString(params.param1), params.param2];
            let campaignAccumulatedCommission_call = async (params, options) => {
                let result = await this.call('campaignAccumulatedCommission', campaignAccumulatedCommissionParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.campaignAccumulatedCommission = campaignAccumulatedCommission_call;
            let claimantIdCount_call = async (options) => {
                let result = await this.call('claimantIdCount', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.claimantIdCount = claimantIdCount_call;
            let claimantIdsParams = (params) => [params.param1, params.param2];
            let claimantIds_call = async (params, options) => {
                let result = await this.call('claimantIds', claimantIdsParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.claimantIds = claimantIds_call;
            let claimantsInfo_call = async (param1, options) => {
                let result = await this.call('claimantsInfo', [this.wallet.utils.toString(param1)], options);
                return {
                    claimant: result.claimant,
                    token: result.token,
                    balance: new eth_contract_4.BigNumber(result.balance)
                };
            };
            this.claimantsInfo = claimantsInfo_call;
            let getCampaignParams = (params) => [this.wallet.utils.toString(params.campaignId), params.returnArrays];
            let getCampaign_call = async (params, options) => {
                let result = await this.call('getCampaign', getCampaignParams(params), options);
                return ({
                    projectId: new eth_contract_4.BigNumber(result.projectId),
                    maxInputTokensInEachCall: new eth_contract_4.BigNumber(result.maxInputTokensInEachCall),
                    maxOutputTokensInEachCall: new eth_contract_4.BigNumber(result.maxOutputTokensInEachCall),
                    referrersRequireApproval: result.referrersRequireApproval,
                    startDate: new eth_contract_4.BigNumber(result.startDate),
                    endDate: new eth_contract_4.BigNumber(result.endDate),
                    targetAndSelectors: result.targetAndSelectors,
                    acceptAnyInToken: result.acceptAnyInToken,
                    acceptAnyOutToken: result.acceptAnyOutToken,
                    inTokens: result.inTokens,
                    directTransferInToken: result.directTransferInToken,
                    commissionInTokenConfig: result.commissionInTokenConfig.map(e => ({
                        rate: new eth_contract_4.BigNumber(e.rate),
                        feeOnProjectOwner: e.feeOnProjectOwner,
                        capPerTransaction: new eth_contract_4.BigNumber(e.capPerTransaction),
                        capPerCampaign: new eth_contract_4.BigNumber(e.capPerCampaign)
                    })),
                    outTokens: result.outTokens,
                    commissionOutTokenConfig: result.commissionOutTokenConfig.map(e => ({
                        rate: new eth_contract_4.BigNumber(e.rate),
                        feeOnProjectOwner: e.feeOnProjectOwner,
                        capPerTransaction: new eth_contract_4.BigNumber(e.capPerTransaction),
                        capPerCampaign: new eth_contract_4.BigNumber(e.capPerCampaign)
                    })),
                    referrers: result.referrers
                });
            };
            this.getCampaign = getCampaign_call;
            let getCampaignArrayData1Params = (params) => [this.wallet.utils.toString(params.campaignId), this.wallet.utils.toString(params.targetAndSelectorsStart), this.wallet.utils.toString(params.targetAndSelectorsLength), this.wallet.utils.toString(params.referrersStart), this.wallet.utils.toString(params.referrersLength)];
            let getCampaignArrayData1_call = async (params, options) => {
                let result = await this.call('getCampaignArrayData1', getCampaignArrayData1Params(params), options);
                return {
                    targetAndSelectors: result.targetAndSelectors,
                    referrers: result.referrers
                };
            };
            this.getCampaignArrayData1 = getCampaignArrayData1_call;
            let getCampaignArrayData2Params = (params) => [this.wallet.utils.toString(params.campaignId), this.wallet.utils.toString(params.inTokensStart), this.wallet.utils.toString(params.inTokensLength), this.wallet.utils.toString(params.outTokensStart), this.wallet.utils.toString(params.outTokensLength)];
            let getCampaignArrayData2_call = async (params, options) => {
                let result = await this.call('getCampaignArrayData2', getCampaignArrayData2Params(params), options);
                return {
                    inTokens: result.inTokens,
                    directTransferInToken: result.directTransferInToken,
                    commissionInTokenConfig: result.commissionInTokenConfig.map(e => ({
                        rate: new eth_contract_4.BigNumber(e.rate),
                        feeOnProjectOwner: e.feeOnProjectOwner,
                        capPerTransaction: new eth_contract_4.BigNumber(e.capPerTransaction),
                        capPerCampaign: new eth_contract_4.BigNumber(e.capPerCampaign)
                    })),
                    outTokens: result.outTokens,
                    commissionOutTokenConfig: result.commissionOutTokenConfig.map(e => ({
                        rate: new eth_contract_4.BigNumber(e.rate),
                        feeOnProjectOwner: e.feeOnProjectOwner,
                        capPerTransaction: new eth_contract_4.BigNumber(e.capPerTransaction),
                        capPerCampaign: new eth_contract_4.BigNumber(e.capPerCampaign)
                    }))
                };
            };
            this.getCampaignArrayData2 = getCampaignArrayData2_call;
            let getCampaignArrayLength_call = async (campaignId, options) => {
                let result = await this.call('getCampaignArrayLength', [this.wallet.utils.toString(campaignId)], options);
                return {
                    targetAndSelectorsLength: new eth_contract_4.BigNumber(result.targetAndSelectorsLength),
                    inTokensLength: new eth_contract_4.BigNumber(result.inTokensLength),
                    outTokensLength: new eth_contract_4.BigNumber(result.outTokensLength),
                    referrersLength: new eth_contract_4.BigNumber(result.referrersLength)
                };
            };
            this.getCampaignArrayLength = getCampaignArrayLength_call;
            let getCampaignsLength_call = async (options) => {
                let result = await this.call('getCampaignsLength', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.getCampaignsLength = getCampaignsLength_call;
            let getClaimantBalanceParams = (params) => [params.claimant, params.token];
            let getClaimantBalance_call = async (params, options) => {
                let result = await this.call('getClaimantBalance', getClaimantBalanceParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.getClaimantBalance = getClaimantBalance_call;
            let getClaimantsInfoParams = (params) => [this.wallet.utils.toString(params.fromId), this.wallet.utils.toString(params.count)];
            let getClaimantsInfo_call = async (params, options) => {
                let result = await this.call('getClaimantsInfo', getClaimantsInfoParams(params), options);
                return (result.map(e => ({
                    claimant: e.claimant,
                    token: e.token,
                    balance: new eth_contract_4.BigNumber(e.balance)
                })));
            };
            this.getClaimantsInfo = getClaimantsInfo_call;
            let getProject_call = async (projectId, options) => {
                let result = await this.call('getProject', [this.wallet.utils.toString(projectId)], options);
                return {
                    owner: result.owner,
                    newOwner: result.newOwner,
                    projectAdmins: result.projectAdmins
                };
            };
            this.getProject = getProject_call;
            let getProjectAdminsLength_call = async (projectId, options) => {
                let result = await this.call('getProjectAdminsLength', [this.wallet.utils.toString(projectId)], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.getProjectAdminsLength = getProjectAdminsLength_call;
            let getProjectsLength_call = async (options) => {
                let result = await this.call('getProjectsLength', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.getProjectsLength = getProjectsLength_call;
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return result;
            };
            this.isPermitted = isPermitted_call;
            let lastBalance_call = async (param1, options) => {
                let result = await this.call('lastBalance', [param1], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.lastBalance = lastBalance_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let protocolFeeBalance_call = async (param1, options) => {
                let result = await this.call('protocolFeeBalance', [param1], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.protocolFeeBalance = protocolFeeBalance_call;
            let protocolRate_call = async (options) => {
                let result = await this.call('protocolRate', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.protocolRate = protocolRate_call;
            let stakesBalanceParams = (params) => [this.wallet.utils.toString(params.param1), params.param2];
            let stakesBalance_call = async (params, options) => {
                let result = await this.call('stakesBalance', stakesBalanceParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.stakesBalance = stakesBalance_call;
            let addProjectAdminParams = (params) => [this.wallet.utils.toString(params.projectId), params.admin];
            let addProjectAdmin_send = async (params, options) => {
                let result = await this.send('addProjectAdmin', addProjectAdminParams(params), options);
                return result;
            };
            let addProjectAdmin_call = async (params, options) => {
                let result = await this.call('addProjectAdmin', addProjectAdminParams(params), options);
                return;
            };
            let addProjectAdmin_txData = async (params, options) => {
                let result = await this.txData('addProjectAdmin', addProjectAdminParams(params), options);
                return result;
            };
            this.addProjectAdmin = Object.assign(addProjectAdmin_send, {
                call: addProjectAdmin_call,
                txData: addProjectAdmin_txData
            });
            let claim_send = async (token, options) => {
                let result = await this.send('claim', [token], options);
                return result;
            };
            let claim_call = async (token, options) => {
                let result = await this.call('claim', [token], options);
                return;
            };
            let claim_txData = async (token, options) => {
                let result = await this.txData('claim', [token], options);
                return result;
            };
            this.claim = Object.assign(claim_send, {
                call: claim_call,
                txData: claim_txData
            });
            let claimMultiple_send = async (tokens, options) => {
                let result = await this.send('claimMultiple', [tokens], options);
                return result;
            };
            let claimMultiple_call = async (tokens, options) => {
                let result = await this.call('claimMultiple', [tokens], options);
                return;
            };
            let claimMultiple_txData = async (tokens, options) => {
                let result = await this.txData('claimMultiple', [tokens], options);
                return result;
            };
            this.claimMultiple = Object.assign(claimMultiple_send, {
                call: claimMultiple_call,
                txData: claimMultiple_txData
            });
            let claimMultipleProtocolFee_send = async (tokens, options) => {
                let result = await this.send('claimMultipleProtocolFee', [tokens], options);
                return result;
            };
            let claimMultipleProtocolFee_call = async (tokens, options) => {
                let result = await this.call('claimMultipleProtocolFee', [tokens], options);
                return;
            };
            let claimMultipleProtocolFee_txData = async (tokens, options) => {
                let result = await this.txData('claimMultipleProtocolFee', [tokens], options);
                return result;
            };
            this.claimMultipleProtocolFee = Object.assign(claimMultipleProtocolFee_send, {
                call: claimMultipleProtocolFee_call,
                txData: claimMultipleProtocolFee_txData
            });
            let claimProtocolFee_send = async (token, options) => {
                let result = await this.send('claimProtocolFee', [token], options);
                return result;
            };
            let claimProtocolFee_call = async (token, options) => {
                let result = await this.call('claimProtocolFee', [token], options);
                return;
            };
            let claimProtocolFee_txData = async (token, options) => {
                let result = await this.txData('claimProtocolFee', [token], options);
                return result;
            };
            this.claimProtocolFee = Object.assign(claimProtocolFee_send, {
                call: claimProtocolFee_call,
                txData: claimProtocolFee_txData
            });
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            let deny_txData = async (user, options) => {
                let result = await this.txData('deny', [user], options);
                return result;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call,
                txData: deny_txData
            });
            let newCampaign_send = async (params, options) => {
                let result = await this.send('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.acceptAnyInToken, params.acceptAnyOutToken, params.inTokens, params.directTransferInToken, params.commissionInTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
                return result;
            };
            let newCampaign_call = async (params, options) => {
                let result = await this.call('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.acceptAnyInToken, params.acceptAnyOutToken, params.inTokens, params.directTransferInToken, params.commissionInTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
                return new eth_contract_4.BigNumber(result);
            };
            let newCampaign_txData = async (params, options) => {
                let result = await this.txData('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.acceptAnyInToken, params.acceptAnyOutToken, params.inTokens, params.directTransferInToken, params.commissionInTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
                return result;
            };
            this.newCampaign = Object.assign(newCampaign_send, {
                call: newCampaign_call,
                txData: newCampaign_txData
            });
            let newProject_send = async (admins, options) => {
                let result = await this.send('newProject', [admins], options);
                return result;
            };
            let newProject_call = async (admins, options) => {
                let result = await this.call('newProject', [admins], options);
                return new eth_contract_4.BigNumber(result);
            };
            let newProject_txData = async (admins, options) => {
                let result = await this.txData('newProject', [admins], options);
                return result;
            };
            this.newProject = Object.assign(newProject_send, {
                call: newProject_call,
                txData: newProject_txData
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            let permit_txData = async (user, options) => {
                let result = await this.txData('permit', [user], options);
                return result;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call,
                txData: permit_txData
            });
            let proxyCallParams = (params) => [this.wallet.utils.toString(params.campaignId), params.target, this.wallet.utils.stringToBytes(params.data), params.referrer, params.to, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount)])), params.tokensOut];
            let proxyCall_send = async (params, options) => {
                let result = await this.send('proxyCall', proxyCallParams(params), options);
                return result;
            };
            let proxyCall_call = async (params, options) => {
                let result = await this.call('proxyCall', proxyCallParams(params), options);
                return;
            };
            let proxyCall_txData = async (params, options) => {
                let result = await this.txData('proxyCall', proxyCallParams(params), options);
                return result;
            };
            this.proxyCall = Object.assign(proxyCall_send, {
                call: proxyCall_call,
                txData: proxyCall_txData
            });
            let removeProjectAdminParams = (params) => [this.wallet.utils.toString(params.projectId), params.admin];
            let removeProjectAdmin_send = async (params, options) => {
                let result = await this.send('removeProjectAdmin', removeProjectAdminParams(params), options);
                return result;
            };
            let removeProjectAdmin_call = async (params, options) => {
                let result = await this.call('removeProjectAdmin', removeProjectAdminParams(params), options);
                return;
            };
            let removeProjectAdmin_txData = async (params, options) => {
                let result = await this.txData('removeProjectAdmin', removeProjectAdminParams(params), options);
                return result;
            };
            this.removeProjectAdmin = Object.assign(removeProjectAdmin_send, {
                call: removeProjectAdmin_call,
                txData: removeProjectAdmin_txData
            });
            let setProtocolRate_send = async (newRate, options) => {
                let result = await this.send('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
                return result;
            };
            let setProtocolRate_call = async (newRate, options) => {
                let result = await this.call('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
                return;
            };
            let setProtocolRate_txData = async (newRate, options) => {
                let result = await this.txData('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
                return result;
            };
            this.setProtocolRate = Object.assign(setProtocolRate_send, {
                call: setProtocolRate_call,
                txData: setProtocolRate_txData
            });
            let skim_send = async (tokens, options) => {
                let result = await this.send('skim', [tokens], options);
                return result;
            };
            let skim_call = async (tokens, options) => {
                let result = await this.call('skim', [tokens], options);
                return;
            };
            let skim_txData = async (tokens, options) => {
                let result = await this.txData('skim', [tokens], options);
                return result;
            };
            this.skim = Object.assign(skim_send, {
                call: skim_call,
                txData: skim_txData
            });
            let stakeParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
            let stake_send = async (params, options) => {
                let result = await this.send('stake', stakeParams(params), options);
                return result;
            };
            let stake_call = async (params, options) => {
                let result = await this.call('stake', stakeParams(params), options);
                return;
            };
            let stake_txData = async (params, options) => {
                let result = await this.txData('stake', stakeParams(params), options);
                return result;
            };
            this.stake = Object.assign(stake_send, {
                call: stake_call,
                txData: stake_txData
            });
            let stakeETH_send = async (projectId, options) => {
                let result = await this.send('stakeETH', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            let stakeETH_call = async (projectId, options) => {
                let result = await this.call('stakeETH', [this.wallet.utils.toString(projectId)], options);
                return;
            };
            let stakeETH_txData = async (projectId, options) => {
                let result = await this.txData('stakeETH', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            this.stakeETH = Object.assign(stakeETH_send, {
                call: stakeETH_call,
                txData: stakeETH_txData
            });
            let stakeMultipleParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
            let stakeMultiple_send = async (params, options) => {
                let result = await this.send('stakeMultiple', stakeMultipleParams(params), options);
                return result;
            };
            let stakeMultiple_call = async (params, options) => {
                let result = await this.call('stakeMultiple', stakeMultipleParams(params), options);
                return;
            };
            let stakeMultiple_txData = async (params, options) => {
                let result = await this.txData('stakeMultiple', stakeMultipleParams(params), options);
                return result;
            };
            this.stakeMultiple = Object.assign(stakeMultiple_send, {
                call: stakeMultiple_call,
                txData: stakeMultiple_txData
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            let takeOwnership_txData = async (options) => {
                let result = await this.txData('takeOwnership', [], options);
                return result;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call,
                txData: takeOwnership_txData
            });
            let takeoverProjectOwnership_send = async (projectId, options) => {
                let result = await this.send('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            let takeoverProjectOwnership_call = async (projectId, options) => {
                let result = await this.call('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
                return;
            };
            let takeoverProjectOwnership_txData = async (projectId, options) => {
                let result = await this.txData('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            this.takeoverProjectOwnership = Object.assign(takeoverProjectOwnership_send, {
                call: takeoverProjectOwnership_call,
                txData: takeoverProjectOwnership_txData
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            let transferOwnership_txData = async (newOwner, options) => {
                let result = await this.txData('transferOwnership', [newOwner], options);
                return result;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call,
                txData: transferOwnership_txData
            });
            let transferProjectOwnershipParams = (params) => [this.wallet.utils.toString(params.projectId), params.newOwner];
            let transferProjectOwnership_send = async (params, options) => {
                let result = await this.send('transferProjectOwnership', transferProjectOwnershipParams(params), options);
                return result;
            };
            let transferProjectOwnership_call = async (params, options) => {
                let result = await this.call('transferProjectOwnership', transferProjectOwnershipParams(params), options);
                return;
            };
            let transferProjectOwnership_txData = async (params, options) => {
                let result = await this.txData('transferProjectOwnership', transferProjectOwnershipParams(params), options);
                return result;
            };
            this.transferProjectOwnership = Object.assign(transferProjectOwnership_send, {
                call: transferProjectOwnership_call,
                txData: transferProjectOwnership_txData
            });
            let unstakeParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
            let unstake_send = async (params, options) => {
                let result = await this.send('unstake', unstakeParams(params), options);
                return result;
            };
            let unstake_call = async (params, options) => {
                let result = await this.call('unstake', unstakeParams(params), options);
                return;
            };
            let unstake_txData = async (params, options) => {
                let result = await this.txData('unstake', unstakeParams(params), options);
                return result;
            };
            this.unstake = Object.assign(unstake_send, {
                call: unstake_call,
                txData: unstake_txData
            });
            let unstakeETH_send = async (projectId, options) => {
                let result = await this.send('unstakeETH', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            let unstakeETH_call = async (projectId, options) => {
                let result = await this.call('unstakeETH', [this.wallet.utils.toString(projectId)], options);
                return;
            };
            let unstakeETH_txData = async (projectId, options) => {
                let result = await this.txData('unstakeETH', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            this.unstakeETH = Object.assign(unstakeETH_send, {
                call: unstakeETH_call,
                txData: unstakeETH_txData
            });
            let unstakeMultipleParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
            let unstakeMultiple_send = async (params, options) => {
                let result = await this.send('unstakeMultiple', unstakeMultipleParams(params), options);
                return result;
            };
            let unstakeMultiple_call = async (params, options) => {
                let result = await this.call('unstakeMultiple', unstakeMultipleParams(params), options);
                return;
            };
            let unstakeMultiple_txData = async (params, options) => {
                let result = await this.txData('unstakeMultiple', unstakeMultipleParams(params), options);
                return result;
            };
            this.unstakeMultiple = Object.assign(unstakeMultiple_send, {
                call: unstakeMultiple_call,
                txData: unstakeMultiple_txData
            });
        }
    }
    ProxyV3._abi = ProxyV3_json_1.default.abi;
    exports.ProxyV3 = ProxyV3;
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/index.ts", ["require", "exports", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Authorization.ts", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/Proxy.ts", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV2.ts", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/ProxyV3.ts"], function (require, exports, Authorization_1, Proxy_1, ProxyV2_1, ProxyV3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyV3 = exports.ProxyV2 = exports.Proxy = exports.Authorization = void 0;
    Object.defineProperty(exports, "Authorization", { enumerable: true, get: function () { return Authorization_1.Authorization; } });
    Object.defineProperty(exports, "Proxy", { enumerable: true, get: function () { return Proxy_1.Proxy; } });
    Object.defineProperty(exports, "ProxyV2", { enumerable: true, get: function () { return ProxyV2_1.ProxyV2; } });
    Object.defineProperty(exports, "ProxyV3", { enumerable: true, get: function () { return ProxyV3_1.ProxyV3; } });
});
define("@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/index.ts", ["require", "exports", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/contracts/index.ts", "@ijstech/eth-wallet"], function (require, exports, Contracts, eth_wallet_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onProgress = exports.deploy = exports.DefaultDeployOptions = exports.Contracts = void 0;
    exports.Contracts = Contracts;
    ;
    ;
    var progressHandler;
    exports.DefaultDeployOptions = {
        version: 'V3',
        protocolRate: '0.01'
    };
    function progress(msg) {
        if (typeof (progressHandler) == 'function') {
            progressHandler(msg);
        }
        ;
    }
    async function deploy(wallet, options) {
        progress('Contracts deployment start');
        let proxy;
        if (options.version == 'V3') {
            proxy = new Contracts.ProxyV3(wallet);
            progress('Deploy Proxy');
            await proxy.deploy(eth_wallet_2.Utils.toDecimals(options.protocolRate, 6));
        }
        else {
            if (options.version == 'V2') {
                proxy = new Contracts.ProxyV2(wallet);
            }
            else {
                proxy = new Contracts.Proxy(wallet);
            }
            progress('Deploy Proxy');
            await proxy.deploy();
        }
        progress('Proxy deployed ' + proxy.address);
        progress('Contracts deployment finished');
        return {
            proxy: proxy.address
        };
    }
    exports.deploy = deploy;
    ;
    function onProgress(handler) {
        progressHandler = handler;
    }
    exports.onProgress = onProgress;
    ;
    exports.default = {
        Contracts,
        deploy,
        DefaultDeployOptions: exports.DefaultDeployOptions,
        onProgress
    };
});
define("@scom/scom-commission-claim/utils/index.ts", ["require", "exports", "@ijstech/eth-wallet"], function (require, exports, eth_wallet_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSendTxEvents = exports.formatNumberWithSeparators = exports.formatNumber = void 0;
    const formatNumber = (value, decimals) => {
        let val = value;
        const minValue = '0.0000001';
        if (typeof value === 'string') {
            val = new eth_wallet_3.BigNumber(value).toNumber();
        }
        else if (typeof value === 'object') {
            val = value.toNumber();
        }
        if (val != 0 && new eth_wallet_3.BigNumber(val).lt(minValue)) {
            return `<${minValue}`;
        }
        return (0, exports.formatNumberWithSeparators)(val, decimals || 4);
    };
    exports.formatNumber = formatNumber;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision) {
            let outputStr = '';
            if (value >= 1) {
                outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            if (outputStr.length > 18) {
                outputStr = outputStr.substring(0, 18) + '...';
            }
            return outputStr;
        }
        return value.toLocaleString('en-US');
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
    const registerSendTxEvents = (sendTxEventHandlers) => {
        const wallet = eth_wallet_3.Wallet.getClientInstance();
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
define("@scom/scom-commission-claim/API.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-commission-claim/contracts/scom-commission-proxy-contract/index.ts", "@scom/scom-commission-claim/utils/index.ts"], function (require, exports, eth_wallet_4, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.claim = exports.getClaimAmount = void 0;
    async function getClaimAmount(state, token) {
        var _a;
        const wallet = state.getRpcWallet();
        const distributorAddress = state.getContractAddress('Proxy');
        const distributor = new index_1.Contracts.Proxy(wallet, distributorAddress);
        const amount = await distributor.getClaimantBalance({
            claimant: wallet.address,
            token: (_a = token.address) !== null && _a !== void 0 ? _a : eth_wallet_4.Utils.nullAddress
        });
        return eth_wallet_4.Utils.fromDecimals(amount, token.decimals || 18);
    }
    exports.getClaimAmount = getClaimAmount;
    async function claim(state, token, callback, confirmationCallback) {
        var _a;
        const wallet = eth_wallet_4.Wallet.getClientInstance();
        const distributorAddress = state.getContractAddress('Proxy');
        const distributor = new index_1.Contracts.Proxy(wallet, distributorAddress);
        (0, index_2.registerSendTxEvents)({
            transactionHash: callback,
            confirmation: confirmationCallback
        });
        const receipt = await distributor.claim((_a = token.address) !== null && _a !== void 0 ? _a : eth_wallet_4.Utils.nullAddress);
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
    exports.default = {
        general: {
            dataSchema: {
                type: 'object',
                properties: {
                    description: {
                        type: 'string',
                        format: 'multi'
                    },
                    logo: {
                        type: 'string',
                        format: 'data-cid'
                    },
                    logoUrl: {
                        type: 'string',
                        title: 'Logo URL'
                    }
                }
            },
            embedderSchema: {
                type: 'object',
                properties: {
                    description: {
                        type: 'string',
                        format: 'multi'
                    }
                }
            }
        },
        theme: {
            dataSchema: {
                type: 'object',
                properties: {
                    "dark": {
                        type: 'object',
                        properties: theme
                    },
                    "light": {
                        type: 'object',
                        properties: theme
                    }
                }
            }
        }
    };
});
define("@scom/scom-commission-claim", ["require", "exports", "@ijstech/components", "@scom/scom-commission-claim/store/index.ts", "@scom/scom-commission-claim/index.css.ts", "@scom/scom-commission-claim/API.ts", "@scom/scom-commission-claim/data.json.ts", "@scom/scom-commission-claim/utils/index.ts", "@ijstech/eth-wallet", "@scom/scom-commission-claim/formSchema.json.ts"], function (require, exports, components_3, index_3, index_css_1, API_1, data_json_1, index_4, eth_wallet_5, formSchema_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomCommissionClaim = class ScomCommissionClaim extends components_3.Module {
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
                if (!(0, index_3.isClientWalletConnected)()) {
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
                    await eth_wallet_5.Wallet.getClientInstance().init();
                    await this.rpcWallet.init();
                }
                catch (err) {
                    console.log(err);
                }
            };
            this.state = new index_3.State(data_json_1.default);
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
        getData() {
            return this._data;
        }
        async resetRpcWallet() {
            var _a;
            this.removeRpcWalletEvents();
            const rpcWalletId = await this.state.initRpcWallet(this.defaultChainId);
            const rpcWallet = this.rpcWallet;
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_5.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
                this.onChainChanged();
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_5.Constants.RpcWalletEvent.Connected, async (connected) => {
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
            this._data = data;
            await this.resetRpcWallet();
            if (!this.tokenSelection.isConnected)
                await this.tokenSelection.ready();
            if (this.tokenSelection.rpcWalletId !== this.rpcWallet.instanceId) {
                this.tokenSelection.rpcWalletId = this.rpcWallet.instanceId;
            }
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
                dark: getColors(components_3.Styles.Theme.darkTheme),
                light: getColors(components_3.Styles.Theme.defaultTheme)
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
            this.lbClaimable.caption = `${(0, index_4.formatNumber)(claimAmount)} ${token.symbol || ''}`;
            this.updateBtnClaim(claimAmount.gt(0));
        }
        async selectToken(token) {
            await this.refetchClaimAmount(token);
        }
        async onClaim() {
            if (!(0, index_3.isClientWalletConnected)()) {
                if (this.mdWallet) {
                    await components_3.application.loadPackage('@scom/scom-wallet-modal', '*');
                    this.mdWallet.networks = this.networks;
                    this.mdWallet.wallets = this.wallets;
                    this.mdWallet.showModal();
                }
                return;
            }
            if (!this.state.isRpcWalletConnected()) {
                const clientWallet = eth_wallet_5.Wallet.getClientInstance();
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
            }, () => {
                this.refetchClaimAmount(this.tokenSelection.token);
            });
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let _oldData = {
                            defaultChainId: 0,
                            wallets: [],
                            networks: []
                        };
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                this._data.logo = userInputData.logo;
                                this._data.logoUrl = userInputData.logoUrl;
                                this._data.description = userInputData.description;
                                this.setData(this._data);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                            },
                            undo: () => {
                                this.setData(_oldData);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        let oldTag = {};
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder)
                                    builder.setTag(userInputData);
                                else
                                    this.setTag(userInputData);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                                if (this.dappContainer)
                                    this.dappContainer.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
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
                        return this._getActions(formSchema_json_1.default.general.dataSchema, formSchema_json_1.default.theme.dataSchema);
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
                        return this._getActions(formSchema_json_1.default.general.embedderSchema, formSchema_json_1.default.theme.dataSchema);
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
                                this.$render("i-image", { id: "imgLogo", class: index_css_1.imageStyle, height: 100 }),
                                this.$render("i-markdown", { id: "markdownDescription", class: index_css_1.markdownStyle, width: "100%", height: "100%" })),
                            this.$render("i-vstack", { gap: 12 },
                                this.$render("i-hstack", { gap: 8, width: "100%", verticalAlignment: "center" },
                                    this.$render("i-label", { caption: "Token:", font: { size: '0.875rem' }, margin: { top: 8 } }),
                                    this.$render("i-scom-token-input", { id: "tokenSelection", type: "combobox", isBalanceShown: false, isInputShown: false, isCommonShown: false, isBtnMaxShown: false, isSortBalanceShown: false, class: index_css_1.tokenSelectionStyle, onSelectToken: this.selectToken })),
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
        components_3.customModule,
        (0, components_3.customElements)('i-scom-commission-claim')
    ], ScomCommissionClaim);
    exports.default = ScomCommissionClaim;
});
