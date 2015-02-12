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

	//this doesn't work, I don't know why
	Meteor.publish('organizationsUsers', function() {
	    //return Meteor.users.find({'profile.orgId': user});
	}); 

	Meteor.publish('users', function() {
		return Meteor.users.find({}, {fields: {emails: 1, profile: 1, username:1, roles: 1}});
	});

	// in server/publish.js
	Meteor.publish(null, function (){ 
	  return Meteor.roles.find({});
	});

	Meteor.publish('accountplans', function() {
		return AccountPlans.find();
	});



// http://stackoverflow.com/questions/19391308/custom-fields-on-meteor-users-not-being-published