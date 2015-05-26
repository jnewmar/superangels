

 Template.lista_orcamentos_cliente.rendered = function(){
	this.autorun(function () {
    $('.collapsible').collapsible();
		

 	});
}




Template.lista_orcamentos_cliente.helpers({

	'active' : function(tipo){
		if(Router.current().params.query.tipo!= undefined){
			tipo_selecionado=Router.current().params.query.tipo;
			
		}	

		if(tipo_selecionado==tipo){
			return "active";
		}
		
  	},

	
	'obj_solic' : function(){


		if(Router.current().params.query.tipo!= undefined){
			tipo=Router.current().params.query.tipo;
			
		}else{
			tipo="TUDO";
		}
		console.log("Tipo "+tipo);


		s=Solic.findOne({_id: Router.current().params._id});


		console.log("solic "+JSON.stringify(s));
	  	return s;
  	},
	getListaOrcamentos: function(tp) {	

		//console.log("TIPO "+tp);
		

		o=Orcamento.find(
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{ tipo : tp },
			]});
		oo=[];
		o.forEach(function (row) {
			row.fornecedor=Meteor.users.findOne({_id : row.id_fornecedor} );
			oo.push(row);
			console.log("orc "+JSON.stringify(oo));
        }); 
		
		return oo;

	},
	
	getQtdOrcamentos: function(tp) {	

		//console.log("TIPO "+tp);
		
		o=Orcamento.find(
			 { $and:[  
				{ id_solic : Router.current().params._id },
				{ tipo : tp },
			]});

		console.log("QTD "+o.count());
		
		return o.count();

	},
	
});


Template.lista_orcamentos_cliente.events({	


});		