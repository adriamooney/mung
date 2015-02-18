Meteor.publish('collections', function(){

    //TODO:  needs to by limited by organiztion, OR limited by current user.
    var currentUserId = this.userId; //currently logged in user. syntax is different when used on the client (Meteor.userId())
       
    var user = Meteor.users.findOne({_id: this.userId});
    console.log(currentUserId);
    var orgId = user.profile.orgId;

    return Collections.find({orgId: orgId});

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


//ALLOW / DENY RULES

//https://dweldon.silvrback.com/common-mistakes
Meteor.users.deny({
  update: function() {
    return true;
  }
});

// http://stackoverflow.com/questions/19391308/custom-fields-on-meteor-users-not-being-published