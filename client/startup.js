Meteor.startup(function () {

//https://github.com/tomitrescak/meteor-uploads/blob/master/client/init.js#L2-L10
  Uploader.finished = function(index, file_info) {
      // FOR SOME STUPID FUCKING REASON
      // UPLOADER.FINISHED PLACES THE FILE INFO AS THE SECOND VARIABLE
      // IN THIS FILE AND ON THE SERVER/STARTUP.JS IT'S THE FIRST VARIABLE. 
     var csv_file_data = Meteor.call('convert_CSV', file_info);
     //console.log(csv_file_data[0]);

/*      var curr = Meteor.userId();
      var user = Meteor.users.findOne({_id:curr});

      var now = new Date().getTime();

      //TODO: put actual data in the `file_data`. and `file_name`.  
      //Allow user to set `title` before upload, then set that title in a session and it can then be entered in here:

      var info = {
        title: 'new data set',
        file_name: 'some-name.csv',
        uploadedBy: user._id,
        orgName: user.orgName,
        orgId: user.orgId,
        date_added: new Date(now - 10 * 3600 * 1000),
        file_data: 'data'
      }

      Meteor.call('addNewCollection', info);
*/

  }

});