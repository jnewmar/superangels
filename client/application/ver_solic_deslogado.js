
Template.ver_solic_deslogado.rendered = function(){
	this.autorun(function () {

		
		
		//res=ga('send', 'event', 'orcamento', 'cadastro', 'erro', 1);
		//console.log("Resultado GA "+JSON.stringify(res));
 	});
}

Template.ver_solic_deslogado.helpers({

	'obj_solic' : function(){


		if(Router.current().params.query.tipo!= undefined){
			tipo=Router.current().params.query.tipo;
			
		}else{
			tipo="TUDO";
		}
		console.log("Tipo selecionado "+tipo);


		s=Solic.findOne({_id: Router.current().params._id});


		s.solicitante=Meteor.users.findOne({_id : s.id_usuario} );

		s.servicos_procurados=[];

	  	if(s.servicos_procurados_local  && ( tipo =="LOCAL" || tipo =="TUDO"))  {

	  		ss = SolicServicos.findOne( 
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{tipo : "LOCAL" }
			]});	
			console.log("servico procurado "+JSON.stringify(ss));		
			s.servicos_procurados.push(ss);

	  	}

	  	if(s.servicos_procurados_salgados  && ( tipo =="SALGADOS" || tipo =="TUDO"))  {
	  		ss = SolicServicos.findOne( 
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{tipo : "SALGADOS" }
			]});	
			console.log("servico procurado "+JSON.stringify(ss));		
			s.servicos_procurados.push(ss);
	  	}

	  	if(s.servicos_procurados_doces  && ( tipo =="DOCES" || tipo =="TUDO"))  {

	  		ss = SolicServicos.findOne( 
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{tipo : "DOCES" }
			]});	
			console.log("servico procurado "+JSON.stringify(ss));		
			s.servicos_procurados.push(ss);
	  	}

	  	if(s.servicos_procurados_bolo  && ( tipo =="BOLO" || tipo =="TUDO"))  {

	  		ss = SolicServicos.findOne( 
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{tipo : "BOLO" }
			]});	
			console.log("servico procurado "+JSON.stringify(ss));		
			s.servicos_procurados.push(ss);
	  	}
	  	if(s.servicos_procurados_animacao  && ( tipo =="ANIMACAO" || tipo =="TUDO"))  {

	  		ss = SolicServicos.findOne( 
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{tipo : "ANIMACAO" }
			]});	
			console.log("servico procurado "+JSON.stringify(ss));		
			s.servicos_procurados.push(ss);
	  	}
	  	if(s.servicos_procurados_decoracao  && ( tipo =="DECORACAO" || tipo =="TUDO"))  {

	  		ss = SolicServicos.findOne( 
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{tipo : "DECORACAO" }
			]});	
			console.log("servico procurado "+JSON.stringify(ss));		
			s.servicos_procurados.push(ss);
	  	}
	  	if(s.servicos_procurados_outros  && ( tipo =="OUTROS" || tipo =="TUDO"))  {

	  		ss = SolicServicos.findOne( 
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{tipo : "OUTROS" }
			]});	
			console.log("servico procurado "+JSON.stringify(ss));		
			s.servicos_procurados.push(ss);
	  	}	  		  	




		console.log("solic "+JSON.stringify(s));
	  	return s;
  	},

	
});


Template.ver_solic_deslogado.events({	

	'click  #buttonEnviarOrcamento': function(e,t) {
	    e.preventDefault();

	    id_solic=Router.current().params._id;
		s=Solic.findOne({_id: id_solic});
		arr_fornecedor_tipos=[];
		for (i = 0; i < s.arr_servicos.length; i++) { 

			tipo=s.arr_servicos[i].toLowerCase();

			tmp={};

			
			var elArray = $("*[name^='orc_"+tipo+"_']");
			
			for (var a = 0; a< elArray.length;a++)
			{
				
				tmp[elArray[a].id.replace('orc_'+tipo+'_', '')]=elArray[a].value;
				//console.log("N "+a+" "+elArray[a].id+" value "+elArray[a].value);

			}

		
			if(tmp.detalhes!=undefined && tmp.valor!=undefined  && tmp.detalhes.trim()!="" && tmp.valor.trim()!="" ){

				//console.log("Inclui "+tipo+" "+JSON.stringify(o));	
				arr_fornecedor_tipos.push(s.arr_servicos[i]);				
			}


			

		}
		console.log("TIPOS A ANALISAR "+JSON.stringify(arr_fornecedor_tipos));


    	var arrFornecedor = $("*[name^='orc_fornecedor_']");
		f={};
		for (var a = 0; a< arrFornecedor.length;a++)
		{
			
			f[arrFornecedor[a].id.replace('orc_fornecedor_', '')]=arrFornecedor[a].value;
			//console.log("N "+a+" "+arrFornecedor[a].id+" value "+arrFornecedor[a].value);

		}


		user={
	      email: f.email,
	      password: f.senha,
	      profile: { name: f.nome,
	      			email: f.email,	
	      			telefone: f.telefone,
	      			cep: f.cep,
	      			data_cadastro: new Date()
	      			}
	    }
		console.log("user "+JSON.stringify(user));	

		Meteor.call("criaFornecedor", user, function(err,result){
			console.log("Criando Fornecedor "+JSON.stringify(user));							
			if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar criar fornecedor "+JSON.stringify(err));	
	        }
	        else{
				Meteor.loginWithPassword(f.email, f.senha, function(err){
			        if (err){
						console.log("Erros ao tentar logar com usuario criado "+JSON.stringify(err));	
			        }
			        else{
			        	console.log("Logou com sucesso");
			        	id_fornecedor=Meteor.userId();
						console.log("Serviços do fornecedor a cadastrar "+JSON.stringify(arr_fornecedor_tipos));
			        	for (i = 0; i <arr_fornecedor_tipos.length; i++) { 
					    	tipo=arr_fornecedor_tipos[i].toLowerCase();

							o={};
							o.tipo=s.arr_servicos[i];
							o.id_solic=id_solic;
							o.id_fornecedor=id_fornecedor;
							
							elArray = $("*[name^='orc_"+tipo+"_']");
							
							for ( a = 0; a< elArray.length;a++)
							{
								
								o[elArray[a].id.replace('orc_'+tipo+'_', '')]=elArray[a].value;
								console.log("N "+a+" "+elArray[a].id+" value "+elArray[a].value);

							}
							o.data_cadastro= new Date();	


					    	fs= {
					    		id_fornecedor: id_fornecedor ,
					    		tipo : arr_fornecedor_tipos[i],
					    		data_cadastro: new Date()
					    	};
					    	console.log("Cadastrar serviço para o fornecedor"+arr_fornecedor_tipos[i]+" "+JSON.stringify(fs));									
					    	Meteor.call("addFornecedorServico", fs);

							

			    			console.log("Cadastrar orçamento "+arr_fornecedor_tipos[i]+" "+JSON.stringify(o));									
							Meteor.call("fazerOrcamento", o);
					        					    		
								
							

							
		
													                

						}
				    }
			     });
			}					
		});

 

		
		Router.go('lista_solic_recebidas');
	}

});

