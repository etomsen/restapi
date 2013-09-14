Ext.define("eibwebapp.store.BranchListLocal", {
  extend: "Ext.data.Store",
  defaulturl: "resources/images/umbrella.png",
  config: {
    fields: [{
      name: "id",
      type: "string"
    }, {
      name: "url",
      type: "string"
    }],    
    
    data: [{
      id: "VITA",
      url: "resources/images/life.png"
    }, {
      id: "INFORTUNI",
      url: "resources/images/accident.png"
    }, {
      id: "MRCAUTO",
      url: "resources/images/auto.png"
    }, {
      id: "INCENDIO",
      url: "resources/images/fire.png"
    }, {
      id: "CAUZIONI",
      url: "resources/images/deposit.png"
    }, {
      id: "FURTO",
      url: "resources/images/robery.png"
    }, {
      id: "TECNOLOGICI",
      url: "resources/images/technology.png"
    }, {
      id: "TRASPORTI",
      url: "resources/images/transport.png"
    }, {
      id: "ARDLLOYD",
      url: this.defaulturl
    }]
  }
});
