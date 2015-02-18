
Template.registerHelper('mung_getPlanName', function() {
		var allAccountPlans = AccountPlans.find().fetch();
		//var allAccountPlans = Session.get('allAccountPlans');
		var accountCode = this.accountCode;
		var planName;
	    _.each(allAccountPlans, function(plan) {
	    
	      if (plan.code == accountCode) {
	        planName = plan.name;
	      }

	    });
	    return planName;
});


Template.registerHelper('mung_getPlanName_user', function() {
		var allAccountPlans = AccountPlans.find().fetch();
		//var allAccountPlans = Session.get('allAccountPlans');
		var accountCode = this.profile.accountCode;
		var planName;
	    _.each(allAccountPlans, function(plan) {
	    
	      if (plan.code == accountCode) {
	        planName = plan.name;
	      }

	    });
	    return planName;
});

Template.registerHelper('mung_getPlans', function() {
	return AccountPlans.find().fetch();
});