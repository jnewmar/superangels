Meteor.publish('solic_convite', function(id) {
  return SolicConvite.find({});
});


Meteor.publish('solic', function(id) {
  return Solic.find({});
});

Meteor.publish('solicOne', function(id) {
  return Solic.find({_id: id});
});


Meteor.publish('solicServicosRecebidos', function() {
    console.log("solicServicosRecebidos "+this.userId);
      return SolicServicosRecebidos.find( { id_fornecedor : this.userId } );  
  
});




Meteor.publish('solicServicos', function(id,tipo) {

		//console.log("solicServicos "+id+" "+tipo);

		if(tipo!="TUDO"){
			return SolicServicos.find(  { id_solic : id });	
		}else{
			return SolicServicos.find( 
			 { $and:[  
				{ id_solic : id },
				{tipo : tipo }
			]});	
		}		
});


Meteor.publish('rascunho', function(id) {
  return Rascunho.find({});
});

Meteor.publish('solic_cliente', function(id) {
  return Solic.find({});
});
Meteor.publish('orcamentosDaSolic', function(id) {	
	o=Orcamento.find({id_solic: id});
  //o.forEach(function (orc) {
  //    console.log("Orcamento solic-> "+id+" "+JSON.stringify(orc));
 // });

  return o;
});


Meteor.publish('orcamentosDaSSR', function(id) {  
  o=Orcamento.find({id_ssr: id});
 // o.forEach(function (orc) {
  //   console.log("Orcamento solic-> "+id+" "+JSON.stringify(orc));
 // });

  return o;
});


Meteor.publish("listaFornecedores", function() {
		
    var user = Meteor.users.findOne({
        _id: this.userId
    });


  //  if (Roles.userIsInRole(user, ["ADMIN"])) {
        return Meteor.users.find({}, {
            fields: {
                createdAt :1,
                profile: 1,
                emails: 1,
                roles: 1                
            }
        });
  //  }

   // this.stop();
   // return;
});

Meteor.publish("listaClientes", function() {
    
    var user = Meteor.users.findOne({
        _id: this.userId
    });


   if (Roles.userIsInRole(user, ["ADMIN"])) {
        return Meteor.users.find({}, {
            fields: {
                createdAt :1,
                profile: 1,
                emails: 1,
                roles: 1                
            }
        });
    }

   // this.stop();
    return;
});

Meteor.publish("buscaCliente", function(id_cliente) {
    
    var user = Meteor.users.findOne({
        _id: this.userId
    });


   if (Roles.userIsInRole(user, ["FORNECEDOR","ADMIN"])) {
        return Meteor.users.find({_id: id_cliente}, {
            fields: {
                profile: 1,
                emails: 1,
                roles: 1                
            }
        });
    }

    //this.stop();
    return;
});

Meteor.publish("buscaOneUser", function(id) {
    
    var user = Meteor.users.findOne({
        _id: this.userId
    });


 //  if (Roles.userIsInRole(user, ["FORNECEDOR","ADMIN"])) {
        return Meteor.users.find({_id: id}, {
            fields: {
                profile: 1,
                emails: 1,
                roles: 1                
            }
        });
   // }

   // this.stop();
   // return;
});

Meteor.methods({
  getDash: function(){    
  d = new Date();
  dia=pad(d.getDate(),2);
  mes=pad(d.getMonth()+1,2);
  hora=pad(d.getHours(),2);
  minuto=pad(d.getMinutes(),2);
  ano=d.getFullYear();

  hoje=ano+"/"+mes+"/"+dia;

    d={};
    d.hoje={};
    d.hoje.solic=Solic.find({ data_cadastro : { "$gte" : new Date(hoje)  } }).count();
    d.hoje.orc=Orcamento.find({ data_cadastro : { "$gte" : new Date(hoje)  } }).count();
    d.hoje.clientes=Meteor.users.find({ $and : [
      { roles : { $in: ["CLIENTE"] } },
      { createdAt : { "$gte" : new Date(hoje)  } }
      ] }).count();        
    d.hoje.fornecedores=Meteor.users.find(
     { $and : [
      { roles : { $in: ["FORNECEDOR"] } },
      { createdAt : { "$gte" : new Date(hoje)  } }
      ]}).count();
    d.geral={};
    d.geral.solic=Solic.find({}).count();
    d.geral.orc=Orcamento.find({}).count();
    d.geral.clientes=Meteor.users.find({ roles : { $in: ["CLIENTE"] } }).count();
    d.geral.fornecedores=Meteor.users.find({ roles : { $in: ["FORNECEDOR"] } }).count();
    console.log("getDash "+JSON.stringify(d));
    return d;

  },  
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}