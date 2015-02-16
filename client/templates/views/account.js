Template.account.events({
	'submit form': function(e) {
		e.preventDefault();

		var displayName =  e.target.displayName.value;

		var role = e.target.role.value;

		//client side validation.  we can also use this function on the server
		// see lib/collections/posts.js
		//var errors = validatePost(post);
		//if(errors.title || errors.url)
			//return Session.set('postSubmitErrors', errors);

		Meteor.call('accountInfoInsert', displayName, role, function(error, result) {

			/*if(error)
				return throwError(error.reason);

			if(result.postExists) //postExists is returned if postWithSameLink is true
				throwError('This link has already been posted'); */
			console.log('success');
			AppMessages.throw('your account was updated', 'success');
			//Router.go('/');

		});
		
	},
	'change #accountStatus': function(e) {

		var checked = e.currentTarget.checked;
		
		var accountStatus = this.profile.accountStatus;
		var id = this._id;
		if(checked == true) {
			console.log('checked');
			Meteor.call('updateAccountStatus', id, 'active');
			
		}
		else {
			console.log('unchecked');
			Meteor.call('updateAccountStatus', id, 'inactive');
		}
		console.log(this);
	}

});

Template.account.rendered = function() {
    //console.log(this.data); // you should see your passage object in the console
    //use the router to get the user's id
    var r = Router.current().url;
	var a = r.split('/');
	var id = a.pop();
	var user = Meteor.users.findOne({_id:id});

    Session.set('user', user);
};

Template.account.helpers({
	getAllRoles: function() {
		return Meteor.roles.find( { name: { $not: 'superadmin' } });
	},
	getSuperAdmin: function() {
		var superadmin = Meteor.roles.findOne( { name: 'superadmin' });
		return superadmin.name;
	},
    isChecked: function(context) {
    	var user = Session.get('user');

    	if (this.name == user.roles[0]) {
    		return true;
    	}
    },
    isCheckedAdmin: function() {
    	var user  = Session.get('user');

    	if (this.roles[0] == 'superadmin') {
    		return true;
    	}
    },
    getPlan: function() {
    	var user = Session.get('user');
    	var plans = AccountPlans.find().fetch();
    	// QUESTION, is it bad to make more than one database request on the page for the same exact thing?  is there a better way to do this?
    	// (see how isCheckedAdmin above also requests the user)
		var accountCode = user.profile.accountCode;

		var planName;
		_.each(plans, function(plan) {
		
			if (plan.code == accountCode) {
				planName = plan.name;
			}

		});

		return planName;
    },
    activeStatus: function() {
    	var status = this.profile.accountStatus;
    	if(status == 'active') {
    		return true;
    	}
    	else {
    		return false;
    	}
    }

});




//http://stackoverflow.com/questions/23507384/adding-more-fields-to-meteor-user-accounts

// Meteor.users.update({_id:Meteor.user()._id}, { $set: {what you want to update} });
