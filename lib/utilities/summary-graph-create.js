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
		var x_val = ds_data.row_data[0];
		// BUG -- need to reference data by key "row_int", not by array pointer ("i")
		var struct_data = [];
		for (var i = 1; i < status_array.length; i++) {
			if(status_array[i] == 1) {
				var prop_data = ds_data.row_data[i];
				var property = ds_data.properties[i];
				struct_data[i] = this.struct_graph_data(x_val, prop_data, property);
				}
			}
			struct_data['ds_ref_id'] = ds_ref_id;
			return struct_data;
	}, 
	struct_graph_data: function(x_val, prop_data, property) {
		/*
		//	what's happening here: (from above)
			STEP 3.
		//	  struct_graph 
		//	step three involves looping through the arrays of data 
		//	to properly structure the data for the graph
		// 	the default graph is going to be bar chart (for now)
		//	// GOAL: return data structured and ready for d3 (arrays of objects)
		*/
		
		var values = [];
		for (var j = 0; j<prop_data.length; j++) {
			values[j] = {
				x: x_val[j],
				y: prop_data[j]
			}
		}
		// now setup svg_arr which will contain structured data and return it to the client
		var key = property;
		var svg_arr = [ {
			key: key,
			values: values,
			color:"#9933cc"
		} ];
		return svg_arr;
	}
};