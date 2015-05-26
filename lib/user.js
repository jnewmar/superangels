

Meteor.methods({
  criaUsuario: function(user){	  
    
	id_usuario=Accounts.createUser(user);	
	Accounts.sendVerificationEmail(id_usuario);
	Meteor.call('sendEmail',
	        "william.mori@gmail.com",
            "william.mori@gmail.com",
            '[SUPERANGELS] Cliente Criado',
            'USUARIO '+JSON.stringify(user, null, 4));
    return id_usuario && Roles.addUsersToRoles(id_usuario, ["CLIENTE"]);

  },  
  criaFornecedor: function(user){	   	

	id_fornecedor=Accounts.createUser(user);	
	Accounts.sendVerificationEmail(id_fornecedor);
	Meteor.call('sendEmail',
	        "william.mori@gmail.com",
            "william.mori@gmail.com",
            '[SUPERANGELS] Fornecedor Criado',
            'FORNECEDOR '+JSON.stringify(user, null, 4));
    return id_fornecedor && Roles.addUsersToRoles(id_fornecedor, ["FORNECEDOR"]);
  },  



});