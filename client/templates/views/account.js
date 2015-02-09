Template.account.events({
	'submit form': function(e) {
		e.preventDefault();

		var displayName =  e.target.displayName.value;

		//client side validation.  we can also use this function on the server
		// see lib/collections/posts.js
		//var errors = validatePost(post);
		//if(errors.title || errors.url)
			//return Session.set('postSubmitErrors', errors);

		Meteor.call('accountInfoInsert', displayName, function(error, result) {

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