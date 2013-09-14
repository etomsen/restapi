Ext.define('eibwebapp.view.CustomerList', {
  extend: 'Ext.List',
  xtype: 'customerlistview',
  config: {
    items: [{
      xtype: 'toolbar',
      docked: 'bottom',
      items: [{
        width: '100%',
        xtype: 'filter_customerlistview'
      }]
    }],
    allowDeselect: true,
    grouped: false,
    onItemDisclosure: false,
    itemTpl: Ext.create('Ext.XTemplate', document.getElementById('tpl_customerlist_item').innerHTML, {}),
    store: "CustomerListLocal",
    emptyText: Lang.customerListView.emptyText
  }
});
