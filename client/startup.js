Meteor.startup(function () {

//https://github.com/tomitrescak/meteor-uploads/blob/master/client/init.js#L2-L10
  Uploader.finished = function(index, file_info) {
      // FOR SOME STUPID FUCKING REASON
      // UPLOADER.FINISHED PLACES THE FILE INFO AS THE SECOND VARIABLE
      // IN THIS FILE AND ON THE SERVER/STARTUP.JS IT'S THE FIRST VARIABLE. 

    //https://atmospherejs.com/matteodem/server-session 
    //https://github.com/matteodem/meteor-server-session :
    //set server session to show that the file is uploading.  there is significant delay
    //between here and when the file is done and inserted into the collection.
    ServerSession.set('csv_to_json_running', 'loading');
    var user_id = Meteor.userId();
    var user = Meteor.users.findOne({_id: user_id});
    console.log(user);
    file_info.user_id = user_id;
    file_info.org_id = user.profile.orgId;
    file_info.org_name = user.profile.orgName;
    file_info.dt_added = new Date();
  
    console.log(file_info); 
    // adria suggests setting it to a variable not doing it like this.
      var collection_ref_id = Session.get('classificationData');
      if (collection_ref_id) {
        file_info.collection_ref_id = collection_ref_id;
      } 
       
        Meteor.call('convert_CSV', file_info);

      //hide uploader when file is done uploading
      Session.set('uploadDataSet', '');
      // clear the classification session 
      if (Session.get('uploadClassificationData')) {
        Session.set('uploadClassificationData', '');
        Session.set('classificationData', '');
        Session.set('choosePredictiveEngine', 'choosePredictiveEngine');  
      }
  }


});

