
Template.cad_solic.rendered = function(){
	this.autorun(function () {

	/*	
$('.datepicker').pickadate({
	selectYears: 15,
  });*/
		$('select').material_select();

		if(Router.current().params.query.email_contato!= undefined){
			document.getElementById('email_contato').value=Router.current().params.query.email_contato;
			
		}

		if(Router.current().params.query.festa_convidados!= undefined){
			document.getElementById('festa_convidados').value=Router.current().params.query.festa_convidados;
			
		}

		if(Router.current().params.query.festa_data!= undefined){
			document.getElementById('festa_data').value=Router.current().params.query.festa_data;
			
		}


		if(Router.current().params.query.origem!= undefined){
			//chegou um requesta via landing page
			GAnalytics.event("VIA_LP",Router.current().params.query.origem);			
		}

		


 	});
}

Template.cad_solic.helpers = function(){
}	


Template.cad_solic.events({	
  'submit #formSolicOrca': function(e,t) {
    e.preventDefault();

   		var arrBairrosValues =[];
	    var arrBairros = document.getElementsByName('servicos_procurados_local_bairros');
		k=0;
		for(var i = 0; i < arrBairros.length; i++){
		    if(arrBairros[i].checked){
		        arrBairrosValues[k] = arrBairros[i].value;
		        k++;
		    }
		}

        solic = {

    

		//nome_contato: document.getElementById('nome_contato').value,
		//email_contato: document.getElementById('email_contato').value,
		//telefone_contato: document.getElementById('telefone_contato').value,
		//cep_contato: document.getElementById('cep_contato').value,	
	//	relacao_contato: document.getElementById('relacao_contato').value,	

	//	nome_contato: u.profile.name,
	//	email_contato: u.profile.email,
	//	telefone_contato: u.profile.telefone,
	//	cep_contato: u.profile.cep,	
	//	relacao_contato: document.getElementById('relacao_contato').value,	
		
	//	nome_aniversariante: document.getElementById('nome_aniversariante').value,
	//	sexo_aniversariante: document.getElementById('sexo_aniversariante').value,	
	//	data_nasc_aniversariante: document.getElementById('data_nasc_aniversariante').value,
		
		festa_convidados: document.getElementById('festa_convidados').value,
		festa_data: document.getElementById('festa_data').value,
		festa_hora: document.getElementById('festa_hora').value,			
		festa_detalhes: document.getElementById('festa_detalhes').value,	
		
	//	procurarLocalFesta: document.getElementById('procurarLocalFesta').value	,
	//	local_nome: document.getElementById('local_nome').value	,
	//	local_endereco: document.getElementById('local_endereco').value	,
	//	local_bairro: document.getElementById('local_bairro').value	,
	//	local_procurado_bairros: arrBairrosValues	,
	//	local_procurado_observacoes: document.getElementById('local_procurado_observacoes').value	,
		
		servicos_procurados_local_bairros: arrBairrosValues	,
		servicos_procurados_local: document.getElementById('servicos_procurados_local').checked 	,
		servico_procurado_observacoes_local: document.getElementById('servico_procurado_observacoes_local').value	,

		servicos_procurados_salgados: document.getElementById('servicos_procurados_salgados').checked 	,
		servico_procurado_observacoes_salgados: document.getElementById('servico_procurado_observacoes_salgados').value	,

		servicos_procurados_doces: document.getElementById('servicos_procurados_doces').checked 	,
		servico_procurado_observacoes_doces: document.getElementById('servico_procurado_observacoes_doces').value	,

		servicos_procurados_bolo: document.getElementById('servicos_procurados_bolo').checked 	,
		servico_procurado_observacoes_bolo: document.getElementById('servico_procurado_observacoes_bolo').value	,

		servicos_procurados_animacao: document.getElementById('servicos_procurados_animacao').checked 	,
		servico_procurado_observacoes_animacao: document.getElementById('servico_procurado_observacoes_animacao').value	,

		servicos_procurados_decoracao: document.getElementById('servicos_procurados_decoracao').checked 	,
		servico_procurado_observacoes_decoracao: document.getElementById('servico_procurado_observacoes_decoracao').value	,

		servicos_procurados_outros: document.getElementById('servicos_procurados_outros').checked 	,
		servico_procurado_observacoes_outros: document.getElementById('servico_procurado_observacoes_outros').value	,


    };
	criou_user=0;
    if(Meteor.userId()){
		id_usuario=Meteor.userId();
		console.log("user "+JSON.stringify(Meteor.user()));
		u=Meteor.user();
		solic.id_usuario= id_usuario,
		console.log("solicitacao "+JSON.stringify(solic));	


		Meteor.call("solicOrcamento", solic, function(err,result){
			console.log("Resultado "+JSON.stringify(result));
			//ga('send', 'event', 'solicOrcamento', 'cadastro', 'erro', 1);		
			if(result){
				Router.go('solic_cadastrada', {_id: result});
			}else{
			//	ga('send', 'event', 'erro', 'cadastro', 'erro', 1);		
			  	alert('Erro ao enviar solicitação.');
			}	

		});		
    }else{



		tmp_pass=Password.generate(8);
		user={
	      email: document.getElementById('email_contato').value,
	      password: document.getElementById('senha').value,
	      profile: { name: document.getElementById('nome_contato').value ,
	      			email: document.getElementById('email_contato').value,
	      			telefone: document.getElementById('telefone_contato').value,
	      			cep: document.getElementById('cep_contato').value,
	      			data_cadastro: new Date()
	      			}
	    }



		console.log("user "+JSON.stringify(user));	

		Meteor.call("criaUsuario", user, function(err,result){
			if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar criar usuario "+JSON.stringify(err));	
	        }
			console.log("Resultado Criando Usuario "+JSON.stringify(result));							
			console.log("Erros "+JSON.stringify(err));							
		});
		Meteor.loginWithPassword(document.getElementById('email_contato').value, document.getElementById('senha').value, function(err){
	        if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar logar com usuario criado "+JSON.stringify(err));	
	        }
	        else{
	          	console.log("Logou com sucesso");
				console.log("user "+JSON.stringify(Meteor.user()));	    
				id_usuario=Meteor.userId();
				solic.id_usuario= id_usuario,
				u=Meteor.user();
				criou_user=1;

				console.log("id user "+id_usuario+" | "+Meteor.userId());  


				console.log("solicitacao "+JSON.stringify(solic));	
	

				Meteor.call("solicOrcamento", solic, function(err,result){
					console.log("Resultado "+JSON.stringify(result));
					//ga('send', 'event', 'solicOrcamento', 'cadastro', 'erro', 1);		
					if(result){
						Router.go('/solic_cadastrada/'+result);
					}else{
					//	ga('send', 'event', 'erro', 'cadastro', 'erro', 1);		
					  	alert('Erro ao enviar solicitação.');
					}	

				});
			}	
	     });
		
	}	


	
	

		
	
  },
  'change #procurarLocalFesta' : function(e) {
		var precisa_local=document.getElementById('procurarLocalFesta').value;


		var box1=document.getElementById('comLocal');
		var box2=document.getElementById('semLocal');

		console.log("precisa local "+precisa_local);
		if(precisa_local== "sim"){
			box1.classList.add("escondido");
			box1.classList.remove("ativo");
		
			box2.classList.add("ativo");
			box2.classList.remove("escondido");	

		}

		if(precisa_local== "nao"){
			box2.classList.add("escondido");
			box2.classList.remove("ativo");
			
			box1.classList.add("ativo");
			box1.classList.remove("escondido");	
			
		}
	
		
	},

  'change #servicos_procurados_local' : function(e) {
		var check=document.getElementById('servicos_procurados_local').checked;


		var box1=document.getElementById('semLocal');


		//console.log("check "+check);
		if(check){

			box1.classList.add("ativo");
			box1.classList.remove("escondido");	
		

		}else{

			box1.classList.add("escondido");
			box1.classList.remove("ativo");			
			
		}
	
		
	},	
	'change #servicos_procurados_salgados' : function(e) {
		var check=document.getElementById('servicos_procurados_salgados').checked;


		var box1=document.getElementById('servico_procurado_observacoes_salgados');


		//console.log("check "+check);
		if(check){
			box1.classList.add("ativo");
			box1.classList.remove("escondido");				

		}else{
			box1.classList.add("escondido");
			box1.classList.remove("ativo");	

			
		}
	
		
	},
	'change #servicos_procurados_doces' : function(e) {
		var check=document.getElementById('servicos_procurados_doces').checked;


		var box1=document.getElementById('servico_procurado_observacoes_doces');


		//console.log("check "+check);
		if(check){
			box1.classList.add("ativo");
			box1.classList.remove("escondido");				

		}else{
			box1.classList.add("escondido");
			box1.classList.remove("ativo");	

			
		}
	
		
	},
	'change #servicos_procurados_bolo' : function(e) {
		var check=document.getElementById('servicos_procurados_bolo').checked;


		var box1=document.getElementById('servico_procurado_observacoes_bolo');


	//	console.log("check "+check);
		if(check){
			box1.classList.add("ativo");
			box1.classList.remove("escondido");				

		}else{
			box1.classList.add("escondido");
			box1.classList.remove("ativo");	

			
		}
	
		
	},
	'change #servicos_procurados_decoracao' : function(e) {
		var check=document.getElementById('servicos_procurados_decoracao').checked;


		var box1=document.getElementById('servico_procurado_observacoes_decoracao');


	//	console.log("check "+check);
		if(check){
			box1.classList.add("ativo");
			box1.classList.remove("escondido");				

		}else{
			box1.classList.add("escondido");
			box1.classList.remove("ativo");	

			
		}
	
		
	},
	'change #servicos_procurados_animacao' : function(e) {
		var check=document.getElementById('servicos_procurados_animacao').checked;


		var box1=document.getElementById('servico_procurado_observacoes_animacao');


		//console.log("check "+check);
		if(check){
			box1.classList.add("ativo");
			box1.classList.remove("escondido");				

		}else{
			box1.classList.add("escondido");
			box1.classList.remove("ativo");	

			
		}
	
		
	},			
	  'change #servicos_procurados_outros' : function(e) {
		var check=document.getElementById('servicos_procurados_outros').checked;


		var box1=document.getElementById('servico_procurado_observacoes_outros');


	//	console.log("check "+check);
		if(check){
			box1.classList.add("ativo");
			box1.classList.remove("escondido");				

		}else{
			box1.classList.add("escondido");
			box1.classList.remove("ativo");	

			
		}
	
		
	},

		'click #tab-1' : function(e) {
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');

		var box1=document.getElementById('dieta-1');
		var box2=document.getElementById('dieta-2');
		var box3=document.getElementById('dieta-3');
		var box4=document.getElementById('dieta-4');
		

		tab2.classList.add("tab");
		tab2.classList.remove("tab-sel");
		box2.classList.add("escondido");
		box2.classList.remove("ativo");
		
		tab3.classList.add("tab");
		tab3.classList.remove("tab-sel");
		box3.classList.add("escondido");
		box3.classList.remove("ativo");
		
		tab4.classList.add("tab");
		tab4.classList.remove("tab-sel");
		box4.classList.add("escondido");
		box4.classList.remove("ativo");
		
		tab1.classList.add("tab-sel");
		tab1.classList.remove("tab");
		box1.classList.add("ativo");
		box1.classList.remove("escondido");		
		
	},
	'click #tab-2' : function(e) {
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');

		var box1=document.getElementById('dieta-1');
		var box2=document.getElementById('dieta-2');
		var box3=document.getElementById('dieta-3');
		var box4=document.getElementById('dieta-4');
		
		tab1.classList.add("tab");
		tab1.classList.remove("tab-sel");
		box1.classList.add("escondido");
		box1.classList.remove("ativo");
		
		tab3.classList.add("tab");
		tab3.classList.remove("tab-sel");
		box3.classList.add("escondido");
		box3.classList.remove("ativo");
		
		tab4.classList.add("tab");
		tab4.classList.remove("tab-sel");
		box4.classList.add("escondido");
		box4.classList.remove("ativo");
		
		tab2.classList.add("tab-sel");
		tab2.classList.remove("tab");
		box2.classList.remove("escondido");
		box2.classList.add("ativo");
		
		
	},
	'click #tab-3' : function(e) {
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');

		var box1=document.getElementById('dieta-1');
		var box2=document.getElementById('dieta-2');
		var box3=document.getElementById('dieta-3');
		var box4=document.getElementById('dieta-4');
		

		tab1.classList.add("tab");
		tab1.classList.remove("tab-sel");
		box1.classList.add("escondido");
		box1.classList.remove("ativo");

		
		tab2.classList.add("tab");
		tab2.classList.remove("tab-sel");
		box2.classList.add("escondido");
		box2.classList.remove("ativo");
	
		tab4.classList.add("tab");
		tab4.classList.remove("tab-sel");
		box4.classList.add("escondido");
		box4.classList.remove("ativo");
		
		tab3.classList.add("tab-sel");
		tab3.classList.remove("tab");
		box3.classList.remove("escondido");
		box3.classList.add("ativo");	
	},
	'click #tab-4' : function(e) {
		var tab1=document.getElementById('tab-1');
		var tab2=document.getElementById('tab-2');
		var tab3=document.getElementById('tab-3');
		var tab4=document.getElementById('tab-4');

		var box1=document.getElementById('dieta-1');
		var box2=document.getElementById('dieta-2');
		var box3=document.getElementById('dieta-3');
		var box4=document.getElementById('dieta-4');
		
		tab1.classList.add("tab");
		tab1.classList.remove("tab-sel");
		box1.classList.add("escondido");
		box1.classList.remove("ativo");

		
		tab2.classList.add("tab");
		tab2.classList.remove("tab-sel");
		box2.classList.add("escondido");
		box2.classList.remove("ativo");
	
		tab3.classList.add("tab");
		tab3.classList.remove("tab-sel");
		box3.classList.add("escondido");
		box3.classList.remove("ativo");

		tab4.classList.add("tab-sel");
		tab4.classList.remove("tab");
		box4.classList.remove("escondido");
		box4.classList.add("ativo");		
		
		
	},	


});


