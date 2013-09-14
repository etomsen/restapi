Ext.define('eibwebapp.controller.Filter', {
  extend: 'Ext.app.Controller',
  util: eibwebapp.util.Util,
  fieldsFilter: {},
  textFilter: '',
  config: {
    refs: {      
      mainView: 'mainview',
      filterfield: 'filterfield',
      filterdatafield: 'filterdatafield',
      filterView: 'filterview'      
    },
    control: {
      filterView: {
        filterToggleCommand: 'onFilterToggle',
        filterSearchClearCommand: 'onFilterSearchClear',
        filterSearchCommand: 'onFilterSearch'
      },
      filterfield: {
        filerFieldChange: 'onFilterFieldChange'
      },
      filterdatafield: {
        filerIntervalFieldChange: 'onFilerIntervalFieldChange'
      }
    }
  },
  listView: null,

  getFilter: function() {    
    var me = this;
    if (!me.listView) return null;
    if (!me.getMainView()) return null;
    var v = me.getMainView().down(me.listView);
    if (v) {
      return v.down('filterview');
    } else {
      return null;
    }
  },
  
  init: function() {
    var me = this;
    me.callParent(arguments);
    me.getApplication().on({
      setFilterViewCommand: {
        fn: function(view) {
          me.listView = view;
        }
      },
      clearFilerCmd: {
        fn: function() {
          me.onFilterClear();
        }
      },
      setCustomerCommand: {
        fn: function(id, name) {
          me.onFilterClear();
        }
      },
      applyFilterCommand: {
        fn: function(id, name) {
          me.doFilter();
        }
      }
    });
  },

  getStore: function() {
    var me = this;
    if (!me.listView) return null;
    if (!me.getMainView()) return null;
    var v = me.getMainView().down(me.listView);
    if (v) {
      return v.getStore();
    } else {
      return null;
    }
  },

  onFilterToggle: function() {
    var me = this;        
    var f = me.getFilter().items.get(0);
    if (f.isHidden()) {
      f.show();
    } else {
      f.hide();
    }
  },

  onFilterClear: function() {
    var me = this;
    me.fieldsFilter = {};
    me.textFilter = '';
    var store = me.getStore();
    if (!store) return;
    store.clearFilter();
  },

  onFilerIntervalFieldChange: function(field, value, interval) {
    var me = this;
    if (!me.fieldsFilter[field.getName()]) {
      me.fieldsFilter[field.getName()] = {};
      me.fieldsFilter[field.getName()].filtertype = 'interval';
    }
    if (!(me.fieldsFilter[field.getName()].filtertype === 'interval')) {
      me.fieldsFilter[field.getName()] = {};
      me.fieldsFilter[field.getName()].filtertype = 'interval';
    }
    if (interval) {
      me.fieldsFilter[field.getName()].from = value;
    } else {
      me.fieldsFilter[field.getName()].to = value;
    }
    var from = me.fieldsFilter[field.getName()].from;
    var to = me.fieldsFilter[field.getName()].to;
    // if we cancelled both left and right - delete filter field
    if (((!from) || (from === '')) && ((!to) || (to === ''))) {
      delete me.fieldsFilter[field.getName()];
    }
    me.doFilter();
  },

  onFilterFieldChange: function(field, value) {
    var me = this;
    if (!value || value === '') {
      delete me.fieldsFilter[field.getName()];
    } else {
      me.fieldsFilter[field.getName()] = value;
    }
    me.doFilter();
  },

  onFilterSearch: function(field) {
    var me = this;
    me.textFilter = '';
    if (field.getValue()) {
      me.textFilter = field.getValue();
    }
    me.doFilter();
  },

  onFilterSearchClear: function() {
    var me = this;
    me.textField = '';
    me.doFilter();
  },

  searchMatch: function(search, record) {
    var match = false;
    for (var i = 0; i < record.fields.getCount(); i++) {
      var item = record.get(record.fields.getAt(i).getName());
      match = search.test(item);
      if (match) return true;
    }
    return match;
  },

  fieldsBetween: function(f, start, end) {
    if (!start) {
      start = f;
    }
    if (!end) {
      end = f;
    }
    if ((start instanceof Date) && (end instanceof Date)) {
      return Ext.Date.between(f, start, end);
    } else {
      return Boolean((f >= start) && (f <= end));
    }
  },

  doFilter: function() {

    var me = this;
    var store = me.getStore();
    if (store) {
      store.clearFilter();
    } else {
      return;
    }
    // first do the fields search
    for (var f in me.fieldsFilter) {
      if (me.fieldsFilter[f].filtertype === 'interval') {
        if (!me.fieldsFilter[f].from) {
          if (!me.fieldsFilter[f].to) {
            continue;
          }
        }
        var intervalFilter = function(record) {
            return me.fieldsBetween(record.get(f), me.fieldsFilter[f].from, me.fieldsFilter[f].to);
            };
        store.filterBy(intervalFilter);
      } else {
        store.filter(f, me.fieldsFilter[f]);
      }
    }
    // then do the search filter
    if (me.textFilter === '') {
      return;
    }
    var searches = me.textFilter.split(' ');
    var regexps = [];
    var i;

    for (i = 0; i < searches.length; i++) {
      if (!searches[i]) continue;
      regexps.push(new RegExp(searches[i], 'i'));
    }

    store.filter(function(record) {
      var matched = [];
      for (i = 0; i < regexps.length; i++) {
        var search = regexps[i];
        matched.push(me.searchMatch(search, record));
      }
      if (regexps.length > 1 && matched.indexOf(false) != -1) {
        return false;
      } else {
        return matched[0];
      }
    });
  }

});
