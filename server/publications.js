    Meteor.publish('collections', function(){

        var currentUserId = this.userId; //currently logged in user. syntax is different when used on the client (Meteor.userId())
        //return Collections.find({createdBy: currentUserId})
        return Collections.find();
    });