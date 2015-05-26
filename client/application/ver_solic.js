
Template.ver_solic.rendered = function(){
	this.autorun(function () {

		
		
		//res=ga('send', 'event', 'orcamento', 'cadastro', 'erro', 1);
		//console.log("Resultado GA "+JSON.stringify(res));
 	});
}

Template.ver_solic.helpers({

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


Template.ver_solic.events({	

	'click  #buttonEnviarOrcamento': function(e,t) {
	    e.preventDefault();

	    id_solic=Router.current().params._id;
		s=Solic.findOne({_id: id_solic});
		arr_fornecedor_tipos=[];
		for (i = 0; i < s.arr_servicos.length; i++) { 

			tipo=s.arr_servicos[i].toLowerCase();

			o={};

			
			var elArray = $("*[name^='orc_"+tipo+"_']");
			
			for (var a = 0; a< elArray.length;a++)
			{
				
				o[elArray[a].id.replace('orc_'+tipo+'_', '')]=elArray[a].value;
				console.log("N "+a+" "+elArray[a].id+" value "+elArray[a].value);

			}

		
			if(o.detalhes!=undefined && o.valor!=undefined  && o.detalhes.trim()!="" && o.valor.trim()!="" ){

				console.log("Inclui "+tipo+" "+JSON.stringify(o));	
				arr_fornecedor_tipos.push(s.arr_servicos[i]);				
			}


			

		}


	    criou_user=0;
	    if(Meteor.userId()){
			id_fornecedor=Meteor.userId();
	    }else{	
	    	var arrFornecedor = $("*[name^='orc_fornecedor_']");
			f={};
			for (var a = 0; a< arrFornecedor.length;a++)
			{
				
				f[arrFornecedor[a].id.replace('orc_fornecedor_', '')]=arrFornecedor[a].value;
				console.log("N "+a+" "+arrFornecedor[a].id+" value "+arrFornecedor[a].value);

			}

			tmp_pass=Password.generate(8);
			user={
		      email: f.email,
		      password: tmp_pass,
		      profile: { name: f.nome,
		      			telefone: f.telefone,
		      			cep: f.cep,
		      			data_cadastro: new Date()
		      			}
		    }
			console.log("user "+JSON.stringify(user));	

			Meteor.call("criaFornecedor", user, function(err,result){
				console.log("Resultado Criando Fornecedor "+JSON.stringify(result));							
				console.log("Erros "+JSON.stringify(err));							
			});


			Meteor.loginWithPassword(f.email, tmp_pass, function(err){
		        if (err){
					console.log("Erros ao tentar logar com usuario criado "+JSON.stringify(err));	
		        }
		        else{
		        	console.log("Logou com sucesso");
		        	id_fornecedor=Meteor.userId();
					console.log("Serviços do fornecedor a cadastrar "+JSON.stringify(arr_fornecedor_tipos));
		        	for (i = 0; i <arr_fornecedor_tipos.length; i++) { 
				    	fs= {
				    		id_fornecedor: id_fornecedor ,
				    		tipo : arr_fornecedor_tipos[i],
				    		data_cadastro: new Date()
				    	};
				    	Meteor.call("addFornecedorServico", fs, function(err,result){
							console.log("Resultado ao cadastrar serviço para o fornecedor"+arr_fornecedor_tipos[i]+" "+JSON.stringify(result));									
						});

		                ssr={
		                    id_solic : id_solic ,
		                    tipo :  arr_fornecedor_tipos[i],
		                    id_cliente: s.id_usuario , 
		                    id_fornecedor : id_fornecedor ,
		                    respondido : false ,
		                    data_solic: new Date()
		                };
				    	Meteor.call("addSolicServicosRecebidos", ssr, function(err,result){
							console.log("Resultado ao cadastrar serviço para solicitação para o fornecedor "+arr_fornecedor_tipos[i]+" "+JSON.stringify(result));									
						});

					}




			    }
		     });

	    }



		for (i = 0; i < arr_fornecedor_tipos.length; i++) { 

			tipo=arr_fornecedor_tipos[i].toLowerCase();

			o={};
			o.tipo=arr_fornecedor_tipos[i];
			o.id_solic=id_solic;
			o.id_fornecedor=id_fornecedor;
			o.id_cliente= s.id_usuario ;
			
			var elArray = $("*[name^='orc_"+tipo+"_']");
			
			for ( a = 0; a< elArray.length;a++)
			{
				
				o[elArray[a].id.replace('orc_'+tipo+'_', '')]=elArray[a].value;
				console.log("N "+a+" "+elArray[a].id+" value "+elArray[a].value);

			}


			o.data_cadastro= new Date();

			if(Router.current().params.query.id_ssr!= undefined){
				o.id_ssr=Router.current().params.query.id_ssr;
				
			}

		
			if(o.detalhes!=undefined && o.valor!=undefined  && o.detalhes.trim()!="" && o.valor.trim()!="" ){

				Meteor.call("fazerOrcamento", o, function(err,result){
					console.log("Resultado "+JSON.stringify(result));			
				
				});
			}		

		}		

		Router.go('orcamento_cadastrado');
	}

});

