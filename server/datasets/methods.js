Meteor.methods({
	convert_CSV: function(file_info){
		MungCSV.csv_to_json(file_info);
	},
	removeDataset: function(id) {
		DataSets.remove(id, function(error) {
			console.log(error);
		});
	},
	updateDatasetName: function(id, newVal) {
		DataSets.update( {_id: id}, {$set: {title: newVal}});
	},
	initialize_graphs: function(summary_graph_list){
		MungSummaryGraph.init(summary_graph_list);
	},
});