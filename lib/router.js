






Router.configure({
  layoutTemplate: 'layout' ,
  notFoundTemplate: 'notFound',
  waitOn: function() { 
	
  	//res=GAnalytics.pageview(Router.current().route.getName());
  	//console.log("GA  "+Router.current().route.getName()+" "+JSON.stringify(res));	
    return [ //Meteor.subscribe('alimentos')
	//,Meteor.subscribe('listaUsuarios')
	]
  },
  yieldTemplates: {
    'footer': {to: 'footer'},
    'header': {to: 'header'}
    }
});

Router.onRun(function() {
  	res=GAnalytics.pageview(Router.current().route.getName());
    this.next();

});
Router.map(function() {

	this.route('home_meteor', {
		path: '/home',
		template: 'home'
	});

	this.route('landing', {
		path: '/landing',
		template: 'landing'
	});

	this.route('landing1', {
		path: '/landing1',
		template: 'landing1'
	});
	
	this.route('/solic_convite', {
		path: '/solic_convite',
		template: 'solic_convite',
		
	});	
	this.route('/solic_convite_cadastrado', {
		path: '/solic_convite_cadastrado',
		template: 'solic_convite_cadastrado',
		
	});	

	this.route('admin', {
		path: '/admin',
		template: 'admin'		
	});

	this.route('lista_solic_convite', {
		path: '/admin/lista_solic_convite',
		template: 'lista_solic_convite',
		 waitOn: function() { 
		    return [ Meteor.subscribe('solic_convite')
			]
		  },
		
	});	
	this.route('lista_fornecedores', {
		path: '/admin/lista_fornecedores',
		template: 'lista_fornecedores',
		waitOn: function() { 
		    return [ Meteor.subscribe('listaFornecedores' )
			]
		  },
	});


	this.route('login', {
		path: '/login',
		template: 'login'
	});


	this.route('dashboard', {
		path: '/dashboard',
		template: 'dashboard',
	});

	this.route('lista_clientes', {
		path: '/lista_clientes',
		template: 'lista_clientes',
		waitOn: function() { 
		    return [ Meteor.subscribe('listaClientes' )
			]
		  },
	});



	this.route('lista_pre_fornecedores', {
		path: '/lista_pre_fornecedores',
		template: 'lista_pre_fornecedores'
	});

	this.route('cad_pre_fornecedor', {
		path: '/cad_pre_fornecedor',
		template: 'cad_pre_fornecedor'
	});



	this.route('solic_cadastrada', {
		path: '/solic_cadastrada/:_id',
		template: 'solic_cadastrada',
		waitOn: function() { 
		    return [  Meteor.subscribe('solicOne', this.params._id),
		     Meteor.subscribe('solicServicos', this.params._id,this.params.query.tipo )
			]
		  },
		
	});		

	this.route('ver_detalhes_solic', {
		path: '/ver_detalhes_solic/:_id',
		template: 'ver_detalhes_solic',
		  waitOn: function() { 
		    return [  Meteor.subscribe('solicOne', this.params._id),
		     Meteor.subscribe('solicServicos', this.params._id,this.params.query.tipo )
			]
		  },
		
	});	
	this.route('ver_solic', {
		path: '/ver_solic/:_id',
		template: 'ver_solic',
		  waitOn: function() { 

			//console.log("GET "+JSON.stringify(this.params.query));
		    return [ 
		    Meteor.subscribe('buscaOneUser',this.params.query.id_cliente),
		     Meteor.subscribe('solicOne', this.params._id),
		      Meteor.subscribe('solicServicos', this.params._id,this.params.query.tipo )
			]
		  },
		
	});	

	this.route('ver_solic_deslogado', {
		path: '/ver_solic_deslogado/:_id',
		template: 'ver_solic_deslogado',
		  waitOn: function() { 			
		    return [  Meteor.subscribe('solicOne', this.params._id),
		    Meteor.subscribe('buscaOneUser',this.params.query.id_cliente),
		    Meteor.subscribe('solicServicos', this.params._id,this.params.query.tipo )
			]
		  },
		
	});

	this.route('ver_orcamento', {
		path: '/ver_orcamento/:_id',
		template: 'ver_orcamento',
		 waitOn: function() { 
		    return [ 
    			Meteor.subscribe('orcamentosDaSSR', this.params.query.id_ssr) ,
				Meteor.subscribe('solicOne', this.params._id),
				Meteor.subscribe('buscaOneUser',this.params.query.id_cliente),
				Meteor.subscribe('solicServicos', this.params._id,this.params.query.tipo ),
			

			]			
		  },
		
	});	


	this.route('ver_orcamento_cliente', {
		path: '/ver_orcamento_cliente/:_id',
		template: 'ver_orcamento_cliente',
		 waitOn: function() { 
		    return [ 
    			Meteor.subscribe('orcamentosDaSSR', this.params.query.id_ssr) ,
				Meteor.subscribe('solicOne', this.params._id),
				Meteor.subscribe('buscaOneUser',this.params.query.id_fornecedor),
				Meteor.subscribe('solicServicos', this.params._id,this.params.query.tipo ),
			

			]			
		  },
		
	});	


	this.route('lista_orcamentos_cliente', {
		path: '/lista_orcamentos_cliente/:_id',
		template: 'lista_orcamentos_cliente',
		 waitOn: function() { 
		    return [ 
				Meteor.subscribe('solicOne', this.params._id),
		     Meteor.subscribe('orcamentosDaSolic', 
		     	this.params._id),Meteor.subscribe('listaFornecedores') 

			]			
		  },
		
	});	
	this.route('logout', {
		path: '/logout',
		template: 'logout',
		  waitOn: function() { 
		    return  Meteor.logout();
			
		  },
		
	});	


	this.route('solic', {
		path: '/solic/:_id',
		template: 'solic',
		  waitOn: function() { 
		    return [ Meteor.subscribe('solicOne', this.params._id)
			]
		  },
		
	});	


	this.route('fornecedor_cadastrado', {
		path: '/fornecedor_cadastrado',
		template: 'fornecedor_cadastrado',
		
	});
	this.route('usuario_cadastrado', {
		path: '/usuario_cadastrado',
		template: 'usuario_cadastrado',
		
	});		
	this.route('orcamento_cadastrado', {
		path: '/orcamento_cadastrado',
		template: 'orcamento_cadastrado',
		
	});	

	this.route('lista_solic_url', {
		path: '/lista_solic_url',
		template: 'lista_solic_url',
		 waitOn: function() { 
		    return [ Meteor.subscribe('solic'),Meteor.subscribe('listaClientes')
			]
		  },
		
	});	

		
	this.route('lista_solic', {
		path: '/lista_solic',
		template: 'lista_solic',
		 waitOn: function() { 
		    return [ Meteor.subscribe('solic'),Meteor.subscribe('listaClientes')
			]
		  },
		
	});	

	this.route('lista_solic_recebidas', {
		path: '/lista_solic_recebidas',
		template: 'lista_solic_recebidas',
		 waitOn: function() { 
		    return [ Meteor.subscribe('solicServicosRecebidos'),Meteor.subscribe('listaClientes')
			]
		  },
		
	});


	this.route('lista_solic_cliente', {
		path: '/lista_solic_cliente',
		template: 'lista_solic_cliente',
		 waitOn: function() { 
		    return [ Meteor.subscribe('solic')
			]
		  },
		
	});	


	this.route('orcamento', {
		path: '/orcamento',
		template: 'cad_solic',
		
	});




	this.route('/cad_solic', {
		path: '/cad_solic',
		template: 'cad_solic',
		
	});		

	this.route('cad_usuario', {
		path: '/cad_usuario',
		template: 'cad_usuario',
		
	});		

	this.route('cad_fornecedor', {
		path: '/cad_fornecedor',
		template: 'cad_fornecedor',
		
	});		


});	
		
	WebApp.connectHandlers
		.use(function(req, res, next) {
	     if (req.url == '/') {
	      // 307 Temporary Redirect
	      res.writeHead(307, {
	        'Location': 'http://lp1.superangels.com.br/' 
	      });
	      res.end();
	    } else {
	      // Let other handlers match
	      console.log("PAGE "+req.url);
	      next();

	    }
	  });


var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    	//Router.go('login');
      this.render('login');
    }
  } else {
    this.next();
  }
}

var requireAdmin = function() {

  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
	this.render(this.loadingTemplate);
    } else {
      this.render('login');
    }
  } else { 
    if (Roles.userIsInRole(Meteor.user(), ['ADMIN'])) {
			this.next();
		}	
		else{
			this.render('accessDenied');
		}
  } 
}

var requireFornecedor = function() {

  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
		this.render(this.loadingTemplate);
    } else {
    	//Router.go('login');
     	this.render('login');
    }
  } else { 
    if (Roles.userIsInRole(Meteor.user(), ['FORNECEDOR'])) {
			this.next();
		}	
		else{
			this.render('accessDenied');
		}
  } 
}

var requireCliente = function() {

  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
		this.render(this.loadingTemplate);
    } else {
    	//Router.go('login');
     	this.render('login');
    }
  } else { 
    if (Roles.userIsInRole(Meteor.user(), ['CLIENTE'])) {
			this.next();
		}	
		else{
			this.render('accessDenied');
		}
  } 
}

Router.onBeforeAction(requireFornecedor, {only: ['ver_solic']});
Router.onBeforeAction(requireCliente, {only: ['ver_orcamento_cliente']});


//Router.onBeforeAction(requireAdmin, {only: ['usuarios']});
//Router.onBeforeAction(requireLogin, {except: ['ver_solic_deslogado','login','home_meteor','cad_solic','cad_usuario','cad_fornecedor']});