 Template.login.rendered = function(){
	this.autorun(function () {

		


 	});
}


Template.login.events({	

	'click #login-buttons-password': function(e) {
		    e.preventDefault();
		    Meteor.loginWithPassword(document.getElementById('login-username').value, document.getElementById('login-password').value, function(err){
	        if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar logar com usuario"+JSON.stringify(err));	
			}	
	        else{
	          	console.log("Logou com sucesso");
				console.log("user "+JSON.stringify(Meteor.user()));	    
				id_usuario=Meteor.userId();
				u=Meteor.user();
				console.log("id user "+id_usuario+" | "+Meteor.userId());  
				//$('#modalLogin').closeModal()

				

			    if (Roles.userIsInRole(u, ['CLIENTE'])) {
			    	GAnalytics.event("login","CLIENTE");
			     	// Router.go('/cad_solic');
			    }
			    if (Roles.userIsInRole(u, ['FORNECEDOR'])) {
			    	GAnalytics.event("login","FORNECEDOR");
			      	//Router.go('/lista_solic_recebidas');
			    }
				if (Roles.userIsInRole(u, ['ADMIN'])) {
					GAnalytics.event("login","ADMIN");
			      	//Router.go('/lista_solic');
			    }

				
			}	
	     });		
		
	},	

});	