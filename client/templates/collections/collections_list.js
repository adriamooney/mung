Template.collectionsList.helpers({
	'collections': function() {
		return Collections.find();
	},
	'selectedCollection': function() {
		return !!Session.get('selectedCollections') ? 'selected' : '';
	}

});

/*Template.collectionsList.created = function() {
	Session.set('selectedColletions', {});
} */

Template.collectionsList.events({
	'click li': function(e) {
		//console.log(this._id);
		var collectionId = this._id;
		var data = Collections.findOne({_id: this._id});
		var canvas = document.getElementById('canvas');

		//var selectedItems = {};
		//return Session.set('selectedCollections', selectedItems);

		//var curr = e.currentTarget;

		//return Session.set('selectedCollections', selectedItems);

		Blaze.renderWithData(Template.canvasItem, data, canvas);
	}
});



