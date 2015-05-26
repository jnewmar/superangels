Template.lista_clientes.helpers({
	getListaClientes: function(tp) {
		


		cli=Meteor.users.find({ roles : { $in: ["CLIENTE"] } }, {sort : {createdAt: -1}})

		


	  	return cli;
  	},
 });