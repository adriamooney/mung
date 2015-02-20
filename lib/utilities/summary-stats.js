MungSummaryStats= {
	init: function(data_summary_id){
		var data_set_summary = DataSetSummary.findOne({_id: data_summary_id});
		console.log(data_set_summary);
		if(!data_set_summary.row_means){
			this.calculate_mean(data_summary_id);
		}
	},
	calculate_mean: function(data_summary_id) {
			// NOTE: ref_id is the id to the collection in DataSetSummary
			// 		it's used as a "foreign key" to DataSetData 
			// 		(to help reduce package size to/from server to/from client) 
		var data = DataSetData.findOne({ref_id: data_summary_id});
		
		// next we're going to loop through each of the data_rows (i.e. each of the data features)
		// we'll calculate the mean for all the values that are real numbers
		// push that to another array then update the row_means (in the DataSetSummary collection)
		// for now, this is also going to use two loops. :(
		for (i = 0; i < data.row_data.length; i++) {
			var current_column = data.row_data[i];
			var value_total = 0;
			console.log(value_total);

			/*
			for(j = 0; j < current_column.length; j++) {
				current_column[j] = parseInt(current_column[j]);
				value_total = value_total + current_column[i];

			//data comes in all shapes. let's make sure it's a real-value first
			if (isNaN(value_total) == false) {
				var mean = value_total / current_column.length;
				console.log(mean);
				/* var current_mean_data = {
					property: {
						name: property,
						row_int: ref_point,
						mean: mean
					}*/
				/*} 
			} */

		}

		/*  THIS IS ALL GOING TO NEED TO BE REFACTORED TO REFLECT V1 BIFURCATION OF DATA AND SUMMARY
		for (i = 0; i < data_values.length; i++) {
			data_values[i] = parseInt(data_values[i]);
			value_total = value_total + data_values[i];
		}
		if (isNaN(value_total) == false) {
			var mean = value_total / data_values.length;
			console.log(mean);
			var current_row_mean_data = {
				property: {
					name: property,
					row_int: ref_point,
					mean: mean
				}
			}
			console.log(current_row_mean_data);
			var collection_id = this.collection_data._id;
			Collections.update({_id: collection_id}, {$push: {row_means: current_row_mean_data}});
		}
		console.log(Collections.findOne({_id: collection_id}));
		*/
	},
	calculate_median: function(property, data_values){

	},
	calculate_variance: function(means){

	},
	calculate_sd: function(mean, data_value) {

	},

}