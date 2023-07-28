const theme = {
    backgroundColor: {
        type: 'string',
        format: 'color'
    },
    fontColor: {
        type: 'string',
        format: 'color'
    }
}

export default {
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
}