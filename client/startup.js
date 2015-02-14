Meteor.startup(function () {

//https://github.com/tomitrescak/meteor-uploads/blob/master/client/init.js#L2-L10
  Uploader.finished = function(index, file_info) {
      // FOR SOME STUPID FUCKING REASON
      // UPLOADER.FINISHED PLACES THE FILE INFO AS THE SECOND VARIABLE
      // IN THIS FILE AND ON THE SERVER/STARTUP.JS IT'S THE FIRST VARIABLE. 

    var user_id = Meteor.userId();
    var user = Meteor.users.findOne({_id: user_id});
    file_info.user_id = user_id;
    file_info.org_id = user.orgId;
    file_info.org_name = user.orgName;
    file_info.dt_added = new Date();
    	
    Meteor.call('convert_CSV', file_info);

  }

});

