
Template.dashboard.rendered = function(){
	this.autorun(function () {
		var d=Meteor.call("getDash", function(err,result){
			console.log("Resultado "+JSON.stringify(result));		



			$("#hoje_clientes").html(result.hoje.clientes);	
			$("#hoje_solic").html(result.hoje.solic);				
			$("#hoje_orc").html(result.hoje.orc);	
			$("#hoje_fornecedores").html(result.hoje.fornecedores);	
			$("#geral_clientes").html(result.geral.clientes);	
			$("#geral_solic").html(result.geral.solic);				
			$("#geral_orc").html(result.geral.orc);	
			$("#geral_fornecedores").html(result.geral.fornecedores);			
			return result;
		});
 	});
}



Template.dashboard.helpers({

	'dash' : function(){

		
	
  	},

	
});


Template.dashboard.events({	



});

