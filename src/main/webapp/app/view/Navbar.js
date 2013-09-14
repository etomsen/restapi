Ext.define('eibwebapp.view.Navbar', {
  extend: 'Ext.TitleBar',
  xtype: 'navbarview',
  config: {
    title: 'Home',
    docked: 'top',
    items: [{
      xtype: 'button',
      text: 'Back',
      itemId: 'backButton',
      ui: 'back',
      align: 'left'
    }, {
      xtype: 'button',
      align: 'right',
      // text: 'Menu',
      itemId: 'mainMenuButton',
      iconCls: 'list',
      ui: 'plain'
    }],
    listeners: [{
      delegate: "#backButton",
      event: "tap",
      fn: "onBackButtonTap"
    }, {
      delegate: "#mainMenuButton",
      event: "tap",
      fn: "onMainMenuButtonTap"
    }]
  },
  
  initialize: function(arguments) {    
    var me = this;
    me.callParent(arguments);
    me.fireEvent('navbarAfterLoadCommand');
  },
  
  onMainMenuButtonTap: function() {
    var me = this;
    me.fireEvent('mainMenuTogleCommand');
  },
  onBackButtonTap: function() {
    var me = this;
    me.fireEvent('backCommand');
  }
});
