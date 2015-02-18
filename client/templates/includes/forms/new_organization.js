Template.newOrganizationForm.events({
	'submit form': function(e) {
		e.preventDefault();

		var displayName =  e.target.displayName.value;
		var accountCode = e.target.accountCode.value;

		Meteor.call('addNewOrganization', displayName, accountCode, function(error, result) {

			console.log('success');
			AppMessages.throw('new organization created', 'success');
			e.target.displayName.value = '';

		});
		
	}

});