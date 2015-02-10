Template.admin.helpers({
	user: function() {
		console.log(Meteor.users.find().count());

		return Meteor.users.find();
	}
});