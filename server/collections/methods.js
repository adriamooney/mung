Meteor.methods({
	convert_CSV: function(file_info){
		MungCSV.csv_to_json(file_info);
	},
	removeCollection: function(id) {
		Collections.remove(id, function(error) {
			console.log(error);
		});
	},
	updateCollectionName: function(id, newVal) {
		Collections.update( {_id: id}, {$set: {title: newVal}});
	},
	initialize_graphs: function(summary_graph_list){
		MungSummaryGraph.init(summary_graph_list);
	},
	get_summary_stats: function(data_summary_id) {
		MungSummaryStats.init(data_summary_id);
	}
});