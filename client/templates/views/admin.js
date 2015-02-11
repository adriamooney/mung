Template.admin.helpers({
	user: function() {
		return Meteor.users.find();
	},
	organization: function() {
		return Organizations.find();
	}
});

