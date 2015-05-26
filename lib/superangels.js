Schemas = {};
SolicConvite = new Meteor.Collection('solic_convite');
Meteor.methods({
  solicConvite: function(u){    
    id_sc =  SolicConvite.insert(u);
    console.log("id_sc "+id_sc+" "+JSON.stringify(u));
    Meteor.call('sendEmail',
            "william.mori@gmail.com",
            "william.mori@gmail.com",
            '[SUPERANGELS] Solicitação de Convite Cadastrada',
            'SOLIC '+JSON.stringify(u, null, 4));
  /*  Meteor.call('sendEmail',
            "duzackzack@gmail.com",
            "william.mori@gmail.com",
            '[SUPERANGELS] Solicitação de Convite Cadastrada',
            'SOLIC '+JSON.stringify(u, null, 4));
    Meteor.call('sendEmail',
            "nelson.mkt@gmail.com",
            "william.mori@gmail.com",
            '[SUPERANGELS] Solicitação de Convite Cadastrada',
            'SOLIC '+JSON.stringify(u, null, 4));
*/

    Meteor.call('sendEmailObrigadoSolicitarConvite',u);
    return id_sc;

  },  
});