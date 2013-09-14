Ext.define('eibwebapp.view.policy.Main', {
  extend: 'Ext.form.Panel',
  requires: ['Ext.form.FieldSet'],
  xtype: 'policy_mainview',
  alias: 'widget.policy_mainview',
  defaults: {
    listeners: {
      init: function(args) {
        console.log('change');
      }
    }
  },
  config: {
    title: 'Info',
    iconCls: 'info',
    scrollable: true,
    items: [{
      xtype: "fieldset",
      defaults: {
        disabled: true
      },
      items: [{
        xtype: 'textfield',
        name: 'id',
        label: 'Id'
      }, {
        xtype: 'textfield',
        name: 'customer',
        label: 'Customer'
      }, {
        xtype: 'textfield',
        name: 'company',
        label: 'Company'
      }, {
        xtype: 'textfield',
        name: 'branch',
        label: 'Branch'
      }, {
        xtype: 'textfield',
        name: 'deadline',
        label: 'Deadline'
      }, {
        xtype: 'textfield',
        name: 'desc',
        label: 'Description'
      }, {
        xtype: 'textfield',
        name: 'award',
        label: 'Insurance award'
      }, {
        xtype: 'textfield',
        name: 'documentLink',
        label: 'Document',
        id: 'policy_mainview_documentLinkField'          
      }]
    }]
  }
});
