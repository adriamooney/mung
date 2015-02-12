Template.admin.helpers({
	user: function() {
		return Meteor.users.find();
	},
	organization: function() {
		return Organizations.find();
	},
	plan: function() {
		return AccountPlans.find();
	}
});

/*Template.admin.events({
	'click .org-name': function(e) {
		e.preventDefault();
		console.log(this);
	}
}); */

