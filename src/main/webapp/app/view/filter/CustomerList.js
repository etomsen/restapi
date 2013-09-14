Ext.define('eibwebapp.view.filter.CustomerList', {
  extend: 'Ext.Panel',
  requires: ['eibwebapp.view.Filter'],
  xtype: 'filter_customerlistview',
  alias: 'widget.filter_customerlistview',
  config: {
    layout: {
      type: 'hbox',
      pack: 'left',
      align: 'center'
    },
    items: [{
      id: 'clearSelection',
      text: 'Clear',
      ui: 'decline',
      xtype: 'button',
      handler: function(btn) {
        eibwebapp.app.fireEvent('setCustomerCommand', null, '');
        var lst = btn.up('customerlistview');
        lst.deselectAll();
      }
    }, {
      xtype: 'filterview',
      width: '80%'
    }]
  }
});
