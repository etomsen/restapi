Ext.define('eibwebapp.view.Login', {
  extend: 'Ext.form.Panel',
  alias: "widget.loginview",
  requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],
  config: {
    title: 'Login',
    layout: {
      type: 'vbox',
      pack: 'center',
      align: 'middle'
    },
    items: [{
      xtype: 'image',
      src: './resources/images/login.png',
      style: 'width:80px;height:80px;margin:auto;margin-top:20px'
    }, {
      xtype: 'label',
      style: 'width:80%; max-width: 300px; color:#990000; margin-top: 5px;',
      html: 'Login failed. Please enter the correct credentials.',
      itemId: 'signInFailedLabel',
      hidden: true,
      hideAnimation: 'fadeOut',
      showAnimation: 'fadeIn'
    }, {
      xtype: 'fieldset',
      title: 'Login',
      style: 'width:80%; max-width: 300px;',
      items: [{
        xtype: 'textfield',
        placeHolder: 'Username',
        itemId: 'userNameTextField',
        name: 'userNameTextField',
        required: true
      }, {
        xtype: 'passwordfield',
        placeHolder: 'Password',
        itemId: 'passwordTextField',
        name: 'passwordTextField',
        required: true
      }]
    }, {
      xtype: 'button',
      itemId: 'logInButton',
      ui: 'action',
      text: 'Log In',
      style: 'width:80%; max-width: 300px;'
    }],
    listeners: [{
      delegate: '#logInButton',
      event: 'tap',
      fn: 'onLogInButtonTap'
    }]
  },
  onLogInButtonTap: function() {
    var me = this,
        usernameField = me.down('#userNameTextField'),
        passwordField = me.down('#passwordTextField'),
        label = me.down('#signInFailedLabel'),
        username = usernameField.getValue(),
        password = passwordField.getValue();
    label.hide();
    usernameField.setValue('');
    passwordField.setValue('');
    // Using a delayed task in order to give the hide animation above
    // time to finish before executing the next steps.
    var task = Ext.create('Ext.util.DelayedTask', function() {
      label.setHtml('');      
      me.fireEvent('loginCommand', me, username, password);      
    });
    task.delay(500);
  },
  showSignInFailedMessage: function(message) {
    var label = this.down('#signInFailedLabel');
    label.setHtml(message);
    label.show();
  }
});
