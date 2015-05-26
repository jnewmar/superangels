Template.landing1.rendered = function(){
	this.autorun(function () {
		$('.parallax').parallax();   	 	
   	});

}

Template.landing1.events({	
	'click #solic_orcamento' : function(e) {
		GAnalytics.event("CLICK_SOLIC_ORC_HOME",document.getElementById('email_contato').value);
          	    
	},	
});	