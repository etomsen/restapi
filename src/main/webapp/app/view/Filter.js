Ext.define('eibwebapp.view.Filter', {
  extend: 'Ext.Panel',
  alias: 'widget.filterview',
  xtype: 'filterview',
  config: {
    style: 'width:100%',
    items: [{
      xtype: 'panel',
      style: 'width: 100%; heigh: 50%',      
      hidden: true
    }, {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      style: 'width: 100%',
      items: [{
        xtype: 'searchfield',
        itemId: 'filtersearch',
        id: 'filtersearch',
        placeHolder: 'Search',
        align: 'left'
      }, {
        itemId: 'toggleFilerButton',
        xtype: 'button',
        ui: 'plain',
        align: 'right',
        iconCls: 'more'
      }]
    }],
    listeners: [{
      delegate: "#toggleFilerButton",
      event: "tap",
      fn: "onToggleFilerButtonTap"
    }, {
      delegate: "#filtersearch",
      event: "clearicontap",
      fn: "onSearchClearTap"
    }, {
      delegate: "#filtersearch",
      event: "keyup",
      fn: "onSearchKeyUp"
    }]
  },

  onToggleFilerButtonTap: function() {
    var me = this;
    me.fireEvent('filterToggleCommand');
  },

  onSearchClearTap: function() {
    var me = this;
    me.fireEvent('filterSearchClearCommand');
  },

  onSearchKeyUp: function(field) {
    var me = this;
    me.fireEvent('filterSearchCommand', field);
  }
});
