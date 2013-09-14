Ext.define('eibwebapp.view.Main', {
  extend: 'Ext.Container',
  xtype: 'mainview',
  requires: ['eibwebapp.view.Navbar', 'eibwebapp.view.MainMenu'],
  config: {
    fullscreen: true,
    layout: 'hbox',
    items: [{
      xtype: 'mainmenuview',
      width: 250
    }, {
      cls: 'slide',
      width: '100%',
      xtype: 'panel',
      layout: 'card',
      items: [{
        xtype: 'navbarview'
      }]
    }]
  }
});
