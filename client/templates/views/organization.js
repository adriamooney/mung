Template.organization.helpers({
	user: function() {
		var orgId = this._id;
		return Meteor.users.find({'profile.orgId': orgId});
	},
	plan: function() {
		var plans = AccountPlans.find().fetch();
		var accountCode = this.accountCode;
		var planName;
		_.each(plans, function(plan) {
		
			if (plan.code == accountCode) {
				planName = plan.name;
			}

		});

		return planName;
	},
	userPlan: function() {
		//this should be the same as organization level plan, but in case we decide to make these diverge, making it a separate helper
		//most of this code is duplicated in account.js getPlan
		var plans = AccountPlans.find().fetch();
		var accountCode = this.profile.accountCode;
		var planName;
		_.each(plans, function(plan) {
		
			if (plan.code == accountCode) {
				planName = plan.name;
			}

		});

		return planName;
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