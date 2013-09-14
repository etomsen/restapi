Ext.define('eibwebapp.model.Policy', {
  extend: 'eibwebapp.model.PolicyList',
  config: {
    fields: [{
      name: 'fractioning',
      type: 'number'
    }, // fractioning: {Yearly, Semestrale}        
    {
      name: 'kind',
      type: 'number'
    }, // kind: recurrent
    {
      name: 'documentLink',
      type: 'string'
    }]
  }
});
