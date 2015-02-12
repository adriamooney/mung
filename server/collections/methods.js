Meteor.methods({

	addNewCollection: function(info) {

      Collections.insert(info);

	}
});