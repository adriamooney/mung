Template.admin.helpers({
	user: function() {
		return Meteor.users.find();
	},
	organization: function() {
		return Organizations.find();
	}
});

/*Template.admin.events({
	'click .org-name': function(e) {
		e.preventDefault();
		console.log(this);
	}
}); */

