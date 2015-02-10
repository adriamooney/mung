Template.account.events({
	'submit form': function(e) {
		e.preventDefault();

		var displayName =  e.target.displayName.value;

		var role = e.target.role.value;

		//client side validation.  we can also use this function on the server
		// see lib/collections/posts.js
		//var errors = validatePost(post);
		//if(errors.title || errors.url)
			//return Session.set('postSubmitErrors', errors);

		Meteor.call('accountInfoInsert', displayName, role, function(error, result) {

			/*if(error)
				return throwError(error.reason);

			if(result.postExists) //postExists is returned if postWithSameLink is true
				throwError('This link has already been posted'); */
			console.log('success');
			AppMessages.throw('your account was updated', 'success');
			Router.go('/');

		});
		
	}

});

Template.account.helpers({
	getAllRoles: function() {
		return Meteor.roles.find();
	},
	getRole: function() {
		var id = Meteor.userId();
		var user = Meteor.users.findOne({_id:Meteor.userId()});
		return user.roles[0];
	}
});

//http://stackoverflow.com/questions/23507384/adding-more-fields-to-meteor-user-accounts

// Meteor.users.update({_id:Meteor.user()._id}, { $set: {what you want to update} });
