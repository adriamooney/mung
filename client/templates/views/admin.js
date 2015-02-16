Template.admin.helpers({
	user: function() {
		return Meteor.users.find();
	},
	organization: function() {
		return Organizations.find();
	},
	plan: function() {
		return AccountPlans.find();
	},
	orgPlan: function() {
		var plans = AccountPlans.find().fetch();
		var accountCode = this.accountCode;
		var planName;
		_.each(plans, function(plan) {
		
			if (plan.code == accountCode) {
				planName = plan.name;
			}

		});

		return planName;
	}
});

/*Template.admin.events({
	'click .org-name': function(e) {
		e.preventDefault();
		console.log(this);
	}
}); */

