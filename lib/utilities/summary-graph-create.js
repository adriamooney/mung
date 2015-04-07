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
				// to handle NAN (strings), going to do a check on the first value
				// if it's not a real-number, then as a working assumption
				// i'm going to treat it as a string and count the instances of that "string" occuring
				// if a real number, call line graph
				if (isNaN(prop_data[0]) == false) {
					struct_data[i] = this.struct_line_data(x_val, prop_data, property);	
				} else { // call bar graph
					struct_data[i] = this.struct_bar_data(x_val, prop_data, property);	
				}
				
				
				}
			}
			struct_data['ds_ref_id'] = ds_ref_id;
			return struct_data;
	}, 
	struct_line_data: function(x_val, prop_data, property) {
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
		/*
		// to handle NAN (strings), going to do a check on the first value
		// if it's not a real-number, then as a working assumption
		// i'm going to treat it as a string and count the instances of that "string" occuring
		// struct_graph_data will now also return the graph type (line vs bar)
		*/
		for (var j = 0; j<prop_data.length; j++) {
					values[j] = {
					x: x_val[j],
					y: prop_data[j]
				}; 
		}// END MAIN PROP_DATA LOOP
		
		// now setup svg_arr which will contain structured data and return it to the client
		var key = property;
		var svg_arr = [ {
			key: key,
			values: values,
			color:"#9933cc"
		} ];
		//console.log(svg_arr);
		return svg_arr;
	},
	struct_bar_data: function(x_val, prop_data, property) {
		/*
		//	what's happening here: Same as above but for bar graphs
		// 			the loops are to get the "string" and the "counts"
		//			which are needed to properly construct the bargraphs
		*/		
		var values = [];
		
		for (var j = 0; j<prop_data.length; j++) {
			// see if there are any previous labels we need to be aware of
			if (values.length == 0) {
				var new_field = {
					label: prop_data[j],
					value: 1
					};
				values.push(new_field);
				//console.log(values);
				}
			else if (values.length > 0){ // check for match on prop_data[j] = values[i]
				var match_bool = 0;
				var value_int = 0; 
				for (var i = 0; i < values.length; i++) {
					if (values[i].label == prop_data[j]) {
						match_bool = 1;
						value_int = i;
					}
				}
				if (match_bool  == 0) { 
					// NO MATCH, add new label-value pair
					var new_field = {
							label: prop_data[j],
							value: 1
						};
						values.push(new_field);
				} else { // MATCH
					values[value_int].value++;
				}			
			}
		}// END MAIN PROP_DATA LOOP
		// now setup svg_arr which will contain structured data and return it to the client
		var key = property;
		var svg_arr = [ {
			key: key,
			values: values
		} ];
		console.log(svg_arr);
		return svg_arr;
	}
};