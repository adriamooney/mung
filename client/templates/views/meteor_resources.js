Template.meteorResources.created = function() {
	Session.set('postSubmitErrors', {});
};
Template.meteorResources.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.meteorResources.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: e.target.url.value,
			title: e.target.title.value
		};

		//client side validation.  we can also use this function on the server
		// see lib/collections/posts.js
		var errors = validatePost(post);
		if(errors.title || errors.url)
			return Session.set('postSubmitErrors', errors);

		Meteor.call('postInsert', post, function(error, result) {

			if(error) {
				console.log(error.reason);
			}
				
			console.log(result);
			//if(result.postExists) //postExists is returned if postWithSameLink is true
				//throwError('This link has already been posted');
				//return false;
				//console.log('link already exists');

			//Router.go('postPage', {_id: result._id}); //goes to the page which matches the existing url, by finding it's id (_id: postWithSameLink._id)
		});

		//post._id = Posts.insert(post);  //move this to thte method 
		
	}
});


Template.postsList.helpers({
  posts: function() {
  	var posts = Posts.find().fetch();
  	console.log(posts);
    return Posts.find({}, {sort: {title: 1}});
  }
});

Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  ownPost: function() {
  	// {{ownPost}} will be true of the current user maps to the userId property we created
  	return this.userId === Meteor.userId();
  }
});
