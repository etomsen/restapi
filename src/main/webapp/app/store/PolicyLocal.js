Ext.define('eibwebapp.store.PolicyLocal', {
  extend: 'Ext.data.Store',
  config: {
    model: 'eibwebapp.model.Policy',
    data: [{
      id: 'LIPIT0000000021',
      customer: '9REN ASSET SRL',
      customerId: 1,
      company: 'ACEVIT',
      companyId: 1,
      branch: 'VITA',
      branchId: 1,
      deadline: '01/01/2013',
      desc: 'VITA CCNL DIRIGENTI',
      award: 0.01,
      paymentsCount: 1
    }, {
      id: '10315108W',
      customer: 'ACRAF SPA',
      customerId: 2,
      company: 'LLOINF',
      companyId: 2,
      branch: 'INFORTUNI',
      branchId: 2,
      deadline: '31/12/2013',
      desc: 'CUNULATIVA INFORTUNI RINNOVO 2006 N',
      award: 6950.70
    }, {
      id: '71168232',
      customer: 'AKTINA SPA',
      customerId: 3,
      company: 'RAS',
      companyId: 3,
      branch: 'MRCAUTO',
      branchId: 3,
      deadline: '31/12/2013',
      desc: 'CH633JZ FIAT PANDA',
      award: 666.50
    }, {
      id: '5006519704205',
      customer: 'AKTINA SPA',
      customerId: 3,
      company: 'MAA',
      companyId: 4,
      branch: 'MRCAUTO',
      branchId: 3,
      deadline: '30/04/2013',
      desc: 'DX020NB AUDI A4 ALLROAD 2/0 TDI FAP',
      award: 1132.00
    }, {
      id: '10327461Y',
      customer: 'AKTINA SPA',
      customerId: 3,
      company: 'LLOARD',
      companyId: 5,
      branch: 'ARDLLOYD',
      branchId: 9,
      deadline: '24/01/2013',
      desc: 'FIAT PANDA,AUDI A4',
      award: 0.01
    }, {
      id: '5006518453601',
      customer: 'ALHADEFF MICHELA',
      customerId: 4,
      company: 'MAA',
      companyId: 4,
      branch: 'MRCAUTO',
      branchId: 3,
      deadline: '31/07/2013',
      desc: 'EN571NW LANCIA YPSILON 1/2 69CV GOL',
      award: 456.00
    }, {
      id: '5006502521559',
      customer: 'ALHADEFF MICHELA',
      customerId: 4,
      company: 'MAA',
      companyId: 4,
      branch: 'INCENDIO',
      branchId: 4,
      deadline: '30/09/2013',
      desc: 'ROMA-VIA DELLE EGADI 23 PIANO II IN',
      award: 105.00,
      documentLink: 'resources/docs/helloworld.pdf'
    }, {
      id: 'ADMOR00172E',
      customer: 'ALHADEFF MICHELA',
      customerId: 4,
      company: 'LLOARD',
      companyId: 5,
      branch: 'ARDLLOYD',
      branchId: 9,
      deadline: '30/09/2013',
      desc: 'LANCIA YPSILON 1/2 5PT GOLD 69CV TA',
      award: 0.01
    }, {
      id: 'ADMOR00194E',
      customer: 'BOCCHI GIOVANNI',
      customerId: 9,
      company: 'LLOARD',
      companyId: 5,
      branch: 'ARDLLOYD',
      branchId: 9,
      deadline: '30/09/2013',
      desc: 'FIAT DOBLO 1/6 DYNAMIC IMM 02/2011',
      award: 0.01
    }, {
      id: 'STL00278',
      customer: 'FONDAZIONE UGO BORDONI',
      customerId: 5,
      company: 'LLMIVI',
      companyId: 6,
      branch: 'VITA',
      branchId: 1,
      deadline: '01/01/2013',
      desc: 'TCM ASSICURATI DIPENDENTI',
      award: 0.01
    }, {
      id: '1585313',
      customer: 'HOTEL CAPRILLI SRL',
      customerId: 6,
      company: 'VISCTR',
      companyId: 7,
      branch: 'CAUZIONI',
      branchId: 5,
      deadline: '31/12/2013',
      desc: 'DEFINITIVA - OPERE DI URBANIZZAZION',
      award: 556.00
    }, {
      id: '66523396',
      customer: 'I.F.A.D.',
      customerId: 7,
      company: 'RAS',
      companyId: 3,
      branch: 'FURTO',
      branchId: 6,
      deadline: '31/12/2013',
      desc: 'ROMA-VIA PAOLO DI DONO 44'
    }, {
      id: 'A23.16.001978',
      customer: 'EURELETTRONICA ICAS SRL',
      customerId: 8,
      company: 'ITASYN',
      companyId: 7,
      branch: 'TRASPORTI',
      branchId: 8,
      deadline: '31/12/2013',
      desc: 'TRASPORTO MERCI E PRODOTTI -STRUMEN',
      award: 1365.00
    }, {
      id: '66523419',
      customer: 'I.F.A.D.',
      customerId: 7,
      company: 'RAS',
      companyId: 3,
      branch: 'TECNOLOGICI',
      branchId: 7,
      deadline: '31/12/2013',
      desc: 'IMPIANTI E APPARECCHIATURE ELETTRON',
      award: 29745.50
    }, {
      id: '7019000805',
      customer: 'BOCCHI GIOVANNI',
      customerId: 9,
      company: 'SUN',
      companyId: 8,
      branch: 'INCENDIO',
      branchId: 4,
      deadline: '24/01/2013',
      desc: 'UBICAZIONE RISCHIO VIA MONTE DI CAS',
      award: 384.00,
      paymentsCount: 22,
      claimsCount: 1
    }]
  }
});
