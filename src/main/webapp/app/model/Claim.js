Ext.define('eibwebapp.model.Claim', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'id',
      type: 'string'
    }, {
      name: 'type',
      type: 'string'
    },{
      name: 'policyId',
      type: 'string'
    },{
      name: 'date',
      type: 'date',
      dateFormat: 'j/n/Y'
    }, {
      name: 'dateArchived',
      type: 'date',
      dateFormat: 'j/n/Y'
    }, {
      name: 'desc',
      type: 'string'
    }, {
      name: 'liquidated',
      type: 'number'
    }, {
      name: 'counterpart',
      type: 'string'
    }]
  }
});
