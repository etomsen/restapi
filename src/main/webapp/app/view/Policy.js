Ext.define('eibwebapp.view.Policy', {
  extend: 'Ext.tab.Panel',
  xtype: 'policyview',
  config: {
    title: '{id}',
    tabBar: {
      docked: 'bottom'
    },
    items: [{
      xtype: 'policy_mainview'
    }, {
      xtype: 'policy_paymentsview'
    }, {
      xtype: 'policy_claimsview'
    }]
  },
  initialize: function(arguments) {    
    var me = this;
    me.callParent(arguments);
  }
});
