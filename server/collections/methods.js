Meteor.methods({

	addNewCollection: function(info) {

      Collections.insert(info);

	}, 
	convert_CSV: function(file_info){
		MungCSV.csv_to_json(file_info);
		console.log(MungCSV);
		console.log(MungCSV.csv_data);


//		console.log(csv_data);
		//return file_data;
	}
});