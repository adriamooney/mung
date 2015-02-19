Meteor.methods({

	accountInfoInsert:function(displayName, role, id, orgName, orgId) {
		//var userId = Meteor.user()._id;
		Meteor.users.update({_id:id}, {$set:{"profile.name":displayName, 'profile.orgName': orgName, 'profile.orgId': orgId}});

		Roles.setUserRoles(id, role);

		//users.update(userId, {$set: {name: displayName} } );
	},
	addNewUser: function(email, profile) {

	    var userId = Accounts.createUser({email: email, password: 'asdfasdf', profile: profile});
    	Accounts.sendEnrollmentEmail(userId);

	},
	updateAccountStatus: function(id, accountStatus) {
		Meteor.users.update( {_id: id}, {$set: {'profile.accountStatus': accountStatus}});
	},
	deleteUser: function(id) {
		Meteor.users.remove(id);
	},
	changeUserPlan: function(id, accountCode) {
		Meteor.users.update( {_id: id}, {$set: {'profile.accountCode': accountCode, 'profile.stripePlan': 'active'}});
	},
	changeOrgUsersPlan: function(orgId, accountCode) {
		//update all users in an org to a new accountCode:
		Meteor.users.update( {'profile.orgId':orgId}, {$set: {'profile.accountCode': accountCode}}, {multi: true} );

	}
});

//{_id: {$in: [id1, id2, id3]}}