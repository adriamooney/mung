Template.collectionsList.helpers({
	'collections': function() {
		return Collections.find();
	}

});

/*Template.collectionsList.created = function() {
	var emnpty_session_obj = {};
	Session.set('selectedColletion', emnpty_session_obj);
} */

Template.collectionsList.events({
	'click li': function(e) {
		//console.log(this._id);

		var collectionId = this._id;
		var data = Collections.findOne({_id: this._id});
		var canvas = document.getElementById('canvas');

		var selectedItems = Session.get('selectedCollection', selectedItems);
		if(!selectedItems) {
			var selectedItems = {};
		}

		selectedItems[collectionId] = collectionId;
        Session.set('selectedCollection', selectedItems);
        console.log(Session.get('selectedCollection'));

		
		//return Session.set('selectedCollections', selectedItems);

		//var curr = e.currentTarget;

		//return Session.set('selectedCollections', selectedItems);

		Blaze.renderWithData(Template.canvasItem, data, canvas);
	}
});



