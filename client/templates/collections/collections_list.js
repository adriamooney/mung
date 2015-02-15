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

		//This gets the id of the selectedCollection and adds it to an object to be saved in the session variable 'selectedItems';

		var collectionId = this._id;
		//console.log(collectionId);
		var data = Collections.findOne({_id: this._id});
		//console.log(data);
		var canvas = document.getElementById('canvas');

		var selectedItems = Session.get('selectedCollection', selectedItems);
		if(!selectedItems) {
			var selectedItems = {};
		}

		selectedItems[collectionId] = collectionId;
        Session.set('selectedCollection', selectedItems);
        //console.log(Session.get('selectedCollection'));

		Blaze.renderWithData(Template.canvasItem, data, canvas);
	}
});



