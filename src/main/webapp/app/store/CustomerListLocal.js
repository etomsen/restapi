Ext.define('eibwebapp.store.CustomerListLocal', {
  extend: 'Ext.data.Store',
  config: {
    model: 'eibwebapp.model.CustomerList',
    data: [{
      id: "1", 
      email: "smastrolia@9ren.org", 
      name: "9REN ASSET SRL",
      address: "PIAZZA MISSORI 2 - 20122 MILANO (MI)",
      category: "",
      vat: "00000000000",
      taxcode: "01857710683",
      webpage: ""
    }, {
      id: "2", 
      email: "", 
      name: "ACRAF SPA GRUPPO ANGELINI",
      address: "VIALE AMELIA 70 - 181 ROMA (RM)",
      category: "",
      vat: "01258691003",
      taxcode: "03907010585",
      webpage: ""
    },{
      id: "3", 
      email: "", 
      name: "AKTINA SPA",
      address: "VIA DEL PRETORIO 12 - 58010 SORANO -FRAZIONE SOVANA- (GR)",
      category: "",
      vat: "00000000000",
      taxcode: "05740970016",
      webpage: ""
    },{
      id: "4", 
      email: "", 
      name: "ALHADEFF MICHELA",
      address: "VIA ANTONIO D'ACHIARDI 31 - 158 ROMA (RM)",
      category: "",
      vat: "00000000000",
      taxcode: "LHDMHL46R47Z336W",
      webpage: ""
    }],
    filters: [{
      property: "name",
      value: ""
    }, {
      property: "taxcode",
      value: ""
    }, {
      property: "vat",
      value: ""
    }, {
      property: "email",
      value: ""
    }]
  }
});
