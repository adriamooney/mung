Meteor.startup(function () {

//https://github.com/tomitrescak/meteor-uploads/blob/master/client/init.js#L2-L10
  Uploader.finished = function(index, file_info) {
      // FOR SOME STUPID FUCKING REASON
      // UPLOADER.FINISHED PLACES THE FILE INFO AS THE SECOND VARIABLE
      // IN THIS FILE AND ON THE SERVER/STARTUP.JS IT'S THE FIRST VARIABLE. 

    //https://atmospherejs.com/matteodem/server-session 
    //https://github.com/matteodem/meteor-server-session :
    ServerSession.set('csv_to_json_running', 'loading');

    var user_id = Meteor.userId();
    var user = Meteor.users.findOne({_id: user_id});
    console.log(user);
    file_info.user_id = user_id;
    file_info.org_id = user.profile.orgId;
    file_info.org_name = user.profile.orgName;
    file_info.dt_added = new Date();
    console.log(file_info);	
    Meteor.call('convert_CSV', file_info);

    //hide uploader when file is done uploading
    Session.set('uploadDataSet', '');
    $('#add-dataset').removeClass('cancel');
    $('#add-dataset').html('<i class="fa fa-plus-circle glyphicon glyphicon-plus"></i> Data Set');

  }


});

