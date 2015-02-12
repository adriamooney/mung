//file:/server/init.js
Meteor.startup(function () {
  // INITIALIZE FILE UPLOADER
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    maxPostSize: 120000000, // max post size: 120 MB
    maxFileSize:  100000000, // max post size: 100 MB
    checkCreateDirectories: true, //create the directories for you
    finished: function(file_info) {
      // GET USER INFO HERE
      // then pass it along to the csv_to_json (so we know who to associate files with)
      var user_info = {};
    	MungCSV.csv_to_json(file_info, user_info);
    }
  });

  //create roles using https://atmospherejs.com/alanning/roles

  if(!Meteor.roles.findOne({name: "user"}))
    Roles.createRole("user");
  if(!Meteor.roles.findOne({name: "admin"}))
    Roles.createRole("admin");
  if(!Meteor.roles.findOne({name: "superadmin"}))
    Roles.createRole("superadmin");
      

});



