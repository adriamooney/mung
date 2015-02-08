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
	//this object needs to be a variable that is populated by the id's of the selected collections, then we need to render the canvasItem template for each one
	
		console.log(Collections.find().count());

		var p = Session.get('selectedCollection');


		var canvas = document.getElementById('canvas');
		if(p) {
			for (var key in p) {
			  if (p.hasOwnProperty(key)) {

			    var data = Collections.findOne({_id: p[key]});


			    Blaze.renderWithData(Template.canvasItem, data, canvas);
			  }
			}
		}

}