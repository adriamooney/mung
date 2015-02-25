MungSummaryGraph = {
	init: function(summary_graph_list){

		// NOTE: checked status controlled by 0 / 1 
		// 1 = checked == "true"
		// 0 = checked == "false"

		//console.log(summary_graph_list);
		var dataset_id = summary_graph_list.dataset_id;
		this.dataset_data = DataSets.findOne({_id: dataset_id});
		console.log(this.dataset_data);
			// THIS ORIGINALLY STARTED AS A CLIENT-SIDE SET OF ACTIONS
			// CURRENTLY IS DOING A BUNCH OF STATS-WORK FIRST
			// THIS IS ALL IN DESPERATE NEED OF REFACTORING
		//var canvas = document.getElementById('canvas');

		var status_array = summary_graph_list.status_array;

		/// have to puzzle through handling indices like "year"
		/// further points for getting information about the file type being provided
		/// (so we know how to normalize / map the data correctly)
		for (var i = 0; i < status_array.length; i++) {
			if(status_array[i] == 1) {
				// console.log("status of property check:  " + status_array[i]);
				var data_values = this.dataset_data.file_data.row_data[i];
				var property = this.dataset_data.file_data.properties[i];
				
				// need to namespace out row_mean (for now) 
				// because if it doesn't exist, then i need it to
				this.dataset_data.file_data.row_means = this.dataset_data.file_data.row_means || [];

				// only get basic stats if not already calculated
				if (this.dataset_data.file_data.row_means[i]) { 
					this.calculate_mean(property, i, data_values);	
				} else {
					console.log("did not need to run calculate_mean. horray!");
				}
				/* if (colleciton_data.file_data.sd == '') { 
					this.calculate_sd(property, data_values);	
				} */ 
				

				// this.graph_data_struct(graph_data);
				}
			}
	}, 

	/// THIS SHOULD ALL BE MOVED TO A DIFFERENT OBJECT
	///	:: MungSummaryStats {}
	/// allows the calculations to be separate from graph creation
	/// the graphs may NEED this information but it should be set somewhere else... (or?)
	///	further, this information should be saved to the colleciton information 
	///		so it doesn't have to be calcualted again. 
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
			var dataset_id = this.dataset_data._id;
			DataSets.update({_id: dataset_id}, {$push: {row_means: current_row_mean_data}});
		}
		console.log(DataSets.findOne({_id: dataset_id}));
	},
	calculate_median: function(property, data_values){

	},
	calculate_variance: function(means){

	},
	calculate_sd: function(mean, data_value) {

	},
	graph_data_struct: function(graph_data) {


		Blaze.renderWithData(Template.summaryItem, graph_data, canvas);
	}
};