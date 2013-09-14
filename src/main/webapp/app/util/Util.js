Ext.define('eibwebapp.util.Util', {
  singleton: true,  
  destroyCmp: function(child, parent) {
    parent = parent || Ext.Viewport;
    if (child) {
      Ext.defer(function() {
        parent.remove(child);
      }, eibwebapp.util.Util.animDuration);
    }
  },

  getMainViewPanel: function(me) {
    if (me.getMainView()) {
      return me.getMainView()
        .items.get(1);
    } else {
      return null;
    }
  },

  validateUserRoleAdmin: function() {
    var sto = Ext.getStore("User");
    if (sto && sto.role === "admin") {
      return true;
    }
    Ext.Msg.alert(Lang.userValidation.roleAdminRequired.header, Lang.userValidation.roleAdminRequired.msg, function(buttonId) {
      eibwebapp.app.redirectTo('');
    });
    return false;
  },
  
  getUserId: function() {
    var sto = Ext.getStore("User");
    if (sto) {
      return sto.id;
    } else {
      return null;
    }
  },

  getUserToken: function() {
    var sto = Ext.getStore("User");
    if (sto) {
      return sto.token;
    } else {
      return null;
    }    
  },
    

  validateUser: function() {
    var sto  = Ext.getStore("User");
    if (sto && sto.id && sto.token) {
      return true;
    } else {
      Ext.Msg.alert(Lang.userValidation.noUser.header, Lang.userValidation.noUser.msg, function(buttonId) {
        eibwebapp.app.redirectTo('logout');
      });
    }
    return true;
  },

  showMsg: function(msg, title, cb, scope) {
    if (msg) {
      Ext.Msg.alert(title || 'Error', msg.toString(), cb || function() {}, scope || window);
    }

    return this;
  },

  initViewport: function(viewtype, animation) {
    var oldView = Ext.Viewport.getActiveItem();
    var newView = Ext.Viewport.add({
      xtype: viewtype
    });
    Ext.Viewport.animateActiveItem(newView, animation);
    if (oldView) {
      var task = Ext.create('Ext.util.DelayedTask', function() {
        Ext.Viewport.remove(oldView, true);
      });
      task.delay(500);
    }
  },

  showActiveItem: function(parentPanel, childPanel, animation) {
    animation = Ext.apply({
      type: 'fade',
      duration: this.amimationDuration
    }, animation || {});

    if (parentPanel && childPanel) {
      if (this.enablePageAnimations && animation && animation.type) {
        parentPanel.animateActiveItem(childPanel, animation);
      } else {
        parentPanel.setActiveItem(childPanel);
      }
    }

    return this;
  },

  showLoading: function(panel, doShow, message) {
    if (panel) {
      if (doShow) {
        panel.setMasked({
          xtype: 'loadmask',
          message: message || 'Loading...'
        });
      } else {
        panel.setMasked(false);
      }
    }
    return this;
  },

  destroyContainer: function(container, duration) {
    Ext.Function.defer(Ext.destroy, (duration || 250), this, [container]);
  },

  showAlertBox: function(msg) {
    var alertBox = Ext.create('Ext.Container', {
      cls: 'alert-box-container',
      centered: true,
      showAnimation: 'fadeIn',
      hideAnimation: 'fadeOut',
      html: msg
    });
    Ext.defer(function() {
      Ext.Viewport.add(alertBox);
    }, 300);

    Ext.defer(function() {
      alertBox.destroy();
    }, 1500);
  }
});
