Template.summaryGraph.helpers({  
  ifGraphData: function() {
    return Session.get('summaryGraph');
  },
  graphId: function() {
    var graph_data = Session.get('summaryGraph');
    var last = graph_data.length -1;
    console.log(graph_data);
    console.log(graph_data['ds_ref_id']);
    console.log(graph_data[last]);
    return graph_data[last]; //THIS IS NOT WORKING
  },
  chart: function() {
  	var graph_data = Session.get('summaryGraph');
    var graphs = [];
    var svg;
    var chart = nv.models.lineChart();

    for (var i = 1; i < graph_data.length; i++) {
      if (graph_data[i] != null) {
        graphs = graph_data[i];
        chart.useVoronoi(false); 
        nv.addGraph(function() {
        chart.xAxis.axisLabel(graphs.key).tickFormat(d3.format('d'));
        chart.yAxis.axisLabel("Y-Axis").tickFormat(d3.format('d'));
        svg = d3.select('#summary-graph').append('svg');
        svg.datum(graphs).call(chart);
        nv.utils.windowResize(function() { chart.update(); });
      return chart;
    });
      }
    }
    //this is here because it supposedly fixes some error.  we can probobly remove it.
    //graphs = [];
      
    //console.log(graphs);
    //return graphs;  //graphs is an array of charts
    //console.log(chart);
  	//return graphs; //returns svg element with id
    //return chart;  //TODO;  needs to return an an array of svg elements.  then in the template we can chage to {{#each chart}} {{this}}{{/each}}
  }
});

Template.summaryGraph.rendered = function() {
  //console.log(nv);

  //SEE THIS EXAMPLE:  

  /*var chart = nv.models.lineChart()
      .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
      .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
      .transitionDuration(350)  //how fast do you want the lines to transition?
      .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
      .showYAxis(true)        //Show the y-axis
      .showXAxis(true)        //Show the x-axis
    ;

    nv.addGraph(function() {
      chart.xAxis.axisLabel('Person number').tickFormat(d3.format('d'));
      chart.yAxis.axisLabel('Age (years)').tickFormat(d3.format('d'));
      d3.select('#chart svg').datum(
        [{ values: People.find().fetch(), key: 'Age' }]
      ).call(chart);
      nv.utils.windowResize(function() { chart.update(); });
      return chart;
    });

    this.autorun(function () {
      d3.select('#chart svg').datum(
        [{ values: People.find().fetch(), key: 'Age' }]
      ).call(chart);
      chart.update();
    }); */
};



//	dynamic template to show graphs 
//	(when they're created by "click .summary" in canvas_item.js)
/*Template.showSummaryGraph.helpers({  
  showSummaryGraph: function() {
    return Session.get('summaryGraph');
  }
}); */