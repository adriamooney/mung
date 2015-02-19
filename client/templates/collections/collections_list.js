Template.collectionsList.helpers({
	'collections': function() {
		return Collections.find();
	}

});

Template.collectionsList.events({
	'click .collection-list-item': function(e) {

		//This gets the id of the selectedCollection and adds it to an object to be saved in the session variable 'selectedCollection';

		var collectionId = this._id;
		//console.log(collectionId);

		var selectedItems = Session.get('selectedCollection', selectedItems);
		if(!selectedItems) {
			var selectedItems = {};
		}

		selectedItems[collectionId] = collectionId;
        Session.set('selectedCollection', selectedItems);
        //console.log(Session.get('selectedCollection'));
		
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
		var canvasName = document.getElementById('canvas-item-title-'+id);

		//update name
		Meteor.call('updateCollectionName', id, newVal, function() {

			//this doesn't really update the canvas item template {{title}}, it's just in the dom
			canvasName.innerHTML = newVal;
			document.getElementById('collection-list-item-settings-'+id).style.display = 'none';
		});


	},
	'click .close': function(e) {
		e.currentTarget.parentElement.style.display = 'none';
	}
});



