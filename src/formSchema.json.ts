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

const themeDataSchema = {
    dark: {
        type: 'object',
        properties: theme
    },
    light: {
        type: 'object',
        properties: theme
    }
}

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
}

export default {
    builderSchema: {
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
            },
            ...themeDataSchema
        }
    },
    embedderSchema: {
        type: 'object',
        properties: {
            description: {
                type: 'string',
                format: 'multi'
            },
            ...themeDataSchema
        }
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
}