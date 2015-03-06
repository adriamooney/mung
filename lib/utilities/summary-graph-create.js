MungSummaryGraph = {
	init: function(summary_graph_list){

		// NOTE: checked status controlled by 0 / 1 
		// 1 = checked == "true"
		// 0 = checked == "false"
		/*
		//	what's happening here:
		//	1. going to see which columns ("features") we need to graph
		//	2. going to get the data for col1 (assumed index for v1) 
			// going to data for colx (where x = the enabled feature)
		//	3. goig to pass this to the struct_graph 
			// (which will eventually call a simple render)
		//	step three involves looping through the arrays of data 
		//	to properly structure the data for the graph
		// 	the default graph is going to be bar chart (for now)
		// 
		*/

		var ds_ref_id = summary_graph_list.dataset_id;
		var ds_data = DataSetData.findOne({ ref_id: ds_ref_id});
		var status_array = summary_graph_list.status_array;
		/// further points for getting information about the file type being provided
		/// (so we know how to normalize / map the data correctly)
		// going to start by assuming column 1 ([0]) = true (and acts as index/key)
		for (var i = 1; i < status_array.length; i++) {
			if(status_array[i] == 1) {
				// console.log("status of property check:  " + status_array[i]);
				var data = ds_data.row_data[i];
				var property = ds_data.properties[i];
				var prop_values = ds_data.row_data[0];
				
				this.struct_graph_data(data, property, prop_values);
				}
			}
	}, 
	graph_data_struct: function(data, property, prop_values) {
		/*
		//	what's happening here: (from above)
			STEP 3.
		//	  struct_graph 
		//	step three involves looping through the arrays of data 
		//	to properly structure the data for the graph
		// 	the default graph is going to be bar chart (for now)
		// 
		*/
		console.log(data);
		console.log(property);
		console.log(prop_values);

		//Blaze.renderWithData(Template.summaryItem, graph_data, canvas);
	}
};