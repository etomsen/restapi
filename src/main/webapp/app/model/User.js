Ext.define('eibwebapp.model.User', {
  extend: 'Ext.data.Model',
  requires: ['Ext.data.proxy.LocalStorage'],
  config: {
    fields: [{
      customerId: '', // userId for admin
      type: 'number'
    }],
    proxy: {
      type: 'localstorage',
      id: '_eibwebapp_User'
    }
  }
});
