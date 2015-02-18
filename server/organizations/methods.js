Meteor.methods({

	addNewOrganization: function(name, accountCode) {

		Organizations.insert({
			name: name,
			accountCode: accountCode
		});

	},
	changeOrgPlan: function(id, accountCode) {
		Organizations.update({_id: id}, {$set: {accountCode: accountCode, stripePlan: 'active'}});
	}
});