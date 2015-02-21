MungSummaryStats= {
	init: function(data_summary_id){
		var data_set_summary = DataSetSummary.findOne({_id: data_summary_id});
		console.log(data_set_summary);
		if(!data_set_summary.row_means){
			this.calculate_mean(data_summary_id);
		}
		if (!data_set_summary.row_sd) {
			this.calculate_sd(data_summary_id);
		}
	},
	calculate_mean: function(data_summary_id) {
			// NOTE: ref_id is the id to the collection in DataSetSummary
			// 		it's used as a "foreign key" to DataSetData 
			// 		(to help reduce package size to/from server to/from client) 
		var data = DataSetData.findOne({ref_id: data_summary_id});
			console.log(data);
			console.log(data.row_data);
			console.log(data.row_data.length);
		// next we're going to loop through each of the data_rows (i.e. each of the data features)
		// we'll calculate the mean for all the values that are real numbers
		// push that to another array then update the row_means (in the DataSetSummary collection)
		// for now, this is also going to use two loops. :(
		for (i = 0; i < data.row_data.length; i++) {
			var current_column = data.row_data[i];
			var value_total = 0;
			console.log(value_total);
			console.log(current_column);
			console.log(current_column.length);

			for(j = 0; j < current_column.length; j++) {
				current_column[j] = parseInt(current_column[j]);
				value_total = value_total + current_column[j];
			}
			//data comes in all shapes. let's make sure it's a real-value first
			if (isNaN(value_total) == false) {
				// calculate mean
				var mean = value_total / current_column.length;
				//console.log(mean);
				var current_mean_data = {
						row_means: {
							name: data.properties[i],
							row_int: i,
							mean: mean
						}
					}
					//console.log(current_mean_data);

					// insert mean into DataSetSummary
					DataSetSummary.update({_id: data_summary_id}, {$push: current_mean_data});
			} // END DATA.ROW_DATA LOOP
		}
	},
	calculate_median: function(data_summary_id){

	},
	calculate_variance: function(data_summary_id){

	},
	calculate_sd: function(data_summary_id) {

	},

}