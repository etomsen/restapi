Ext.define('eibwebapp.model.CustomerList', {
  extend: 'Ext.data.Model',
  config: {
    fields: [
      "id", 
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
