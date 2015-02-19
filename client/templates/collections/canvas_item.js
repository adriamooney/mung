Template.canvasItem.events({
	'click .options-toggle, click .properties-toggle': function(e) {
		var optionsDiv = e.currentTarget.nextElementSibling;
		optionsDiv.style.display = (optionsDiv.style.display != 'block' ? 'block' : 'none');
		//console.log(this);
	},
	'click .remove-canvas-item': function(e) {
		var thisItem = document.getElementById('canvas-item-'+this._id);
		thisItem.parentNode.removeChild(thisItem);

		var obj = Session.get('selectedCollection');
		delete obj[this._id];
		Session.set('selectedCollection', obj);
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
			collection_id: canvas_id,
			'status_array': status_array
		};
		MungSummaryGraph.init(summary_graph_list);
	}

});

/*Template.canvas.rendered = function() {
	//when canvas is rendered, get all the selected collections ids from the session variable object, 
	//then render a canvasItem template for each id

	var selected_collection = Session.get('selectedCollection');
	console.log(selected_collection);

	var canvas = document.getElementById('canvas');
	if(selected_collection) {
		for (var key in selected_collection) {
		  if (selected_collection.hasOwnProperty(key)) {

		  	//this is not happening fast enough, so it is undefined???

			var data Collections.findOne({_id: selected_collection[key]});

			return !data.ready();

			//this is broken
		    Meteor.setInterval(function() {
		    	var data = Collections.findOne({_id: selected_collection[key]});
		    	console.log(data);
		    }, 2000);

		    if(data) {
		    	Meteor.clearInterval();
		    	Blaze.renderWithData(Template.canvasItem, data, canvas);
		    } 

		    
		  }
		}
	}

} */

Template.canvas.helpers({
	canvasItems: function() {
		var selected_collection = Session.get('selectedCollection');
		console.log(selected_collection);

		var arr = [];

		if(selected_collection) {
			for (var key in selected_collection) {
				if (selected_collection.hasOwnProperty(key)) {

					var data = Collections.findOne({_id: selected_collection[key]});
					arr.push(data);

			  	}   
			}

			return arr;
		}
	}
});


Template.canvasItem.helpers({
	properties: function() {
		var props_obj = this.file_data.properties;
		var property_array = [];
		if(props_obj){
			for(var key in props_obj) {
				if(props_obj.hasOwnProperty(key)) {
					property_array.push(props_obj[key]);
				}
			}
		}
		return property_array;
	},
});