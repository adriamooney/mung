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