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
    	csv_to_json(file_info);
    }
  });
  // FILE UPLOAD CALLBACK
 /* Uploader.finished = function(fileInfo, templateContext) {
		//Uploads.insert(fileInfo);
		console.log('does this happen');
	};
	*/
});



