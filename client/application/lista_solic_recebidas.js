Template.lista_solic_recebidas.helpers({
	getListaSolicRecebidas: function(tp) {
		


		

		so1=[];
		so=SolicServicosRecebidos.find({ id_fornecedor : Meteor.userId() }, {sort : {data_solic: -1}});
		so.forEach(function (s,i) {

			s.solicitante=Meteor.users.findOne({_id : s.id_cliente} );
		
			console.log("solic "+JSON.stringify(s));
			so1.push(s);
			return s;
        });   	


	  	return so1;
  	},
 });