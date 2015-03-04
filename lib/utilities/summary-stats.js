MungSummaryStats= {
	init: function(data_summary_id){
		var data_set_summary = DataSetSummary.findOne({_id: data_summary_id});
		console.log(data_set_summary);
		if(!data_set_summary.row_sum){
			this.calculate_mean(data_summary_id);
			this.calculate_sd(data_summary_id);
		}
		
	},
	calculate_mean: function(data_summary_id) {
			// NOTE: ref_id is the id to the collection in DataSetSummary
			// 		it's used as a "foreign key" to DataSetData 
			// 		(to help reduce package size to/from server to/from client) 
		var data = DataSetData.findOne({ref_id: data_summary_id});
		console.log("calculate_mean");

		// next we're going to loop through each of the data_rows (i.e. each of the data features)
		// we'll calculate the mean for all the values that are real numbers
		// push that to another array then update the row_means (in the DataSetSummary collection)
		// for now, this is also going to use two loops. :(
		for (i = 0; i < data.row_data.length; i++) {
			var current_column = data.row_data[i];
			var value_total = 0;
			
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
					// maybe this should be called "feat_sum" for (feature_summary) 
					// since it's not even a row of data. if anything, it's [effectively] a vector
						row_sum: {
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
	calculate_variance: function(data_summary_id, row_sum){
		var data = DataSetData.findOne({ref_id: data_summary_id});
		
			var row_num = row_sum.row_int;
			// console.log(row_num);
			var mean = row_sum.mean;
			// console.log(mean);
			var feature_data = data.row_data[row_num];
			var variance = 0;
			//console.log(variance);

			for (var j = 0; j < feature_data.length; j++) {
				mean_diff = feature_data[j] - mean;
				variance = variance + Math.pow(mean_diff, 2);
				// console.log("cumlative variance:   " + variance);
			}
			variance = variance / feature_data.length;
			//console.log("final variance:  " + variance);
		return variance;
	},
	calculate_sd: function(data_summary_id) {
		/* 
		/// TO CALC. Standard Deviation
			// for each value "X" (data-point in data-set)
			// a. Get Mean for all of X (X0 .. XN)
			// b. Subtract actual value X by mean (X - Mean)
			// c. square it.
			// d. Add to all values X
			// e. divide by number of values in X ("N")
				// 	note: this is your variance
			// f. square root of variance = standard deviation
		*/
		var data_sum = DataSetSummary.findOne({_id: data_summary_id});
		 
		 console.log("calculate_sd");
		 row_sum = data_sum.row_sum;
		for (var i = 0; i < row_sum.length; i++){
			var variance = this.calculate_variance(data_summary_id, row_sum[i]);	
			var standard_deviation = Math.sqrt(variance);
			console.log(standard_deviation);
			 var sum_data = {
				 		row_sum : { 
							variance: variance,
							sd: standard_deviation
					}
				}
			//DataSetSummary.update({_id: data_summary_id, row_sum: i}, {$addToSet:sum_data });
			DataSetSummary.update( data_summary_id, {$addToSet: sum_data});
			//DataSetSummary.update({_id: data_summary_id, 'row_sum': i}, {$push: sum_data});
		}	

		
	},
	calculate_median: function(data_summary_id){

	},
	

}