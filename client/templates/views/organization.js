Template.organization.helpers({
	user: function() {
		var orgId = this._id;
		return Meteor.users.find({'profile.orgId': orgId});
	},
	plan: function() {
		var plans = AccountPlans.find().fetch();
		var accountCode = this.accountCode;

		_.each(plans, function(plan) {

			if (plan.code == accountCode) {
				var planName = plan.name;
				console.log(planName);
				//return planName;
				//TODO: this is not working
				return PlanName;
			}


		});



	}
});


Template.organization.events({

	//Add New User to organization
	'submit form': function(e) {
		e.preventDefault();
		
		var email = e.target.email.value;
			
		var profile = {
			name :  e.target.displayName.value,
			orgId : e.target.orgId.value,
			orgName : e.target.orgName.value,
			accountStatus: 'active',
			accountCode: e.target.accountCode.value

		}

		Meteor.call('addNewUser', email, profile, function(error, result) {

			console.log('success');
			AppMessages.throw('New user created. User has been sent an email to set a password', 'success');

			e.target.email.value = '';
			e.target.displayName.value = '';


		}); 
		
	}
});