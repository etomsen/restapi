Ext.define('eibwebapp.controller.Policy', {
  extend: 'Ext.app.Controller',
  requires: ['Ext.MessageBox'],
  util: eibwebapp.util.Util,
  config: {
    routes: {
      'policy/list': 'showList',
      'policy/:id': 'showDetails'
    },

    refs: {
      detailsMainView: 'policy_mainview',
      detailsPaymentsView: 'policy_paymentsview',
      detailsClaimsView: 'policy_claimsview',
      detailsView: 'policyview',
      listView: 'policylistview',
      mainView: 'mainview'
    },

    control: {
      listView: {
        itemtap: function(list, index, target, record) {
          this.redirectTo('policy/' + record.get('id'));
        }
      }
    }
  },

  animationLeft: {
    type: 'slide',
    duration: 400,
    easing: 'ease-in-out',
    direction: 'left'
  },  
  showDetails: function(policyId) {
    var me = this;
    if (!me.util.validateUser()) return;
    if (!me.getMainView()) {
      me.util.initViewport(me.getRefs().mainView, {});
    }
    if (!me.getDetailsView()) {
      me.util.getMainViewPanel(me).add({
        xtype: me.getRefs().detailsView
      });
    }    
    var policy = Ext.getStore('PolicyLocal').getById(policyId);
    me.getDetailsMainView().setRecord(policy);
    var c = Ext.ComponentQuery.query('#policy_mainview_documentLinkField')[0];
    c.setHtml("<a style='width: 20px; height: 20px; position: absolute; right: 0; top: 25%; background: #fff url(resources/images/doc.png) center left no-repeat; text-align: center; margin-right: 10px;' target='_blank' href='"+c.getValue()+"'></a>");  
    me.getDetailsPaymentsView().setRecord(policy);
    me.getDetailsClaimsView().setRecord(policy);
    me.util.showActiveItem(me.util.getMainViewPanel(me), me.getDetailsView(), me.animationLeft);
    me.getDetailsView().setActiveItem(0);
    me.getApplication().fireEvent('setFilterViewCommand', me.getRefs().detailsView);
    me.getApplication().fireEvent('navbarUpdateCommand', Lang.policyDetailsView.navbartitle, false);
  },

  showList: function() {
    var me = this;
    
    if (!me.util.validateUser()) return;
    
    if (!me.getMainView()) {
      me.util.initViewport(me.getRefs().mainView, {});
    }
    if (!me.getListView()) {
      me.util.getMainViewPanel(me).add({
        xtype: me.getRefs().listView
      });
    }

    me.getListView().setActiveItem(0);
    me.util.showActiveItem(me.util.getMainViewPanel(me), me.getListView(), me.animationLeft);
    me.getApplication().fireEvent('setFilterViewCommand', me.getRefs().listView);
    me.getApplication().fireEvent('navbarUpdateCommand', Lang.policyListView.navbartitle, true);

    var userStore = Ext.getStore("User");    
    var customerPicker = Ext.ComponentQuery.query('#policylist_customer_filterfield')[0];
    var sto = me.getListView().getStore();
    if (userStore.customerId) {      
      var customerStore = Ext.getStore('CustomerListLocal');
      var customer = customerStore.getById(userStore.customerId);
      if (userStore.role === 'admin') {
        customerPicker.enable();
      } else {
        customerPicker.disable();
      }
      if (customer) {
        customerPicker.setValue(customer.get('name'));
      }      
      customerPicker.fireEvent('change', customerPicker, userStore.customerId);
    } else {
      if (userStore.role === 'admin') {
        sto.clearFilter();
        customerPicker.enable();
        customerPicker.reset();
      }
    }
  }
});
