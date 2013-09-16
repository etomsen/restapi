Ext.define('eibwebapp.controller.Navbar', {
    extend: 'Ext.app.Controller',
    rest: eibwebapp.util.Rest,
    config: {
        refs: {
            navbarView: 'navbarview',
            mainMenuView: {
                selector: 'mainmenuview',
                xtype: 'mainmenuview',
                autoCreate: true
            },
            mainView: 'mainview'
        },
        control: {
            navbarView: {
                mainMenuTogleCommand: 'onMainMenuTogleCommand',
                backCommand: 'onBackCommand',
                navbarAfterLoadCommand: 'onNavbarAfterLoadCommand'
            },
            mainMenuView: {
                itemtap: function (list, index, item, record) {
                    var me = this;
                    me.onMainMenuTapItem(record);
                    me.onMainMenuTogleCommand();
                }
            }
        }
    },

    current: {
        root: true,
        title: Lang.home
    },
    actions: [],

    init: function () {
        var me = this;
        me.getApplication().on({
            navbarUpdateCommand: {
                fn: function (title, root) {
                    me.onNavbarUpdate(title, root);
                }
            },
            setCustomerCommand: {
                fn: function (id, name) {
                    var me = this;
                    var userStore = Ext.getStore("User");
                    userStore.customerId = id;
                    if (!name) {
                        Ext.getStore('MainMenu').getById(7).set('title', 'Select customer...');
                    } else {
                        Ext.getStore('MainMenu').getById(7).set('title', name);
                    }
                    Ext.getStore('MainMenu').sync();
                }
            }
        });
        me.callParent(arguments);
    },

    onNavbarUpdate: function (title, root) {
        var me = this;
        me.current.title = title;
        me.current.root = root;
        if (root) {
            me.actions = [];
            me.enableBackButton(false);
        } else {
            me.enableBackButton(true);
        }
        me.setNavTitle(title);
        if (me.actions.length < 1) {
            me.actions.push(window.location.hash.substr(1));
        }
        if (me.actions[me.actions.length - 1] === window.location.hash.substr(1)) {
            return;
        }
        me.actions.push(window.location.hash.substr(1));
    },

    onBackCommand: function () {
        var me = this;
        if ((me.current.root) || (me.actions.length < 2)) {
            return;
        }
        me.actions.pop();
        me.getApplication().redirectTo(me.actions[me.actions.length - 1]);
    },

    setNavTitle: function (text) {
        var me = this;
        if (me.getNavbarView()) {
            me.getNavbarView().setTitle(text);
        }
    },

    enableBackButton: function (enable) {
        var me = this;
        if (me.getNavbarView()) {
            var b = me.getNavbarView().down('#backButton');
            if (b) {
                if (enable) {
                    b.show();
                } else {
                    b.hide();
                }
            }
        }
    },

    onMainMenuTogleCommand: function () {
        var me = this;
        //
        var c = me.getMainView().items.get(1);
        if (c.element.hasCls('out')) {
            c.element.removeCls('out').addCls('in');
            c.setMasked(false);
        } else {
            debugger;
            me.getMainMenuView().getStore().clearFilter();
            var role = me.rest.getUserRole();
            if (role) {
                me.getMainMenuView().getStore().filter("role", role);
            }
            c.element.removeCls('in').addCls('out');
            c.setMasked(true);
        }
    },

    onMainMenuTapItem: function (record) {
        var currentRoute = window.location.hash.substr(1);
        if (currentRoute != record.get('url')) {
            this.getApplication().redirectTo(record.get('url'));
        }
    },

    onNavbarAfterLoadCommand: function () {
        var me = this;
        me.onNavbarUpdate(me.current.title, me.current.root);
    }
});
