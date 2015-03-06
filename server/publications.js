Meteor.publish('datasetsummary', function(){
   
    var currentUserId = this.userId; //currently logged in user. syntax is different when used on the client (Meteor.userId())
       
    var user = Meteor.users.findOne({_id: this.userId});
    console.log(currentUserId);
    var orgId = user.profile.orgId;
    console.log(orgId);

    //if user is part of this organization, which they are set by default upon signing up, then only show their own data sets
    if(user.profile.orgName == 'Individual Users') {
      return DataSetSummary.find({uploadedBy: currentUserId});
    }//otherwise limit collections to those in the organization
    else {
      return DataSetSummary.find({orgId: orgId});
      //return DataSetSummary.find();
    }
    

});

//TODO: THIS NEEDS TO BE LIMITED LIKE TEH ABOVE 'DATASETSUMMARY'
Meteor.publish('datasetdata', function(){
    return DataSetData.find();
});

Meteor.publish('organizations', function() {
	return Organizations.find();
});

Meteor.publish('userOrg', function(orgId) {
  return Organizations.find({_id: orgId});
});


Meteor.publish('organizationsUsers', function(orgId) {
    return Meteor.users.find({'profile.orgId': orgId});

}); 

Meteor.publish('users', function() {
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1, username:1, roles: 1}});
});

Meteor.publish('user', function(id) {
    return Meteor.users.findOne({_id: id}, {fields: {emails: 1, profile: 1, username:1, roles: 1}});
});

// in server/publish.js
Meteor.publish(null, function (){ 
    return Meteor.roles.find({});
});

Meteor.publish('accountplans', function() {
	return AccountPlans.find();
});

Meteor.publish('posts', function() {
  return Posts.find();  
});


//ALLOW / DENY RULES

//https://dweldon.silvrback.com/common-mistakes
Meteor.users.deny({
  update: function() {
    return true;
  }
});

// http://stackoverflow.com/questions/19391308/custom-fields-on-meteor-users-not-being-published