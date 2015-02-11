Meteor.methods({

	addNewOrganization: function(name) {

		Organizations.insert({
			name: name
		});

	}
});