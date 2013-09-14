Ext.define('eibwebapp.view.MainMenu', {  
  extend: 'Ext.List',
  xtype: 'mainmenuview',
  config: {    
    cls: 'nav-list',
    itemTpl: '{title}',
    store: "MainMenu"
  }
});
