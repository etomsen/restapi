Ext.define('eibwebapp.view.filter.PolicyList', {
  extend: 'Ext.Panel',
  requires: ['eibwebapp.view.FilterDataField', 'eibwebapp.store.CustomerListLocal', 'eibwebapp.view.Filterfield', 'eibwebapp.view.Filter'],
  xtype: 'filter_policylistview',
  alias: 'widget.filter_policylistview',

  initialize: function(arguments) {
    var me = this;
    me.callParent(arguments);
    me.add({
      xtype: 'filterview'
    });
    me.items.get(0).items.get(0).add(me.buildItems());
  },

  buildItems: function() {
    var me = this;
    return {
      xtype: 'panel',
      style: 'padding: 10px',
      layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
      },
      defaults: {
        width: '80%'
      },
      items: [me.buildDeadlinePickers(), me.buildCustomerPicker(), me.buildCompanyPicker(), me.buildBranchPicker()]
    };
  },
  buildDeadlinePickers: function() {
    return {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        pack: 'left'
      },
      style: 'background: 1px dotted black',
      items: [{
        xtype: 'container',
        layout: {
          type: 'hbox',
          pack: 'left',
          align: 'center'
        },
        style: 'width: 20%; color: white;',
        items: {
          html: 'Deadline:'
        }
      }, {
        xtype: 'container',
        layout: {
          type: 'hbox',
          pack: 'rigth'
        },
        width: "40%",
        style: 'padding-right: 10px',
        items: {
          xtype: 'filterdatafield',
          name: 'deadline',
          placeHolder: '  From',
          interval: true,
          width: "100%",
          style: 'margin: 0; padding: 0;'
        }
      }, {
        xtype: 'container',
        layout: {
          type: 'hbox',
          pack: 'rigth'
        },
        width: "40%",
        style: 'padding-left: 10px',
        items: {
          xtype: 'filterdatafield',
          name: 'deadline',
          placeHolder: '  To',
          interval: false,
          width: "100%",
          style: 'margin: 0; padding: 0;'
        }
      }]
    };
  },
  buildCustomerPicker: function() {
    return {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        pack: 'left'
      },
      items: [{
        xtype: 'container',
        layout: {
          type: 'hbox',
          pack: 'left',
          align: 'center'
        },
        style: 'width: 20%; color: white;',
        items: {
          html: 'Customer:'
        }
      }, {
        xtype: 'filterfield',
        id: 'policylist_customer_filterfield',
        name: 'customerId',
        width: '80%',
        style: 'margin-left: 0; margin-rigth: 0',
        displayField: 'name',
        valueField: 'id',
        placeHolder: '  ...',
        store: 'CustomerListLocal',
        defaultPhonePickerConfig: {
          hideOnMaskTap: true,
          toolbar: {
            title: 'Select a customer...',
            items: [{
              text: 'Clear',
              ui: 'decline',
              align: 'right',
              handler: function(btn) {
                var picker = btn.up('picker');
                picker.hide();
                var field = Ext.ComponentQuery.query('#policylist_customer_filterfield')[0];
                field.reset();
              }
            }]
          }
        }
      }]
    };
  },
  buildCompanyPicker: function() {
    return {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        pack: 'left'
      },
      items: [{
        xtype: 'container',
        layout: {
          type: 'hbox',
          pack: 'left',
          align: 'center'
        },
        style: 'width: 20%; color: white;',
        items: {
          html: 'Company:'
        }
      }, {
        xtype: 'filterfield',
        id: 'policylist_company_filterfield',
        name: 'companyId',
        width: '80%',
        style: 'margin-left: 0; margin-rigth: 0',
        displayField: 'name',
        valueField: 'id',
        placeHolder: '  ...',
        store: 'CustomerListLocal',
        defaultPhonePickerConfig: {
          hideOnMaskTap: true,
          toolbar: {
            title: 'Select a company...',
            items: [{
              text: 'Clear',
              ui: 'decline',
              align: 'right',
              handler: function(btn) {
                var picker = btn.up('picker');
                picker.hide();
                var field = Ext.ComponentQuery.query('#policylist_company_filterfield')[0];
                field.reset();
              }
            }]
          }
        }
      }]
    };
  },
  buildBranchPicker: function() {
    return {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        pack: 'left'
      },
      items: [{
        xtype: 'container',
        layout: {
          type: 'hbox',
          pack: 'left',
          align: 'center'
        },
        style: 'width: 20%; color: white;',
        items: {
          html: 'Branch:'
        }
      }, {
        xtype: 'filterfield',
        id: 'policylist_branch_filterfield',
        name: 'branch',
        width: '80%',
        style: 'margin-left: 0; margin-rigth: 0',
        displayField: 'name',
        valueField: 'name',
        placeHolder: '  ...',
        store: 'BranchListLocal',
        defaultPhonePickerConfig: {
          hideOnMaskTap: true,
          toolbar: {
            title: 'Select a branch...',
            items: [{
              text: 'Clear',
              ui: 'decline',
              align: 'right',
              handler: function(btn) {
                var picker = btn.up('picker');
                picker.hide();
                var field = Ext.ComponentQuery.query('#policylist_branch_filterfield')[0];
                field.reset();
              }
            }]
          }
        }
      }]
    };
  }
});
