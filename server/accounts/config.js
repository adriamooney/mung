Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
   
	//account types: free, non-prof, business lite, enterprise 
	//account type should be associated with organization, not user right?
	//user types: user, admin, superadmin

    var role = ['user'];
    user.roles = role;
    user.profile.accountStatus = 'active';

  return user;
});
