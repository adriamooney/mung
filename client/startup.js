Meteor.startup(function () {

//https://github.com/tomitrescak/meteor-uploads/blob/master/client/init.js#L2-L10
  Uploader.finished = function(index, file_info) {
      // FOR SOME STUPID FUCKING REASON
      // UPLOADER.FINISHED PLACES THE FILE INFO AS THE SECOND VARIABLE
      // IN THIS FILE AND ON THE SERVER/STARTUP.JS IT'S THE FIRST VARIABLE. 

    var user_id = Meteor.userId();
    var user = Meteor.users.findOne({_id: user_id});
    console.log(user);
    file_info.user_id = user_id;
    file_info.org_id = user.profile.orgId;
    file_info.org_name = user.profile.orgName;
    file_info.dt_added = new Date();
    console.log(file_info);	
    Meteor.call('convert_CSV', file_info);

  }

  //TODO: MOVE this to global-helpers.js !!!  or to some other place...it doesn't work here
  /*
  var fetchAccountPlans = AccountPlans.find().fetch();
  Session.set('allAccountPlans', fetchAccountPlans);
  var allAccountPlans = Session.get('allAccountPlans');

  var getPlanName = function(accountCode) {
    var planName;
    _.each(allAccountPlans, function(plan) {
    
      if (plan.code == accountCode) {
        planName = plan.name;
      }

    });
    return planName;
  } */


});

