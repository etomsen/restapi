Ext.define('eibwebapp.model.Customer', {
  extend: 'Ext.data.Model',
  config: {
    fields: [
      {name: 'id', type: 'number'},     
      "email", 
      "name",
      "address",
      "category",
      "vat",
      "taxcode",
      "webpage"
      ]
  }
});
