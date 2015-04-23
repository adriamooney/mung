Template.summaryGraph.helpers({  
  ifGraphData: function() {
    return Session.get('summaryGraph');
  },
  graphId: function() {
    var graph_data = Session.get('summaryGraph');
    var last = graph_data.length -1;
    //console.log(graph_data);
    //console.log(graph_data[last][0]);
    return graph_data[last][0]; //THIS IS NOT WORKING
  },
  chart: function() {
  	var graph_data = Session.get('summaryGraph');
    //console.log(graph_data);
  	var graphs = [];
  	for (i = 1; i< graph_data.length; i++) {
      graphs.push[createSvg(graph_data[i])];
  	}
    return graphs;
  }
});


function createSvg(data) {
      // first figure out what kind of graph we're making here... 
      if (data[0].values[0].value) {
        var chart = nv.models.discreteBarChart()
                 .x(function(d) { return d.label })
                 .y(function(d) { return d.value })
                 .staggerLabels(false)
                 .tooltips(false)
                 .showValues(true)
                ;
      } else {
        var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                //.useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                //.transitionDuration(350)  //<-- seems to BREAK graphs if used...
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis 
                ;
      }
    nv.addGraph(function() {
        // THIS IS USED A LOT IN EXAMPLES
        // BUT FOR ME, IT WAS CAUSING THE BARGRAPHS TO BREAK
        // COMMENTING IT OUT DIDN'T SEEM TO AFFECT GRAPH CREATION SO FUCK IT. 
        //chart.xAxis.tickFormat(d3.format('f'));
        chart.yAxis.axisLabel(data.key).tickFormat(d3.format('g'));  
        svg = d3.select('#summary-graph').append('div').attr("class", "svg-wrap").html('<button class="btn label label-danger remove-svg-item"><i class="fa fa-times"></i> Remove</button>').append('svg');
        
        var svgAttributes = {
          //width: 0,
          height: 300,
          padding: 25,
          margin : {
            top: 5,
            right: 10,
            bottom: 5,
            left: 10
          }
        };

        svg.style({
          //'width': svgAttributes.width + svgAttributes.margin.left + svgAttributes.margin.right,
          'height': svgAttributes.height + svgAttributes.margin.top + svgAttributes.margin.bottom,
          'padding': svgAttributes.padding,
          'margin': '0 auto'
        });
        
        svg.datum(data).call(chart);
        
        nv.utils.windowResize(function() { chart.update(); });
        return chart;
      });

}

Template.summaryGraph.events({
  'click .remove-svg-item': function(e, template) {
    //var t = template.find('.svg-wrap');
    var t = $(e.currentTarget).closest('.svg-wrap');
    $(t).remove();

    //todo: rather than making this blank, it should actually show the graph_data that is present, so that when you
    //go to another route and then come back here, it can get the other graphs you haven't deleted. right now if you delete one graph,
    //that is basically like deleting them all when you go to another route and then come back, they will be all gone.
    //not sure how to do this.
    Session.set('summaryGraph', '');

  }
});



Template.summaryGraph.rendered = function() {
  //
};


