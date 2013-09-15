Ext.define('eibwebapp.store.PolicyList', {
    extend: 'Ext.data.Store',
    config: {
        autoLoad: false,
        model: 'eibwebapp.model.PolicyList',
        proxy: {
            url: eibwebapp.util.Rest.api.policy,
            type: 'rest',
            reader: {
                type: 'json',
                root: 'result'
            }
        },
        filters: [
            {
                property: "customerId",
                value: ""
            },
            {
                property: "customer",
                value: ""
            },
            {
                property: "companyId",
                value: ""
            },
            {
                property: "company",
                value: ""
            },
            {
                property: "deadline",
                value: ""
            },
            {
                property: "branch",
                value: ""
            },
            {
                property: "desc",
                value: ""
            }
        ]
    }
});
