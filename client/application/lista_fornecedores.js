Template.lista_fornecedores.helpers({
	getListaFornecedores: function(tp) {
		

		fo1=[];
		fo=Meteor.users.find({ roles : { $in: ["FORNECEDOR"] } }, {sort : {createdAt: -1}});
		fo.forEach(function (f,i) {

			f.json=JSON.stringify(f, null, 4);
		
	
			fo1.push(f);
			return f;
        });   	


	  	return fo1;


  	},
 });

Template.lista_fornecedores.events({	



	'click .abrirModalLogin' : function(e) {
		    e.preventDefault();
  			$("#modal"+e.target.id).openModal();
          ;		    
	},	
	'click .fecharModalLogin' : function(e) {
	    e.preventDefault();
  		$("#modal"+e.target.id).closeModal();
  	},	
   });