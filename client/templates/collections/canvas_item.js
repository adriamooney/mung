Template.canvasItem.events({
	'click .options-toggle': function(e) {
		var optionsDiv = e.currentTarget.nextElementSibling;
		optionsDiv.style.display = (optionsDiv.style.display != 'block' ? 'block' : 'none');

	},
	'click .remove-canvas-item': function(e) {
		var thisItem = document.getElementById(this._id);
		thisItem.parentNode.removeChild(thisItem);

		var obj = Session.get('selectedCollection');
		delete obj[this._id];
		Session.set('selectedCollection', obj);
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

Template.canvasItem.helpers({
	properties: function() {
		console.log(this.file_data.properties);
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