Ext.define('eibwebapp.view.Filterfield', {
  extend: 'Ext.field.Select',
  xtype: 'filterfield',
  alias: 'widget.filterfield',
  config: {
    autoSelect: false,
    usePicker: true,
    listeners: {
      change: function(field, newValue) {
        
        var me = this;
        me.fireEvent('filerFieldChange', field, newValue);
      }
    }
  },

  onStoreDataChanged: function(store) {
    var initialConfig = this.getInitialConfig(),
        value = this.getValue();


    if (Ext.isDefined(value)) {
      this.updateValue(this.applyValue(value));
    }
    if (this.getValue() === null) {
      if (initialConfig.hasOwnProperty('value')) {
        this.setValue(initialConfig.value);
      }
      if (this.getValue() === null && this.getPlaceHolder() == null) {
        if (store.getCount() > 0) {
          this.setValue(store.getAt(0));
        }
      }
    }
  },


  showPicker: function() {
    var store = this.getStore();
    //check if the store is empty, if it is, return
    if (!store || store.getCount() === 0) {
      return;
    }
    if (this.getReadOnly()) {
      return;
    }
    this.isFocused = true;
    if (this.getUsePicker()) {
      var picker = this.getPhonePicker(),
          name = this.getName(),
          value = {};
      if (this.getPlaceHolder() == null) {
        value[name] = this.record.get(this.getValueField());
        picker.setValue(value);
      }
      if (!picker.getParent()) {
        Ext.Viewport.add(picker);
      }
      picker.setHeight("50%");
      picker.show();
    } else {
      var listPanel = this.getTabletPicker(),
          list = listPanel.down('list'),
          store = list.getStore(),
          index = store.find(this.getValueField(), this.getValue(), null, null, null, true),
          record = store.getAt((index == -1) ? 0 : index);

      if (!listPanel.getParent()) {
        Ext.Viewport.add(listPanel);
      }


      listPanel.showBy(this.getComponent());
      if (this.getPlaceHolder() == null) {
        list.select(record, null, true);
      }
    }
  },


  reset: function() {
    var me = this;
    me.getValueField();
    var store = me.getStore(),
        record = me.originalValue;
    if (me.getPlaceHolder() == null && !record) {
      record = store.getAt(0);
    }
    if (store && record) {
      me.setValue(record);
    } else if (me.getPlaceHolder() != null) {
      me.setValue(null);
    }

    return this;
  }
});
