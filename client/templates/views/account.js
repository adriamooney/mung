Template.account.events({
	'submit form': function(e) {
		e.preventDefault();

		var displayName =  e.target.displayName.value;

		var role = e.target.role.value;

		var id = this._id;

		var changeUser = document.getElementById("changeUserOrg");

		var orgName = $("#changeUserOrg :selected").text();

		var orgId = e.target.changeUserOrg.value;

		//client side validation.  we can also use this function on the server
		// see lib/collections/posts.js
		//var errors = validatePost(post);
		//if(errors.title || errors.url)
			//return Session.set('postSubmitErrors', errors);

		Meteor.call('accountInfoInsert', displayName, role, id, orgName, orgId, function(error, result) {

			console.log('success');
			AppMessages.throw('your account was updated', 'success');


		});
		
	},
	'change #accountStatus': function(e) {

		var checked = e.currentTarget.checked;
		
		var accountStatus = this.profile.accountStatus;
		var id = this._id;
		if(checked == true) {
			Meteor.call('updateAccountStatus', id, 'active');
			
		}
		else {
			Meteor.call('updateAccountStatus', id, 'inactive');
		}
		console.log(this);
	},
	// <!--Accounts.changePassword(oldPassword, newPassword, [callback])-->
	'click #change-password-toggle': function(e) {
		var pwDiv = $('#change-password-div');
		pwDiv.removeClass('hidden');
		var thisButton = e.currentTarget;
		$(thisButton).hide();
	},
	'click #cancel-change-password': function() {
		var pwDiv = $('#change-password-div');
		pwDiv.addClass('hidden');
		$('#change-password-toggle').show();
	},
	'click #change-password':function(e) {
		console.log(e.target);
		var oldPw = $('#currpassword').val();
		var newPw = $('#newpassword').val();
		Accounts.changePassword(oldPw, newPw, function(error) {
			if(error) {
				AppMessages.throw(error.reason, 'danger');
			}
			else {
				AppMessages.throw('Your password was updated', 'success');
				var pwDiv = $('#change-password-div');
				pwDiv.addClass('hidden');
				$('#change-password-toggle').show();
			}

		});
	}

});

Template.account.rendered = function() {
    //console.log(this.data); // you should see your passage object in the console
    //use the router to get the user's id
    //SOMETIMES THE USER IS UNDEFINED.  FIGURE OUT WHAT CAUSES THIS
    var r = Router.current().url;
	var a = r.split('/');
	var id = a.pop();
	var user = Meteor.users.findOne({_id:id});

    Session.set('accountPageUser', user);
};

Template.account.helpers({
	currentUserAccount: function() {
		var accountPageUser = Session.get('accountPageUser');
		var user = Meteor.userId();

		if (accountPageUser._id == user) {
			return true;
		}
	},
	getAllRoles: function() {
		return Meteor.roles.find( { name: { $not: 'superadmin' } });
	},
	getSuperAdmin: function() {
		var superadmin = Meteor.roles.findOne( { name: 'superadmin' });
		return superadmin.name;
	},
    isChecked: function(context) {
    	var user = Session.get('accountPageUser');

    	if (this.name == user.roles[0]) {
    		return true;
    	}
    },
    isCheckedAdmin: function() {
    	var user  = Session.get('accountPageUser');

    	if (this.roles[0] == 'superadmin') {
    		return true;
    	}
    },
    activeStatus: function() {
    	var status = this.profile.accountStatus;
    	if(status == 'active') {
    		return true;
    	}
    	else {
    		return false;
    	}
    },
    getAllOrgs: function() {
    	return Organizations.find();
    },
    userOrg: function() {
    	var user = Session.get('accountPageUser');

    	if(this.name == user.profile.orgName) {
    		return true;
    	}
    }

});




//http://stackoverflow.com/questions/23507384/adding-more-fields-to-meteor-user-accounts

// Meteor.users.update({_id:Meteor.user()._id}, { $set: {what you want to update} });
