Meteor.methods({

	accountInfoInsert:function(displayName, role) {
		var userId = Meteor.user()._id;
		Meteor.users.update({_id:userId}, {$set:{"profile.name":displayName}});

		Roles.setUserRoles(userId, role);

		//users.update(userId, {$set: {name: displayName} } );
	},
	addNewUser: function(email, profile) {

	    var userId = Accounts.createUser({email: email, password: 'asdfasdf', profile: profile});
    	Accounts.sendEnrollmentEmail(userId);

	}
});