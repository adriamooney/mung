Template.summaryGraph.helpers({  
  chart: function() {
  	var graph_data = Session.get('summaryGraph');
  	var graphs = [];
  	for (i = 0; i< graph_data.length; i++) {
	  	var graph = MungCreateGraph;
		graphs[i] = nv.addGraph(graph.initialize(graph_data[i]), myCallback);
  	}
  	return graphs; //returns svg element with id
  }
});

//	dynamic template to show graphs 
//	(when they're created by "click .summary" in canvas_item.js)
/*Template.showSummaryGraph.helpers({  
  showSummaryGraph: function() {
    return Session.get('summaryGraph');
  }
}); */