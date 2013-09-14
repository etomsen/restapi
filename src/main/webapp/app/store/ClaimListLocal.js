Ext.define('eibwebapp.store.ClaimListLocal', {
  extend: 'Ext.data.Store',
  config: {
    model: 'eibwebapp.model.Claim',
    data: [{
      id: '1002649',
      policyId: '5006502521559',
      type: 'R.C. TERZI',
      date: '4/11/2010',
      dateArchived: '',
      desc: 'DANNO ACQUA',
      liquidated: 0,
      counterpart: 'DIVERSI'
    },{
      id: '1101107',
      policyId: '5006502521559',
      type: 'R.C. TERZI',
      date: '6/02/2011',
      dateArchived: '',
      desc: 'DANNO ACQUA',
      liquidated: 0,
      counterpart: 'STEFANELLI+MARSICOLA'
    }],
    filters: [{
      property: "desc",
      value: ""
    }, {
      property: "counterpart",
      value: ""
    }]
  }
});
