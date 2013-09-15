Ext.define('eibwebapp.model.PolicyList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "id", type: "string"},
            {name: "customerId", type: "string"},
            {name: "customer", type: "string"},
            {name: "companyId", type: "string"},
            {name: "company", type: "string"},
            {name: "branch", type: "string"},
            {name: 'deadline', type: 'date', dateFormat: 'j/n/Y'},
            {name: "desc", type: "string"},
            {name: "award", type: "number"},
            {name: "paymentsCount", type: "integer"},
            {name: "claimsCount", type: "integer"},
            {name: "statusId", type: "integer"}
        ],
        proxy: {
            type: 'rest',
            url: eibwebapp.util.Rest.api.policy
        }
    }
});
