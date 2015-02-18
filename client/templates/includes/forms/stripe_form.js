Template.stripeForm.events({
	'submit #stripe-form': function (e) {
		e.preventDefault();
		// make sure there is a Meteor.user() or wrap the following inside the Meteor.createUser callback function
		var easy = StripeEasy.submitHelper(e);
		//var plan_id = "STRIPE_PLAN_ID"; // set however you want, via Session variable or a part of the form.
		var plan_id = e.target.accountCode.value;
		StripeEasy.subscribe(easy, plan_id, function(err, result){

		if(err){
			Session.set('stripeEasyError', err); // show error to user
		}
		else {
			// if no error, will return the newly created customer object from Stripe
			$('#stripe-form').html('You are now subscribed to the ' +result.subscriptions.data[0].plan.name+ ' account plan.');
			var userId = Meteor.userId();
			var orgId = Meteor.user().profile.orgId;
			Meteor.call('changeOrgPlan', orgId, plan_id);
			Meteor.call('changeUserPlan', userId, plan_id);
		}
			
		}); 
	} 
});



Template.stripeForm.helpers({
	updatePlan: function() {
		var orgId = Meteor.user().profile.orgId;
		var org = Organizations.find({_id: orgId});
		if (org.stripePlan == 'active') {
			return true;
		}
		else {
			return false;
		}
	}	


});


/* or if they are already subscribed to a plan: use UPDATE

StripeEasy.update(plan_id, function(err, result){
  // result will be the updated subscription object from Stripe
});


*/
