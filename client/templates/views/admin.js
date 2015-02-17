Template.plans.helpers({
	plan: function() {
		return AccountPlans.find();
	}
	
});

Template.orgAccountPlan.helpers({
	orgAccountPlan: function() {
		var plans = AccountPlans.find().fetch();
		var accountCode = this.accountCode;
		var planName;
		_.each(plans, function(plan) {
		
			if (plan.code == accountCode) {
				planName = plan.name;
			}

		});

		return planName;
	}
});

Template.orgTable.helpers({
	orgCollection: function() {
		return Organizations.find();
	},
	settings: function() {
		return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
            { 
            	key: 'name', 
            	label: 'Name',
            	fn: function(value, object){ 
            		return new Spacebars.SafeString('<a href="/organization/'+object._id+'">' +value+ '</a>'); 
            	}  

            },
    		{ key: 'orgAccountPlan', label: 'Account Plan', tmpl: Template.orgAccountPlan }

            ]
        };
	}
});

Template.userTable.helpers({
	userCollection: function() {
		//why is the sort not working?
		return Meteor.users.find({}, { sort: { 'profile.name': -1 }}); 
	},
    settings: function () {

        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
            { 
            	key: 'profile.name', 
            	label: 'Name',
            	fn: function(value, object){ 
            		return new Spacebars.SafeString('<a href="/account/'+object._id+'">' +value+ '</a>'); 
            	} 

            },
    		{ key: 'emails.0.address', label: 'Email' },
    		{ key: 'profile.orgName', label: 'Organization' },
    		{ key: 'profile.accountStatus', label: 'Account Status' },
    		{ key: 'roles.0', label: 'User Type' },
    		{ 
    			key: '_id', 
    			label: 'Delete', 
    			fn: function(value, object){ 
            		return new Spacebars.SafeString('<i class="delete fa fa-trash" data-id="'+value+'"></i>'); 
            	}
    		}

            ]
        };
    }
});

Template.userTable.events({
	'click .delete': function(e) {
		e.preventDefault();
		var id = e.currentTarget.dataset.id;
		Meteor.call('deleteUser', id, function() {
			AppMessages.throw('User has been deleted.', 'info');
		});
	}
});

//              	'profile.name', 'emails.[0].address', 'profile.orgName', 'roles.[0]', 'profile.accountStatus'