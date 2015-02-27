Template.dataSetsList.helpers({
	'dataSets': function() {
		return DataSetSummary.find();
	},
	dataPresent: function() {
		//if (DataSetSummary.find().count() >= 1) {
			return DataSetSummary.find().count();
		//}
	}

});

Template.dataSetsList.events({
	'click .dataset-list-item': function(e) {

		//This gets the id of the selecteddataset and adds it to an object to be saved in the session variable 'selecteddataset';

		var datasetId = this._id;
		//console.log(datasetId);

		var selectedItems = Session.get('selected_dataset', selectedItems);
		if(!selectedItems) {
			var selectedItems = {};
		}

		selectedItems[datasetId] = datasetId;
        Session.set('selected_dataset', selectedItems);
        //console.log(Session.get('selecteddataset'));
         // we're going ot make sure the summary stats are in place  	 	
	    // we do this now because the user is implying he/she will need that information soon 	 	
		// if the stats haven't yet been calculated 	 	
		// then we calculate them  	 	
		Meteor.call("get_summary_stats", collectionId); 
		
	},
	'click .settings-toggle': function(e) {
		//this function is redundant to ones in canvas_item.js.  need to make global functions instead, and call them here
		var optionsDiv = e.currentTarget.nextElementSibling;
		optionsDiv.style.display = (optionsDiv.style.display != 'block' ? 'block' : 'none');
	},
	'click .delete': function() {
		var dataset = DataSetSummary.findOne({_id: this._id});
		Meteor.call('removeDataset', dataset);
		console.log('dataset removed');
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
		Meteor.call('updateDatasetName', id, newVal, function() {

			//this doesn't really update the canvas item template {{title}}, it's just in the dom
			if(canvasName) {
				canvasName.innerHTML = newVal;
			}		
			document.getElementById('dataset-list-item-settings-'+id).style.display = 'none';
		});


	},
	'click .close': function(e) {
		e.currentTarget.parentElement.style.display = 'none';
	},
	'click #add-dataset': function(e) {
		$(e.currentTarget).addClass('cancel');
		$(e.currentTarget).text('Cancel');
		document.getElementById('uploader-wrap').style.display = 'block';
	},
	'click #add-dataset.cancel': function(e) {
		document.getElementById('uploader-wrap').style.display = 'none';
		$(e.currentTarget).removeClass('cancel');
		$(e.currentTarget).html('<i class="fa fa-plus-circle glyphicon glyphicon-plus"></i> Data Set');
	}
});



