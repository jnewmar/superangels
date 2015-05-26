Template.home.rendered = function(){
	this.autorun(function () {
		$('.parallax').parallax();   	 	
   	});

}

Template.home.events({	
	'click #solic_orcamento' : function(e) {
		GAnalytics.event("CLICK_SOLIC_ORC_HOME",document.getElementById('email_contato').value);
          	    
	},	
});	