

 Template.lista_orcamentos.rendered = function(){
	this.autorun(function () {

		

 	});
}




Template.lista_orcamentos.helpers({
	

	getListaOrcamentos: function() {	

		console.log("ID SOLIC "+Router.current().params._id );
		o=Orcamento.find({ id_solic : Router.current().params._id });
		//console.log("Orcamento "+JSON.stringify(o));
		return o;

	},
	

	
});


Template.lista_orcamentos.events({	


});		