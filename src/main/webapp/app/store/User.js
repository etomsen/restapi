Ext.define('eibwebapp.store.User', {
  extend: "Ext.data.Store",
  requires: ['eibwebapp.model.User'],
  config: {
    model: 'eibwebapp.model.User'
  }
});
