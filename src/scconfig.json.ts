export default {
    "env": "testnet",
    "logo": "logo",
    "main": "./main",
    "assets": "./assets",
    "moduleDir": "modules",
    "modules": {
        "./assets": {
            "path": "assets"
        },
        "./interface": {
            "path": "interface"
        },
        "./utils": {
            "path": "utils"
        },
        "./store": {
            "path": "store"
        },
        "./wallet": {
            "path": "wallet"
        },
        "./token-selection": {
            "path": "token-selection"
        },
        "./alert": {
            "path": "alert"
        },
        "./config": {
            "path": "config"
        },
        "./main": {
            "path": "main"
        }
    },
    "dependencies": {
        "@ijstech/eth-contract": "*",
        "@scom/scom-product-contract": "*",
        "@scom/scom-commission-proxy-contract": "*",
        "@scom/scom-token-list": "*"
    },
    "contractInfo": {
        "43113": {
            "Proxy": {
                "address": "0x7f1EAB0db83c02263539E3bFf99b638E61916B96"
            }
        }
    }
}