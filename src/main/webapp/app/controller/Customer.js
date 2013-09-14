Ext.define('eibwebapp.controller.Customer', {
  extend: 'Ext.app.Controller',
  util: eibwebapp.util.Util,
  config: {
    routes: {
      'customer/list': 'showList',
      'customer/:id': 'showDetails'
    },
    refs: {
      mainView: 'mainview',
      listView: 'customerlistview',
      detailsView: 'customerview'
    },
    control: {
      listView: {
        itemtap: function(list, index, target, record) {
          var me = this;
          me.getApplication()
            .fireEvent('setCustomerCommand', record.get('id'), record.get('name'));
          me.redirectTo('');
        }
      }
    }
  },


  animation: {
    type: 'slide',
    duration: 400,
    easing: 'ease-in-out',
    direction: 'left'
  },

  showList: function(animation) {
    var me = this;
    if (!me.util.validateUserRoleAdmin()) {
      return;
    }    

    if (!me.getMainView()) {
      me.util.initViewport(me.getRefs()
        .mainView, me.animation);
    }
    if (!me.getListView()) {
      me.util.getMainViewPanel(me)
        .add({
        xtype: me.getRefs()
          .listView
      });
    }
    me.getListView()
      .setActiveItem(0);
    me.util.showActiveItem(me.util.getMainViewPanel(me), me.getListView());
    me.getApplication()
      .fireEvent('navbarUpdateCommand', Lang.customerListView.navbartitle, true);
    me.getApplication()
      .fireEvent('setFilterViewCommand', me.getRefs()
      .listView);
  },

  showDetails: function(animation) {
    var me = this;
    if (!me.getMainView()) {
      me.util.initViewport(me.getRefs()
        .mainView, me.animation);
    }
    if (!me.getDetailsView()) {
      me.util.getMainViewPanel(me)
        .add({
        xtype: me.getRefs()
          .detailsView
      });
    }
    me.getDetailsView()
      .setActiveItem(0);
    me.util.showActiveItem(me.util.getMainViewPanel(me), me.getDetailsView());
    me.getApplication()
      .fireEvent('navbarUpdateCommand', Lang.customerDetailsView.navbartitle, true);
    me.getApplication()
      .fireEvent('setFilterViewCommand', me.getRefs()
      .detailsView);
  }
});
