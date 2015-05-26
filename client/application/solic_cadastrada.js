
Template.solic_cadastrada.rendered = function(){
	this.autorun(function () {

		
		
		//res=ga('send', 'event', 'orcamento', 'cadastro', 'erro', 1);
		//console.log("Resultado GA "+JSON.stringify(res));
 	});
}

Template.solic_cadastrada.helpers({

	'obj_solic' : function(){


		if(Router.current().params.query.tipo!= undefined){
			tipo=Router.current().params.query.tipo;
			
		}else{
			tipo="TUDO";
		}
		console.log("Tipo selecionado "+tipo);


		s=Solic.findOne({_id: Router.current().params._id});
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


Template.solic_cadastrada.events({	
	
});

