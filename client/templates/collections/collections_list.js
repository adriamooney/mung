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
	'click .collection-list-item': function(e) {

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

        //render the canvasItem template into the canvas
        var canvasItem = document.getElementById('canvas-item-'+this._id);
        if(!canvasItem) {
        	Blaze.renderWithData(Template.canvasItem, data, canvas);
        }
		
	},
	'click .settings-toggle': function(e) {
		//this function is redundant to ones in canvas_item.js.  need to make global functions instead, and call them here
		var optionsDiv = e.currentTarget.nextElementSibling;
		optionsDiv.style.display = (optionsDiv.style.display != 'block' ? 'block' : 'none');
	},
	'click .delete': function() {
		var collection = Collections.findOne({_id: this._id});
		Meteor.call('removeCollection', collection);
		console.log('collection removed');
	},
	/*'click .edit': function(e) {
		var el = e.currentTarget;
		var currInput = $(el).parent().find('input');
		console.log(currInput);
		$(currInput).focus();
	}, */
	'submit form': function(e) {
		e.preventDefault();
		var el = e.currentTarget;
		var id = this._id;

		var title = this.title;

		var currVal = $(el).parent().find('input');
		var newVal = currVal[0].value;
		var canvasName = document.getElementById('canvas-item-title-'+this._id);

		//update name
		Meteor.call('updateCollectionName', id, newVal, function() {

			//this doesn't really update the canvas item template {{title}}, it's just in the dom
			canvasName.innerHTML = newVal;
		});


	},
	'click .close': function(e) {
		e.currentTarget.parentElement.style.display = 'none';
	},
	'blur .edit-name': function(e) {
		e.currentTarget.style.border = 'none';
	} 
});



