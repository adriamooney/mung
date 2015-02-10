Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
    //user.profile.accountType = 'user';
    var role = ['user'];
    user.roles = role;
    user.profile.accountStatus = 'active';

  return user;
});
