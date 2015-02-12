Meteor.methods({

	addNewOrganization: function(name, accountCode) {

		Organizations.insert({
			name: name,
			accountCode: accountCode
		});

	}
});