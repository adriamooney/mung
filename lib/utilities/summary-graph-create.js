MungSummaryGraph = {
	init: function(summary_graph_list){

		// NOTE: checked status controlled by 0 / 1 
		// 1 = checked == "true"
		// 0 = checked == "false"

		//console.log(summary_graph_list);
		var collection_id = summary_graph_list.collection_id;
		this.collection_data = Collections.findOne({_id: collection_id});
		console.log(this.collection_data);
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
				var data_values = this.collection_data.file_data.row_data[i];
				var property = this.collection_data.file_data.properties[i];
			

				// this.graph_data_struct(graph_data);
				}
			}
	}, 
	graph_data_struct: function(graph_data) {


		//Blaze.renderWithData(Template.summaryItem, graph_data, canvas);
	}
};