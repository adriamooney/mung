Template.organization.helpers({
	user: function() {
		var orgId = this._id;
		//var orgId = Organizations.findOne();
		//TODO; 'COMPANY A' must be dynamic with an id that matches the current organization's id
		return Meteor.users.find({'profile.orgId': orgId});
	}
});


Template.organization.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var email = e.target.email.value;
			
		var profile = {
			name :  e.target.displayName.value,
			orgId : e.target.orgId.value,
			orgName : e.target.orgName.value

		}

		Meteor.call('addNewUser', email, profile, function(error, result) {

			console.log('success');
			AppMessages.throw('New user created. User has been sent an email to set a password', 'success');

			e.target.email.value = '';
			e.target.displayName.value = '';


		}); 
		
	}
});