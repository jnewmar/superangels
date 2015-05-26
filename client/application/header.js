 Template.header.rendered = function(){
	this.autorun(function () {

		
		$('.button-collapse').sideNav({
		  menuWidth: 300, // Default is 240
		  edge: 'left', // Choose the horizontal origin
		  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
		});

		$('.collapsible').collapsible();
		$('.modal-trigger').leanModal();
		//if(Router.current().route.getName()=="login"){
		//	$('#modalLogin').openModal()
		//}

 	});
}
 Template.menu_logado.rendered = function(){
	this.autorun(function () {
		$('.dropdown-button').dropdown({
		      inDuration: 300,
		      outDuration: 225,
		      constrain_width: true, // Does not change width of dropdown to that of the activator
		      hover: true, // Activate on hover
		      gutter: 0, // Spacing from edge
		      belowOrigin: true // Displays dropdown below the button
		    }
		  );


 	});
}
Template.header.helpers({
	getRouteName: function() {
	  	return Router.current().route.getName();
  	},
  	tem_menu:function() {
  		if(Router.current().route.getName() == "landing"){
	  		return false;
  		}else{
	  		return true;
  		}


  	},

 });




Template.menu_logado.events({	
	'click #logout' : function(e) {
		    e.preventDefault();
		    Meteor.logout();
			Router.go('/');		

	},	
});
Template.header.events({	


	'click .side-nav a' : function(e) {
		$('.button-collapse').sideNav('hide');

     	//alert("fecha: ");
          
	},	
	'click #abrirModalLogin' : function(e) {
		    e.preventDefault();
  			$('#modalLogin').openModal();
          ;		    
	},	
	'click #fecharModalLogin' : function(e) {
	    e.preventDefault();
  		$('#modalLogin').closeModal();
  	},		




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
				$('#modalLogin').closeModal()

				

			    if (Roles.userIsInRole(u, ['CLIENTE'])) {
			    	GAnalytics.event("login","CLIENTE");
			     	 Router.go('/cad_solic');
			    }
			    if (Roles.userIsInRole(u, ['FORNECEDOR'])) {
			    	GAnalytics.event("login","FORNECEDOR");
			      	Router.go('/lista_solic_recebidas');
			    }
				if (Roles.userIsInRole(u, ['ADMIN'])) {
					GAnalytics.event("login","ADMIN");
			      	Router.go('/dashboard');
			    }

				
			}	
	     });		
		
	},	

});	