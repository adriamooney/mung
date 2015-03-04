Meteor.startup(function () {

// INITIALIZE FILE UPLOADER
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    maxPostSize: 120000000, // max post size: 120 MB
    maxFileSize:  100000000, // max post size: 100 MB
    mimeTypes: {
      "txt": "text/plain"
    },
    checkCreateDirectories: true //create the directories for you
  });


  //create roles using https://atmospherejs.com/alanning/roles
  if(!Meteor.roles.findOne({name: "user"}))
    Roles.createRole("user");
  if(!Meteor.roles.findOne({name: "admin"}))
    Roles.createRole("admin");
  if(!Meteor.roles.findOne({name: "superadmin"}))
    Roles.createRole("superadmin");
      

});



