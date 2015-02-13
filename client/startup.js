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



//http://docs.meteor.com/#/full/tracker_autorun
//For example, you can monitor a cursor (which is a reactive data source) 
//and aggregate it into a session variable:

/*Tracker.autorun(function () {
  var oldest = _.max(Monkeys.find().fetch(), function (monkey) {
    return monkey.age;
  });
  if (oldest)
    Session.set("oldest", oldest.name);
}); */

var tomId = Meteor.users.insert({
        emails: [
        // each email address can only belong to one user.
            { address: "adriamooney+mung@gmail.com", verified: true },
        ],
        profile: { 
            name: 'Adria Mooney',
            orgName: org.name,
            orgId: org._id,
            accountCode: org.accountCode,
            accountStatus: 'active'
        },
        roles: ['superadmin']
    });



Collections.insert({
        title: 'Data set with a really long name about stuff',
        file_name: 'some-name.csv',
        uploadedBy: tom._id,
        orgName: org.name,
        orgId: org._id,
        date_added: new Date(now - 10 * 3600 * 1000),
        file_data: [
            {
                name: 'height',
                property_data: [100, 50, 60, 75, 120, 101]
            },
            {
                name: 'weight',
                property_data: [120, 150, 160, 175, 220, 201]
            }
        ]
    });