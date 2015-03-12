Template.summaryGraph.helpers({  
  ifGraphData: function() {
    return Session.get('summaryGraph');
  },
  graphId: function() {
    var graph_data = Session.get('summaryGraph');
    var last = graph_data.length -1;
    console.log(graph_data);
    console.log(graph_data[last][0]);
    return graph_data[last][0]; //THIS IS NOT WORKING
  },
  chart: function() {
  	var graph_data = Session.get('summaryGraph');
  	var graphs = [];
  	for (i = 1; i< graph_data.length; i++) {
      graphs.push[createSvg(graph_data[i])];
  	}
    return graphs;
  }
});

function createSvg(data) {
    var chart = nv.models.lineChart().margin({left: 75, right:75, top:50, bottom:50});

    nv.addGraph(function() {
        chart.xAxis.axisLabel(data.key).tickFormat(d3.format('d'));
        chart.yAxis.axisLabel(data.key).tickFormat(d3.format('d'));
        svg = d3.select('#summary-graph').append('div').attr("class", "svg-wrap").html('<div class="label label-danger remove-svg-item"><i class="fa fa-times"></i> Remove</div>').append('svg');
        svg.datum(data).call(chart);
        nv.utils.windowResize(function() { chart.update(); });
        return chart;
      });

}

Template.summaryGraph.events({
  'click .remove-svg-item': function(e, template) {
    var t = template.find('.svg-wrap');
    $(t).remove();
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