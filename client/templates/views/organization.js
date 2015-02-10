Template.organization.helpers({
	user: function() {
		//var orgName = Organizations.findOne(org.name);
		//return Meteor.users.find({organization: orgName});
		return Meteor.users.find({}, {$match:{organization: 'Company A'}});
	}
});