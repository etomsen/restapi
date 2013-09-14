Ext.define('eibwebapp.view.MessageList', {
  extend: 'Ext.List',
  xtype: 'messagelistview',
  alias: 'widget.messagelistview',
  requires: ['eibwebapp.view.Filter'],
  config: {
    items: [{
      xtype: 'toolbar',
      docked: 'bottom',
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [{
        xtype: 'button',
        iconCls: 'info',
        itemId: 'newMessagesButton',
        handler: function(btn) {
          var me = this;
          me.up('messagelistview').fireEvent('showNewMsgsCommand');
        }
      }, {
        xtype: 'button',
        iconCls: 'time',
        itemId: 'messagesButton',
        handler: function(btn) {
          var me = this;
          me.up('messagelistview').fireEvent('showMsgsCommand');
        }
      }]
    }],    
    cls: 'messagelist',
    layout: 'fit',
    grouped: true,
    onItemDisclosure: false,
    itemTpl: Ext.create('Ext.XTemplate', document.getElementById('tpl_messagelist_item').innerHTML, {
      formatFromDate: function(data) {
        return Ext.Date.format(data.validFrom, 'j/n/Y');
      },
      formatToDate: function(data) {
        return Ext.Date.format(data.validFrom, 'j/n/Y');
      }
    }),
    store: "MessageListLocal",
    emptyText: Lang.messageListView.emptyTextNew
  }
});
