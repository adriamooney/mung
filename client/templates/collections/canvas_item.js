Template.canvasItem.events({
	'click .options-toggle': function(e) {
		var optionsDiv = e.currentTarget.nextElementSibling;
		optionsDiv.style.display = (optionsDiv.style.display != 'block' ? 'block' : 'none');
		//TODO:  need to save toggle state in session variable
		//console.log(optionsDiv.style.display);
		Session.set('optionsToggleState', optionsDiv.style.display);
		Tracker.autorun(function () {
		  	Session.get('optionsToggleState');
		});

	},
	'click .properties-toggle': function(e) {
		var optionsDiv = e.currentTarget.nextElementSibling;
		optionsDiv.style.display = (optionsDiv.style.display != 'block' ? 'block' : 'none');
		//TODO:  need to save toggle state in session variable
		//console.log(optionsDiv.style.display);
		Session.set('propertiesToggleState', optionsDiv.style.display);
		Tracker.autorun(function () {
		  	Session.get('propertiesToggleState');
		});

	},
	'click .remove-canvas-item': function(e) {
		var thisItem = document.getElementById(this._id);
		thisItem.parentNode.removeChild(thisItem);

		var obj = Session.get('selectedCollection');
		delete obj[this._id];
		Session.set('selectedCollection', obj);
	},
	'click .close-properties': function(event) {
		var propsDiv = event.currentTarget.parentElement;
		console.log(propsDiv);
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

	}	

});

Template.canvas.rendered = function() {

		var selected_collection = Session.get('selectedCollection');

		var canvas = document.getElementById('canvas');
		if(selected_collection) {
			for (var key in selected_collection) {
			  if (selected_collection.hasOwnProperty(key)) {

			    var data = Collections.findOne({_id: selected_collection[key]});

			    Blaze.renderWithData(Template.canvasItem, data, canvas);
			  }
			}
		}

}

//TODO: these need to be used in a different way.  need to take these values and make them actually keep the div open or closed like it should
Template.canvasItem.rendered = function() {
	Tracker.autorun(function () {
		  	console.log(Session.get('propertiesToggleState'));
		  	console.log(Session.get('optionsToggleState'));
	});
}

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
	}
});