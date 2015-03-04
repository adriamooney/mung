//In Meteor, the var keyword limits the scope of an object to the current file. 
//Here, we want to make the Posts collection available to our whole app, 
//which is why we're not using the var keyword.

Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

//We're taking the fieldNames array that contains a list of the fields being modified, and using Underscore's without() Method to return a sub-array containing the fields that are not url or title.

//If everything's normal, that array should be empty and its length should be 0. If someone is trying anything funky, that array's length will be 1 or more, and the callback will return true (thus denying the update).
Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

//why do we use global variables? is that ok?
validatePost = function(post) {
	var errors = {};
	if(!post.title)
		errors.title = 'Please fill in headline';
	if(!post.url)
		errors.url = 'Please fill in URL';
	return errors;
}



Meteor.methods({

	postInsert: function(postAttributes) {
		/*check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		}); */

		var errors = validatePost(postAttributes);
		if(errors.title || errors.url)
			throw new Meteor.Error('invalid-post', 'You must set a title and URL for your post');


		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if(postWithSameLink) {
			return {  //if the url is a duplicate, the method returns here so doesn't do the insert, 'thus elegantly preventing duplicates'
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		var postId = Posts.insert(post);
		return {
			_id: postId  //why are we doing this? 
		};
	}
});

