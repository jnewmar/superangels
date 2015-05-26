Template.layout.helpers({
	getRouteName: function() {
	  	return Router.current().route.getName();
  	},
  	tem_menu:function() {
  		if(Router.current().route.getName() == "landing" || Router.current().route.getName() == "landing1"){
	  		return false;
  		}else{
	  		return true;
  		}


  	},

 });