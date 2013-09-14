Ext.define('eibwebapp.view.PolicyList', {
  extend: 'Ext.List',
  xtype: 'policylistview',
  requires: ['eibwebapp.view.filter.PolicyList'],
  config: {
    items: [{
      xtype: 'toolbar',
      docked: 'bottom',
      items: [{
        xtype: 'filter_policylistview',
        width: "100%"
      }]
    }],
    cls: 'policylist',
    layout: 'fit',
    grouped: false,
    onItemDisclosure: false,
    itemTpl: Ext.create('Ext.XTemplate', document.getElementById('tpl_policylist_item').innerHTML, {
      getImage: function(data) {
        var img = null;
        var branch = Ext.getStore('BranchListLocal').getById(data.branch);
        if (branch) {
          img = branch.get('url');
        }
        if (!img) {
          img = 'resources/images/umbrella.png';
        }
        return '<img src="' + img + '" />';
      },
      getDeadline: function(data) {
        return Ext.Date.format(data.deadline, 'j/n/Y');
      },
      getPaymentsClaims: function(data) {
        if (data.paymentsCount) {
          if (data.claimsCount) {
            var claims = 'claims';
            if (data.claimsCount === 1) {
              claims = 'claim';
            }
            var payments = 'payments';
            if (data.paymentsCount === 1) {
              payments = 'payment';
            }
            return data.paymentsCount + ' ' + payments + '/' + data.claimsCount + ' ' + claims;
          } else {
            if (data.paymentsCount > 1) {
              return data.paymentsCount + ' payments';
            } else {
              return data.paymentsCount + ' payment';
            }

          }
        } else {
          if (data.claimsCount) {
            if (data.claimsCount > 1) {
              return data.claimsCount + ' claims';
            } else {
              return data.claimsCount + ' claim';
            }
          } else {
            return '';
          }
        }
      }
    }),
    store: "PolicyListLocal",
    emptyText: Lang.policyListView.emptyText
  }
});
