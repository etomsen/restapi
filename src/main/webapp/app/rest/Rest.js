Ext.define('eibwebapp.rest.Rest', {
  singleton: true,
  ajaxTimeout: 1000,
  serverUrl: 'http://localhost:8080/restapi/',
  api: {
    policylist: 'policy/list',
    policydetails: 'policy/{id}'
  },
  
  proxyUrl: function(url) {
    return encodeURI("proxy.php?url="+url);
  },

  login: function(username, password, success, fail) {
    var me = this;
    me.post(me.serverUrl + 'user/login', {
      "username": username,
      "password": password
    },
    success, fail);
  },

  get: function(url, data, successCallback, failureCallback) {
    var me = this;
    if (!me.getUserToken() || !me.getUserId()) {
      failureCallback();
      return;
    }
    var time = me.getIsoDate();
    var nonce = me.makeRandomString();
    var stringToHash = me.getUserToken() + ':' + url + ',GET,' + time + "," + nonce;
    var authorization = me.getUserId() + ':' + me.doHash(stringToHash);

    Ext.Ajax.request({
      url: url,
      type: 'GET',
      timeout: me.ajaxTimeout,
      data: data,
      dataType: "json",
      headers: {
        'Authorization': authorization,
        'x-java-rest-date': time,
        'nonce': nonce
      },
      success: successCallback,
      failure: failureCallback
    });
  },

  makeRandomString: function() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  },
  /**
   * Return the current time as an ISO 8061 Date
   * @return {string} 2012-06-30T12:00:00+01:00
   */
  getIsoDate: function() {
    var d = new Date();



    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z';
  },

  /**    
   * Get a query string var
   * @param {string} ...
   * @return {string} ...
   */
  getQuery: function(name) {
    var query = window.location.search.substring(1);
    if (!query) return null;
    var vars = query.split('&');
    if (!vars) return null;
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (!pair) continue;
      if (decodeURIComponent(pair[0]) == name) {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  },

  /**
   * SHA256, then base64 encode a string
   * @param {string}
   * @return {string}
   */
  doHash: function(string) {
    var h = CryptoJS.SHA256(string);
    return h.toString(CryptoJS.enc.Base64);
  },

  /**
   * Wrap the API so we can proxy calls while testing.
   */
  post: function(url, data, successCallback, failureCallback) {
    var me = this;
    Ext.Ajax.request({
      url: url,
      method: 'POST',
      timeout: me.ajaxTimeout,
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: data,
      success: successCallback,
      failure: failureCallback
    });
  },

  /**
   * Post with authentication
   */
  postAuth: function(url, data, successCallback, failureCallback) {
    var me = this;
    if (!me.getUserToken() || !me.getUserId()) {
      failureCallback();
      return;
    }
    var time = me.getIsoDate();
    var nonce = me.makeRandomString();
    var stringToHash = me.getUserToken() + ':' + url + ',POST,' + time + "," + nonce;
    var authorization = me.getUserId() + ':' + me.doHash(stringToHash);

    Ext.Ajax.request({
      url: url,
      type: 'POST',
      timeout: me.ajaxTimeout,
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: "json",
      headers: {
        'Authorization': authorization,
        'x-java-rest-date': time,
        'nonce': nonce
      },
      success: successCallback,
      failure: failureCallback
    });
  },

  /**
   * Wrap the API so we can proxy calls while testing.
   */
  put: function(url, data, successCallback, failureCallback) {
    var me = this;
    if (!me.getUserToken() || !me.getUserId()) {
      failureCallback();
      return;
    }
    var time = me.getIsoDate();
    var nonce = me.makeRandomString();
    var stringToHash = me.getUserToken() + ':' + url + ',PUT,' + time + "," + nonce;
    var authorization = me.getUserId() + ':' + me.doHash(stringToHash);

    Ext.Ajax.request({
      url: url,
      type: "PUT",
      timeout: me.ajaxTimeout,
      contentType: "application/json",
      data: JSON.stringify(data),
      headers: {
        'Authorization': authorization,
        'x-java-rest-date': time,
        'nonce': nonce
      },
      dataType: "json",
      success: successCallback,
      failure: failureCallback
    });
  }
});
