Ext.define('eibwebapp.controller.Login', {
    extend: 'Ext.app.Controller',
    util: eibwebapp.util.Util,
    rest: eibwebapp.util.Rest,
    config: {
        routes: {
            'login': 'showLogin',
            'logout': 'showLogout'
        },

        refs: {
            loginView: 'loginview'
            // autoCreate: true
        },

        control: {
            loginView: {
                loginCommand: 'onLoginCommand'
            }
        }
    },

    animationLeft: {
        type: 'slide',
        duration: 400,
        easing: 'ease-in-out',
        direction: 'left'
    },

    animationRight: {
        type: 'slide',
        duration: 400,
        easing: 'ease-in-out',
        direction: 'right'
    },

    onLoginCommand: function(view, name, password) {
        var me = this;
        me.getLoginView()
            .setMasked({
                xtype: 'loadmask',
                message: Lang.signingIn
            });
        var sto = Ext.getStore("User");
        me.rest.login(name, password, function(response, opts) {
            var obj = null;
            if (response.statusText === "OK") {
                console.log('INFO: login request OK');
                obj = JSON.parse(response.responseText);
                eibwebapp.util.Rest.setUser(obj.userId, obj.token, obj.role);
                console.log("INFO: signed in as " + obj.role);
                me.getLoginView().setMasked(false);
                eibwebapp.app.redirectTo('');
            } else {
                console.log("INFO: login request" + response.statusText);
                obj = JSON.parse(response.responseText);
                if (obj.applicationMessage) {
                    console.log("INFO: login failed [Message: " + obj.applicationMessage + "].");
                    alert(obj.applicationMessage);
                } else {
                    console.log('INFO: login failed');
                    alert("login failed: " + response.statusText);
                }
                me.getLoginView().setMasked(false);
            }
        }, function(response, opts) {
            obj = JSON.parse(response.responseText);
            if (obj.applicationMessage) {
                console.log("ERROR: login request failed [Message: " + obj.applicationMessage + "]");
                alert(obj.applicationMessage);
                me.getLoginView()
                    .setMasked(false);
            } else {
                console.log("ERROR: login request failed [Code:" + response.status + "].");
                alert("server failure code: " + response.status);
                me.getLoginView()
                    .setMasked(false);
            }
        });
    },

    showLogin: function(animation) {
        var me = this;
        if (!me.getLoginView()) {
            me.util.initViewport('loginview', me.animationRight);
        }
    },

    showLogout: function(animation) {
        var me = this;
        var sto = Ext.getStore("User");
        Ext.util.Cookies.clear('eibwebapp_userId', "/");
        Ext.util.Cookies.clear('eibwebapp_userToken', "/");
        Ext.util.Cookies.clear('eibwebapp_userRole', "/");
        sto.customerId = "";
        eibwebapp.app.fireEvent('clearFilerCmd');
        eibwebapp.app.redirectTo('login');
    }
});
