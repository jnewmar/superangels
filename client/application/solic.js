
Template.solic.rendered = function(){
	this.autorun(function () {

		
		
		//res=ga('send', 'event', 'orcamento', 'cadastro', 'erro', 1);
		//console.log("Resultado GA "+JSON.stringify(res));
 	});
}

Template.solic.helpers({

	'obj_solic' : function(){


		console.log("ID SOLIC "+Router.current().params._id );

		var $_GET = {},
	    args = location.search.substr(1).split(/&/);
		for (var i=0; i<args.length; ++i) {
		    var tmp = args[i].split(/=/);
		    if (tmp[0]) {
		        $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
		    }
		}	
		if($_GET['tipo']!= "" && $_GET['tipo']!= undefined){
			tipo=$_GET['tipo'];
			
		}else{
			tipo="TUDO";
		}

		console.log("GET "+JSON.stringify($_GET));








		s=Solic.findOne({_id: Router.current().params._id});

		s.email_contato_truncate=s.email_contato.substring(0,5)+"*****************";
		s.telefone_contato_truncate=s.telefone_contato.substring(0,5)+"****";		
		console.log("TIPO 1"+tipo+" 2"+tipo);

	  	if(s.procurarLocalFesta == "sim" && ( tipo =="LOCAL" || tipo =="TUDO"))  {
	  		s.procura_local=true;
	  	}else{
	  		s.procura_local=false;		
	  	}

	  	if(s.servicos_procurados_salgados  && ( tipo =="SALGADOS" || tipo =="TUDO"))  {
	  		s.servicos_procurados_salgados=true;
	  	}else{
	  		s.servicos_procurados_salgados=false;	  		
	  	}

	  	if(s.servicos_procurados_doces  && ( tipo =="DOCES" || tipo =="TUDO"))  {
	  		s.servicos_procurados_doces=true;
	  	}else{
	  		s.servicos_procurados_doces=false;	  		
	  	}

	  	if(s.servicos_procurados_bolo  && ( tipo =="BOLO" || tipo =="TUDO"))  {
	  		s.servicos_procurados_bolo=true;
	  	}else{
	  		s.servicos_procurados_bolo=false;	  		
	  	}
	  	if(s.servicos_procurados_animacao  && ( tipo =="ANIMACAO" || tipo =="TUDO"))  {
	  		s.servicos_procurados_animacao=true;
	  	}else{
	  		s.servicos_procurados_animacao=false;	  		
	  	}
	  	if(s.servicos_procurados_decoracao  && ( tipo =="DECORACAO" || tipo =="TUDO"))  {
	  		s.servicos_procurados_decoracao=true;
	  	}else{
	  		s.servicos_procurados_decoracao=false;	  		
	  	}
	  	if(s.servicos_procurados_outros  && ( tipo =="OUTROS" || tipo =="TUDO"))  {
	  		s.servicos_procurados_outros=true;
	  	}else{
	  		s.servicos_procurados_outros=false;	  		
	  	}	  		  	


		if(s.servicos_procurados_salgados || s.servicos_procurados_doces || s.servicos_procurados_bolo ||
			s.servicos_procurados_outros || s.servicos_procurados_decoracao || s.servicos_procurados_animacao)  {
	  		s.tem_servicos=true;
	  	}else{
	  		s.tem_servicos=false;	  		
	  	}	


		console.log("solic "+JSON.stringify(s));
	  	return s;
  	},

	
});


Template.solic.events({	

	'click  #buttonEnviarOrcamento': function(e,t) {
	    e.preventDefault();


		var elArray = $("*[name^='orc_']");
		o={};
		for (var a = 0; a< elArray.length;a++)
		{
			
			o[elArray[a].id.replace('orc_', '')]=elArray[a].value;
			console.log("N "+a+" "+elArray[a].id+" value "+elArray[a].value);

		}

		//o.tem_local=(o.local_valor!="")?true:false;
		//o['tem_salgados']=(o[salgados_valor]!="")?true:false;
		/*o[tem_docesl]=(o[doces_valor]!="")?true:false;
		o[tem_bolo]=(o[bolo_valor]!="")?true:false;
		o[tem_decoracao]=(o[decoracao_valor]!="")?true:false;
		o[tem_animacao]=(o[animacao_valor]!="")?true:false;
		o[tem_outros]=(o[outros_valor]!="")?true:false;		
*/
		o.data_cadastro= new Date().toDateString();
		console.log("orcamento "+JSON.stringify(o));	
	

		Meteor.call("fazerOrcamento", o, function(err,result){
			console.log("Resultado "+JSON.stringify(result));
			//ga('send', 'event', 'solicOrcamento', 'cadastro', 'erro', 1);		
			if(result){
				Router.go('orcamento_cadastrado', {_id: result});
			}else{
			//	ga('send', 'event', 'erro', 'cadastro', 'erro', 1);		
			  	alert('Erro ao enviar orçamento.');
			}	
		});
	}

});

