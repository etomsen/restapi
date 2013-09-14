Ext.define('eibwebapp.view.FilterDataField', {
  extend: 'Ext.field.DatePicker',
  xtype: 'filterdatafield',
  alias: 'widget.filterdatafield',
  width: '200px',
  useClearIcon: true,
  interval: null,
  config: {    
    picker: {
      height: "50%",
      minHeight: "20%",
      toolbar: {
        items: [{
          text: 'Clear',
          ui: 'decline',
          align: 'right',
          handler: function(btn) {
            var picker = btn.up('datepicker');
            picker.fireEvent('change', picker, null);
            picker.hide();
          }
        }]
      },
      slotOrder: ['day', 'month', 'year'],
      yearFrom: parseInt(Ext.Date.format(new Date(), 'Y'), 10) - 10,
      yearTo: parseInt(Ext.Date.format(new Date(), 'Y'), 10) + 10,
      hideOnMaskTap: true
    },
    listeners: {
      change: function(field, newValue) {
        var me = this;            
        if (me.interval === true) {
          me.fireEvent('filerIntervalFieldChange', field, newValue, true);
        }
        if (me.interval === false) {
          me.fireEvent('filerIntervalFieldChange', field, newValue, false);
        }
      }
    }    
  },
  placeHolder: '...'
});