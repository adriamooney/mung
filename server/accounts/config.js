Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  console.log(options.profile);

  if (options.profile)
    user.profile = options.profile;
   
    var org = Organizations.findOne({name: 'Individual Users'});

    var role = ['user'];
    user.roles = role;
    user.profile.accountStatus = 'active';
    

    if(!options.profile.orgName) {

      user.profile.orgName = org.name;
      user.profile.orgId = org._id;
      user.profile.accountCode = 1;
    }

  return user;
});



