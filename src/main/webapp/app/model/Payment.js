Ext.define('eibwebapp.model.Payment', {
  extend: 'Ext.data.Model',
  config: {
    fields: [
      "id",
      "policyId",       
      "title",
      {name: "awardInstalment", type: 'number'},     
      {name: "startDeadline", type: 'date',  dateFormat: 'j/n/Y'},     
      {name: "instalmentDeadline", type: 'date',  dateFormat: 'j/n/Y'},     
      {name: "paymentDate", type: 'date',  dateFormat: 'j/n/Y'}     
      ]
  }
});
