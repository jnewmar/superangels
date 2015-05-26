Template.lista_solic_convite.helpers({
	getListaSolic: function(tp) {
		


		

		so1=[];
		so=SolicConvite.find({}, {sort : {data_cadastro: -1}});
		so.forEach(function (s,i) {

			//s.solicitante=Meteor.users.findOne({_id : s.id_usuario} );
		
			//console.log("solic "+JSON.stringify(s));
			//so1.push(s);
			return s;
        });   	


	  	return so;
  	},
 });