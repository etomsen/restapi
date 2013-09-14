Ext.define('eibwebapp.controller.Message', {
  extend: 'Ext.app.Controller',
  util: eibwebapp.util.Util,
  config: {
    routes: {
      'message/list': 'showList',
      'message/:id': 'showDetails'
    },
    refs: {
      mainView: 'mainview',
      listView: 'messagelistview'
    },
    control: {
      listView: {
        showMsgsCommand: 'showMsgs',
        showNewMsgsCommand: 'showNewMsgs',
        itemtap: function(list, index, target, record) {
          var me = this;
          var doc = record.get('documentLink');
          record.set('read', true);
          sto = me.getListView().getStore();
          sto.sync();
          if (doc) {
            var actionSheet = Ext.create('Ext.ActionSheet', {
              items: [{
                xtype: 'button',
                text: 'Open PDF attachment?',
                handler: function() {
                  window.open(doc);
                  actionSheet.hide();
                },
                ui: 'confirm'
              }, {
                text: 'Cancel',
                ui: 'decline',
                scope: this,
                handler: function() {
                  actionSheet.hide();
                }
              }]
            });
            Ext.Viewport.add(actionSheet);
            actionSheet.show();
          }
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

  showNewMsgs: function() {
    var me = this;
    me.getListView().setEmptyText(Lang.messageListView.emptyTextNew);
    var sto = me.getListView().getStore();
    sto.clearFilter();
    sto.filter('read', false);
    me.getApplication().fireEvent('navbarUpdateCommand', Lang.messageListView.navbartitleNew, true);
  },

  showMsgs: function() {
    var me = this;
    me.getListView().setEmptyText(Lang.messageListView.emptyText);
    var sto = me.getListView().getStore();
    sto.clearFilter();
    me.getApplication().fireEvent('navbarUpdateCommand', Lang.messageListView.navbartitle, true);
  },

  showList: function(animation) {    
    var me = this;
    if (!me.util.validateUser()) return;
    if (!me.getMainView()) {
      me.util.initViewport(me.getRefs().mainView, me.animation);
    }
    if (!me.getListView()) {
      me.util.getMainViewPanel(me).add({
        xtype: me.getRefs().listView
      });
    }
    me.getListView().setActiveItem(0); // new messages    
    me.util.showActiveItem(me.util.getMainViewPanel(me), me.getListView());
    me.showNewMsgs();
  },

  showDetails: function(animation) {
    alert('Not implemented yet!');
  }
});
