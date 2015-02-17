MungSummaryGraph = {
	init: function(summary_graph_list){

		// NOTE: checked status controlled by 0 / 1 
		// 1 = checked == "true"
		// 0 = checked == "false"

		console.log(summary_graph_list);
		var collection_id = summary_graph_list.collection_id;
		var collection_data = Collections.findOne({_id: collection_id});
		var canvas = document.getElementById('canvas');

		var status_array = summary_graph_list.status_array;

		for (var i = 0; i < status_array.length; i++) {
			if(status_array[i] == 1) {
				console.log("status of property check:  " + status_array[i]);
				var graph_data = collection_data.file_data.row_data[i];
				this.graph_data_struct(graph_data);
				console.log(this);
				}
			}
	}, 
	graph_data_struct: function(graph_data) {


		Blaze.renderWithData(Template.summaryItem, graph_data, canvas);
	}
};