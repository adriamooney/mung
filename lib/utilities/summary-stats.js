MungSummaryStats= {
	init: function(){

	},
	calculate_mean: function(property, ref_point, data_values) {
		var value_total = 0;
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
	},
	calculate_median: function(property, data_values){

	},
	calculate_variance: function(means){

	},
	calculate_sd: function(mean, data_value) {

	},

}