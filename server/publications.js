    Meteor.publish('collections', function(){

    	//TODO:  needs to by limited by organiztion, OR limited by current user.
    	//so we need to add these properties to the collection
        var currentUserId = this.userId; //currently logged in user. syntax is different when used on the client (Meteor.userId())
        //return Collections.find({organization: organizationId})
        return Collections.find();
    });

    Meteor.publish('organizations', function() {
    	return Organizations.find();
    });


	Meteor.publish('organizationsUsers', function(org) {
	    var organization = profile.organization;
	    //http://stackoverflow.com/questions/27299994/meteor-users-find-not-returning-in-publish
	    // this is not quite right:
	    return Meteor.users.find({}, {$match:{organization: 'Company A'}});
	}); 

	Meteor.publish('users', function() {
		return Meteor.users.find();
	});

	// in server/publish.js
	Meteor.publish(null, function (){ 
	  return Meteor.roles.find({});
	});
