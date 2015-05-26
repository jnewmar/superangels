	
	
if (Meteor.users.find().count() === 0) {	
	
	id_adm = Accounts.createUser({
      email: "admin@powerfesta.com.br",
      password: "123456",
      profile: { name: "Admin User" , data_cadastro: new Date() }
    });
	Roles.addUsersToRoles(id_adm, ["ADMIN"]);

	
	/*id_will = Accounts.createUser({
      email: "william.mori@gmail.com",
      password: "123456",
      profile: { name: "William" , data_cadastro: new Date() }
    });
	Roles.addUsersToRoles(id_will, ["ADMIN"]);
*/

}