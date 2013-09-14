Ext.define('eibwebapp.model.MainMenu', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'id',
      type: 'number'
    }, {
      name: 'title',
      type: 'string'
    }, {
      name: 'role',
      type: 'string'
    }, {
      name: 'url',
      type: 'string'
    }]
  }
});
