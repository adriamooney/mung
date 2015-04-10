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

		var summary_graph_list = {
			dataset_id: canvas_id,  
			status_array: status_array
		};
		
		// this is what gets the summary graphs
		var graph_data = MungSummaryGraph.init(summary_graph_list);
		Session.set('summaryGraph', graph_data);
	},
	'click .predictive': function(e) {
		var canvas_id = this._id;
		console.log(canvas_id);
		Session.set('uploadClassificationData', 'uploadClassificationData');
		Session.set('classificationData', canvas_id);
	},
	'click #cancel-predictive': function(e) {
		Session.set('uploadClassificationData', '');
	}
});


Template.canvasItem.helpers({
	properties: function() {
		var property_array = this.properties;
		//console.log(this);
		return property_array;
	}
});

//dynamic template to show/hide y-classifiers upload widget.  
Template.showUploadClassificationData.helpers({  
  showUploadClassificationData: function() {
    return Session.get('uploadClassificationData');
  }
});

