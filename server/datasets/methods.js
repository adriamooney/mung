Meteor.methods({
	convert_CSV: function(file_info){
		MungCSV.csv_to_json(file_info);
	},
	removeDataset: function(id) {
		DataSetSummary.remove(id, function(error) {
			console.log(error);
		});
	},
	updateDatasetName: function(id, newVal) {
		DataSetSummary.update( {_id: id}, {$set: {title: newVal}});
	},
	initialize_graphs: function(summary_graph_list){
		var struct_data = MungSummaryGraph.init(summary_graph_list);
		console.log("from inside methods.js: " + struct_data);
		return struct_data;
	},
	get_summary_stats: function(data_summary_id) {
		MungSummaryStats.init(data_summary_id);
	}
});