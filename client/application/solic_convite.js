
Template.solic_convite.rendered = function(){
	this.autorun(function () {
		if(Router.current().params.query.origem!= undefined){
			//chegou um requesta via landing page
			GAnalytics.event("VIA_LP",Router.current().params.query.origem);			
		}
	});
};	



Template.solic_convite.helpers = function(){
}	


Template.solic_convite.events({	
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

  'submit #formSolicConvite': function(e,t) {
    e.preventDefault();


		
		user={  name: document.getElementById('nome_contato').value ,
      			email: document.getElementById('email_contato').value,
      			telefone: document.getElementById('telefone_contato').value,
      			cep: document.getElementById('cep_contato').value,
      			sugestao: document.getElementById('sugestao').value,
	      		data_cadastro: new Date()
			};	      			




		console.log("user "+JSON.stringify(user));	

		Meteor.call("solicConvite", user, function(err,result){
			console.log("Resultado Solicitando Convite "+JSON.stringify(result));							
			if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros Solicitando Conviteo "+JSON.stringify(err));	
	        }
	        else{	        
				Router.go('solic_convite_cadastrado');
						
		     		
			}
		});
		
	}

});


