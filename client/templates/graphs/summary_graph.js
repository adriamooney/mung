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
    console.log(graph_data);
  	var graphs = [];
  	for (i = 1; i< graph_data.length; i++) {
      graphs.push[createSvg(graph_data[i])];
  	}
    return graphs;
  }
});


function createSvg(data) {
    //console.log(data);
    var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                //.useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                //.transitionDuration(350)  //<-- seems to BREAK graphs if used...
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis 
                ;

    nv.addGraph(function() {
        chart.xAxis.tickFormat(d3.format('f'));
        chart.yAxis.axisLabel(data.key).tickFormat(d3.format(',g'));
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