Template.canvasItem.events({
	'click .options-toggle, click .properties-toggle': function(e) {
		var optionsDiv = e.currentTarget.nextElementSibling;
		optionsDiv.style.display = (optionsDiv.style.display != 'block' ? 'block' : 'none');
		//console.log(this);
	},
	'click .remove-canvas-item': function(e) {
		var thisItem = document.getElementById('canvas-item-'+this._id);
		thisItem.parentNode.removeChild(thisItem);

		var obj = Session.get('selected_dataset');
		delete obj[this._id];
		Session.set('selected_dataset', obj);
	},
	'click .close-properties': function(event) {
		var propsDiv = event.currentTarget.parentElement;
		//console.log(propsDiv);
		propsDiv.style.display = 'none';
		Session.set('propertiesToggleState', propsDiv.style.display);
	},
	'change .property-checkbox': function(e) {
		console.log(e.currentTarget.value);
		var checked = e.currentTarget.checked;		


		if(checked == true) {
			console.log('checked');
		}
		else {
			console.log('unchecked');
		}

	},
	'click .summary': function(e) {

		// after a little data prep, 
		// this function calls a utility to create summary graphs
		var canvas_id = this._id;
		var status_array = [];
		var i = 0;

		$('#canvas-item-'+canvas_id+ ' .property-checkbox').each(function() {
			var checked = this.checked;
			if (checked == true) {
				status_array[i] = 1 // 1 = checked
			} else {
				status_array[i] = 0; // 0 = unchecked
			}
			i++;
		});
		// console.log(status_array);
		var summary_graph_list = {
			dataset_id: canvas_id,  
			status_array: status_array
		};
		
		// this is what gets the summary graphs
		var graph_data = MungSummaryGraph.init(summary_graph_list);
		console.log(graph_data);
		console.log(graph_data.length);
		// WHY DOESN'T THIS WOKR??? WTF?? 
		// var graph_data = Meteor.call("initialize_graphs", summary_graph_list);
		
		//used for dynamic template
		// BUG -- for some reasons creates a "null" in the session
		// :: checked all the loops for graph_data and it just suddenly appears 
		// as the first entry in Session ('summaryGraph')...wtf
		// see var asdf below
		Session.set('summaryGraph', graph_data);
		// var asdf = Session.get('summaryGraph');
		// console.log(asdf);
		//}
	}
});


Template.canvasItem.helpers({
	properties: function() {
		var property_array = this.properties;
		console.log(this);
		return property_array;
	}
});