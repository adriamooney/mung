Template.stripeForm.events({
	'submit #stripe-form': function (e) {
		e.preventDefault();
		// make sure there is a Meteor.user() or wrap the following inside the Meteor.createUser callback function
		var easy = StripeEasy.submitHelper(e);
		//var plan_id = "STRIPE_PLAN_ID"; // set however you want, via Session variable or a part of the form.
		var plan_id = 'accountplan-2'; //need to get this for real, not hard coded.
		StripeEasy.subscribe(easy, plan_id, function(err, result){
			
		if(err){
			Session.set('stripeEasyError', err); // show error to user
		}
		else {
			// if no error, will return the newly created customer object from Stripe
			$('#stripe-form').html('You are now subscribed to the' +result.subscriptions.data[0].plan.name+ 'account plan.');
			var userId = Meteor.userId();
			Meteor.call('updatePlan', userId, plan_id);
		}
			
		});

	}
});