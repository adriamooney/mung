Meteor.methods({
	convert_CSV: function(file_info){
		MungCSV.csv_to_json(file_info);
	}
});