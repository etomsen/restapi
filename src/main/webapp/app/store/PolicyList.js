Ext.define('eibwebapp.store.PolicyList', {
  extend: 'Ext.data.Store',
  config: {
    model: 'eibwebapp.model.PolicyList',
    proxy: {
      type: 'ajax',
      url: eibwebapp.rest.Rest.api.PolicyList,
      reader: {
        type: 'json',
        rootProperty: 'results'
      }
    },
    filters: [{
      property: 'clientName',
      value: ''
    }, {
      property: 'companyName',
      value: ''
    }, {
      property: 'deadline',
      value: ''
    }, {
      property: 'branchId',
      value: ''
    }]
  }
});
