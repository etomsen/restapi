Ext.define('eibwebapp.model.User', {
  extend: 'Ext.data.Model',
  requires: ['Ext.data.proxy.LocalStorage'],
  config: {
    fields: [{
      id: '',
      type: 'string'
    }, {
      name: '',
      type: 'string'
    }, {
      token: '',
      type: 'string'
    }, {
      role: '',
      type: 'string'
    }, {
      customerId: '', // userId for admin
      type: 'number'
    }],
    proxy: {
      type: 'localstorage',
      id: '_eibwebapp_User'
    }
  }
});
