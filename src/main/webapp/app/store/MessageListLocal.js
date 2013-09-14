Ext.define('eibwebapp.store.MessageListLocal', {
  extend: 'Ext.data.Store',
  requires: "Ext.data.proxy.LocalStorage",
  config: {
    model: 'eibwebapp.model.MessageDocument',
    proxy: {
      type: 'localstorage',
      id: 'eibwebapp-messages'
    },
    sorters: [{
      property: 'dateCreated',
      direction: 'DESC'
    }],
    grouper: {
      sortProperty: "dateCreated",
      direction: "DESC",
      groupFn: function(record) {

        if (record && record.data.dateCreated) {
          return record.data.dateCreated.toDateString();
        } else {
          return '';
        }
      }
    },
    data: [{
      id: 1,
      title: 'Prova di comunicazione',
      messageType: 'Promozione',
      dateCreated: '1/9/2007',
      validFrom: '9/9/2013',
      validTo: '',
      documentTitle: 'Allegato communicazione',
      documentLink: 'resources/docs/helloworld.pdf',
      read: false
    }, {
      id: 2,
      title: 'Prova di comunicazione',
      messageType: 'Promozione',
      dateCreated: '1/9/2007',
      validFrom: '9/9/2013',
      validTo: '',
      documentLink: '',
      read: false
    }, {
      id: 3,
      title: 'Prova di comunicazione e promozione',
      messageType: 'Promozione',
      dateCreated: '18/05/2001',
      validFrom: '9/9/2013',
      validTo: '',
      documentLink: '',
      read: false
    }, {
      id: 4,
      title: 'Prova di comunicazione e promozione',
      messageType: 'Promozione',
      dateCreated: '10/05/2001',
      validFrom: '9/10/2013',
      validTo: '9/11/2013',
      documentLink: '',
      read: true
    }],
    filters: [{
      property: "title",
      value: ""
    }, {
      property: "company",
      value: ""
    }, {
      property: "read",
      value: ""
    }]
  }
});
