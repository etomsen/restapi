Ext.define('eibwebapp.view.policy.Payments', {
  extend: 'Ext.List',
  xtype: 'policy_paymentsview',
  config: {
    title: 'Payments',
    iconCls: 'star',
    scrollable: true,
    grouped: false,
    onItemDisclosure: false,
    store: "PaymentListLocal",
    cls: 'paymentlist',
    emptyText: Lang.paymentListView.emptyText,
    itemTpl: Ext.create('Ext.XTemplate', document.getElementById('tpl_policy_paymentsitem').innerHTML, {
      getInstalmentDeadline: function(data) {
        return Ext.Date.format(data.instalmentDeadline, 'j/n/Y');
      },
      getStartDeadline: function(data) {
        return Ext.Date.format(data.startDeadline, 'j/n/Y');
      },
      getPaymentDate: function(data) {
        return Ext.Date.format(data.paymentDate, 'j/n/Y');
      }
    })    
  },
  show: function(arguments) { 
    var me = this;    
    var sto = Ext.getStore('PaymentListLocal');
    sto.clearFilter();
    sto.filter('policyId', me.getRecord().getData().id);
    me.callParent(arguments);
  }
});
