
Template.cad_usuario.rendered = function(){
	this.autorun(function () {

	});
};	



Template.cad_usuario.helpers = function(){
}	


Template.cad_usuario.events({	
	'click #upload': function (e,t) {
			e.preventDefault();

		filepicker.pick(
			{
			  mimetypes: ['image/gif','image/jpeg','image/png'],
			  multiple: false
			},
			function(InkBlob){

				document.getElementById('id_foto_contato').value=_.last(InkBlob.url.split("/"));

			 /* var image = Images.findOne({userId:Meteor.userId()});
			  if(image){
			    Images.update({_id:image._id},
			    {
			      $set:{
			        filepickerId:_.last(InkBlob.url.split("/"))
			      }  
			    });
			  }else{
			    Images.insert({
			      userId:Meteor.userId(),
			      filepickerId:_.last(InkBlob.url.split("/")),
			      createdAt:new Date() //this isnt guarnteed accurate, but its ok for this simple demo
			    });
			  }*/
			},
			function(FPError){
			   if(FPError && FPError.code !== 101)
			    alert(FPError.toString());
			}
		);
    },

  'submit #formCadastrarUsuario': function(e,t) {
    e.preventDefault();


		
		user={
	      email: document.getElementById('email_contato').value,
	      password: document.getElementById('senha').value ,
	      profile: { name: document.getElementById('nome_contato').value ,
	      			email: document.getElementById('email_contato').value,
	      			telefone: document.getElementById('telefone_contato').value,
	      			cep: document.getElementById('cep_contato').value,
	      			id_foto_contato:document.getElementById('id_foto_contato').value,
	      			data_cadastro: new Date()
	      			}
	    }



		console.log("user "+JSON.stringify(user));	

		Meteor.call("criaUsuario", user, function(err,result){
			console.log("Resultado Criando Usuario "+JSON.stringify(result));							
			if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar criar usuario "+JSON.stringify(err));	
	        }
	        else{
		        Meteor.loginWithPassword(document.getElementById('email_contato').value, user.password, function(errLogin){
			        if (errLogin){
			        	alert("Erro: "+errLogin.message);
						console.log("Erros ao tentar logar com usuario criado "+JSON.stringify(errLogin));	
			        }
			        else{
			          	console.log("Logou com sucesso");
						console.log("user "+JSON.stringify(Meteor.user()));	    
						id_usuario=Meteor.userId();
						u=Meteor.user();
						console.log("id user "+id_usuario+" | "+Meteor.userId());  
						Router.go('usuario_cadastrado', {_id: result});
					}	
		     	});			
			}
		});
		
	}

});


