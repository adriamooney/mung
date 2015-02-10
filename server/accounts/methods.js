Meteor.methods({

	accountInfoInsert:function(displayName, role) {
		var userId = Meteor.user()._id;
		Meteor.users.update({_id:userId}, {$set:{"profile.name":displayName}});

		Roles.setUserRoles(userId, role);

		//users.update(userId, {$set: {name: displayName} } );

	}
});