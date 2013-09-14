Ext.define('eibwebapp.view.policy.Claims', {
  extend: 'Ext.List',
  xtype: 'policy_claimsview',
  config: {
    title: 'Claims',
    iconCls: 'user',
    scrollable: true,
    grouped: false,
    onItemDisclosure: false,
    store: "ClaimListLocal",
    cls: 'claimlist',
    emptyText: Lang.claimListView.emptyText,
    itemTpl: Ext.create('Ext.XTemplate', document.getElementById('tpl_policy_claimsitem').innerHTML, {
      formatDate: function(v) {
        return Ext.Date.format(v.date, 'j/n/Y');
      },
      formatDateArch: function(v) {
        return Ext.Date.format(v.dateArchived, 'j/n/Y');
      },
      formatLiquidated: function(v) {
        return v.liquidated.toString() + '€';
      }
    })
  },
  show: function(arguments) {
    var me = this;
    var sto = Ext.getStore('ClaimListLocal');
    sto.clearFilter();
    sto.filter('policyId', me.getRecord().getData().id);
    me.callParent(arguments);
  }
});
