Meteor.methods({

	accountInfoInsert:function(displayName) {
		Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.name":displayName}});
		users.update(userId, {$set: {name: displayName} } );

	}
});