Ext.define('eibwebapp.controller.Home', {
  extend: 'Ext.app.Controller',
  util: eibwebapp.util.Util,
  rest: eibwebapp.util.Rest,
  config: {
    routes: {
      '': 'showHome'
    },
    refs: {
      mainView: 'mainview'
    }
  },

  animation: {
    type: 'slide',
    duration: 400,
    easing: 'ease-in-out',
    direction: 'left'
  },

  showHome: function(animation) {    
    var me = this;
    me.rest.healthcheckauth(function(response, opts) {
      me.getApplication().redirectTo('message/list');
    }, function(response, opts) {
      me.getApplication().redirectTo('logout');
    });
  }
});
