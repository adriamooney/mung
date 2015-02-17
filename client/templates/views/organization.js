Template.organization.helpers({
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
	}

});

Template.orgPlan.helpers({
	orgPlan: function() {
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

Template.orgUsers.helpers({
	orgUsers: function() {
		var orgId = this._id;
		var name = 'profile.name';
		//WHY ISN'T THE SORT WORKING???
		return Meteor.users.find({'profile.orgId': orgId}, {sort: {name: 1}});
	},
    settings: function () {

        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
            { 
            	key: 'profile.name', 
            	label: 'Name',
            	sort: 'descending',
            	fn: function(value, object){ 
            		return new Spacebars.SafeString('<a href="/account/'+object._id+'">' +value+ '</a>'); 
            	} 

            },
    		{ key: 'emails.0.address', label: 'Email' },
    		{ key: 'profile.orgName', label: 'Organization' },
    		{ key: 'orgPlan', label: 'Account Plan', tmpl: Template.orgPlan },
    		{ key: 'roles.0', label: 'User Type' },
    		{ key: 'profile.accountStatus', label: 'Account Status' }

            ]
        };
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