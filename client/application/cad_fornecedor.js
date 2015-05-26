
Template.cad_fornecedor.rendered = function(){
	this.autorun(function () {

		$('sexo').material_select();
		
	});
};	



Template.cad_fornecedor.helpers = function(){
}	


Template.cad_fornecedor.events({
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
  'submit #formCadastrarFornecedor': function(e,t) {
    e.preventDefault();


    	if(document.getElementById('senha').value != document.getElementById('senha1').value){
    		alert("Senhas não conferem");
    		return false;
    	}
	
		user={
	      email: document.getElementById('email_contato').value,
	      password: document.getElementById('senha').value ,
	      profile: { name: document.getElementById('nome_contato').value ,
	      			email: document.getElementById('email_contato').value,
	      			telefone: document.getElementById('telefone_contato').value,
	      			cep: document.getElementById('cep_contato').value,

	      			data_nascimento: new Date(document.getElementById('data_nascimento').value),
		      		sexo: document.getElementById('sexo').value,      			
	      			peso: document.getElementById('peso').value,
		      		altura: document.getElementById('altura').value,  
					preferencia_horario: document.getElementById('preferencia_horario').value,  
					experiencia: document.getElementById('experiencia').value,  
					cursos: document.getElementById('cursos').value,  
					valores: document.getElementById('valores').value,  
					fumante: document.getElementById('fumante').checked, 
					carro: document.getElementById('carro').checked, 
					dirige: document.getElementById('dirige').checked, 
					id_foto_contato:document.getElementById('id_foto_contato').value,
	      			data_cadastro: new Date()
	      			}
	    }





		console.log("user "+JSON.stringify(user));	

		Meteor.call("criaFornecedor", user, function(err,result){
			console.log("Resultado Criando Usuario "+JSON.stringify(result));							
			if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar criar usuario "+JSON.stringify(err));	
	        }
	        else{
	       		Router.go('fornecedor_cadastrado', {_id: result}); 	

		      /*  Meteor.loginWithPassword(document.getElementById('email_contato').value, user.password, function(errLogin){
			        if (errLogin){
			        	alert("Erro: "+errLogin.message);
						console.log("Erros ao tentar logar com usuario criado "+JSON.stringify(errLogin));	
			        }
			        else{
			          	console.log("Logou com sucesso");
						console.log("user "+JSON.stringify(Meteor.user()));	    
						id_fornecedor=Meteor.userId();
						u=Meteor.user();
						console.log("id user "+id_fornecedor+" | "+Meteor.userId());  			



						Router.go('fornecedor_cadastrado', {_id: result});
					}	
		     	});	
		     	*/		
			}
		});
		
	}

});


