Ext.define("eibwebapp.util.Rest", {
        requires: ['Ext.util.Cookies'],
        singleton: true,
        ajaxTimeout: 10000,
        cookieValidity: 100,
        addAuthHeader: true,
        serverUrl: "http://localhost:8080/restapi/",
        api: {
            policy: "policy",
            policyDetails: "policy/{id}",
            login: "user/login",
            healthcheckauth: "healthcheck/auth"
        },

        proxyUrl: function (url) {
            return encodeURI("proxy.php?url=" + url);
        },

        healthcheckauth: function (success, fail) {
            var me = this;
            me.get(me.api.healthcheckauth, {}, success, fail);
        },

        policyList: function (success, fail) {
            var me = this;
            me.get(me.api.policy, {}, success, fail);
        },

        login: function (username, password, success, fail) {
            var me = this;
            me.post(me.api.login, {
                    "username": username,
                    "password": password
                },
                success, fail);
        },


        validateUserRoleAdmin: function () {
            var sto = Ext.getStore("User");
            if (sto && sto.role === eibwebapp.util.roleAdmin) {
                return true;
            }
            Ext.Msg.alert(Lang.userValidation.roleAdminRequired.header, Lang.userValidation.roleAdminRequired.msg, function (buttonId) {
                eibwebapp.app.redirectTo('');
            });
            return false;
        },

        setUser: function(userId, token) {
            debugger;
            var me = this;
            var d = new Date();
            d.setDate(d.getDate() + me.cookieValidity);
            Ext.util.Cookies.set('eibwebapp_userId', userId, d, "/");
            Ext.util.Cookies.set('eibwebapp_userToken', token, d, "/");
        },

        validateUser: function () {
            debugger;
            var me = this;
            if (me.getUserId() && me.getUserToken()) {
                return true;
            } else {
                Ext.Msg.alert(Lang.userValidation.noUser.header, Lang.userValidation.noUser.msg, function (buttonId) {
                    eibwebapp.app.redirectTo('logout');
                });
            }
            return true;
        },
        getUserId: function () {
            return Ext.util.Cookies.get('eibwebapp_userId');
        },

        getUserToken: function () {
            return Ext.util.Cookies.get('eibwebapp_userToken');
        },

        getAuthorizationHeader: function (url, method) {
            var me = this;
            var id = me.getUserId();
            var token = me.getUserToken();
            if (!id || !token) {
                return null;
            }
            var time = me.getIsoDate();
            var nonce = me.makeRandomString();
            var stringToHash = token + ":" + url + "," + method + "," + time + "," + nonce;
            var authorization = id + ":" + me.doHash(stringToHash);
            return {
                "Authorization": authorization,
                "x-me-tomsen-restapi-date": time,
                "nonce": nonce
            };
        },

        get: function (url, data, successCallback, failureCallback) {
            var me = this;
            me.addAuthHeader = false;
            var h = me.getAuthorizationHeader(url, 'GET');
            if (!h) {
                console.log('ERROR: unable to get user Id/Token!');
                failureCallback();
                return;
            }
            Ext.Ajax.request({
                url: url,
                type: "GET",
                timeout: me.ajaxTimeout,
                data: data,
                dataType: "json",
                headers: h,
                success: successCallback,
                failure: failureCallback
            });
            me.addAuthHeader = true;
        },

        makeRandomString: function () {
            return Math.random()
                .toString(36)
                .substring(2, 15) + Math.random()
                .toString(36)
                .substring(2, 15);
        },
        /**
         * Return the current time as an ISO 8061 Date
         * @return {string} 2012-06-30T12:00:00+01:00
         */
        getIsoDate: function () {
            var d = new Date();

            function pad(n) {
                return n < 10 ? "0" + n : n;
            }

            return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
        },

        /**
         * Get a query string var
         * @param {string} name
         * @return {string} query
         */
        getQuery: function (name) {
            var query = window.location.search.substring(1);
            if (!query) return null;
            var vars = query.split("&");
            if (!vars) return null;
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (!pair) continue;
                if (decodeURIComponent(pair[0]) == name) {
                    return decodeURIComponent(pair[1]);
                }
            }
            return null;
        },

        /**
         * SHA256, then base64 encode a string
         * @param {string} string to hash
         * @return {string} hash
         */
        doHash: function (string) {
            var h = CryptoJS.SHA256(string);
            return h.toString(CryptoJS.enc.Base64);
        },

        /**
         * Wrap the API so we can proxy calls while testing.
         */
        post: function (url, data, successCallback, failureCallback) {
            var me = this;
            Ext.Ajax.request({
                url: url,
                method: "POST",
                timeout: me.ajaxTimeout,
                headers: {
                    "Content-Type": "application/json"
                },
                jsonData: data,
                success: successCallback,
                failure: failureCallback
            });
        },

        /**
         * Post with authentication
         */
        postAuth: function (url, data, successCallback, failureCallback) {
            var me = this;

            Ext.Ajax.request({
                url: url,
                type: "POST",
                timeout: me.ajaxTimeout,
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: "json",
                headers: me.getAuthorizationHeader(url, "POST"),
                success: successCallback,
                failure: failureCallback
            });
        },

        put: function (url, data, successCallback, failureCallback) {
            var me = this;

            Ext.Ajax.request({
                url: url,
                type: "PUT",
                timeout: me.ajaxTimeout,
                contentType: "application/json",
                data: JSON.stringify(data),
                headers: me.getAuthorizationHeader(url, "PUT"),
                dataType: "json",
                success: successCallback,
                failure: failureCallback
            });
        }
    },

    function () {
//  var me = this;
//  for(var key in me.api) {
//     me.api[key] = me.serverUrl + me.api[key];
//  }
    });
