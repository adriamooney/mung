Template.dataSetsList.helpers({
	'dataSets': function() {
		return DataSetSummary.find();
	},
	dataPresent: function() {
		//if (DataSetSummary.find().count() >= 1) {
			return DataSetSummary.find().count();
		//}
	},
	dataLoading: function() {
		var loading = ServerSession.get('csv_to_json_running');
		console.log(loading);
		if(loading != 'loading') {
			return false;
		}
		else {
			return true;
		}

	},
	canUpload: function() {
		var account_code = Meteor.user().profile.accountCode;
		var data_sets = DataSetSummary.find().count();

		if( account_code == 1 ) {
			//free account
			if(data_sets < 1) {
				return true;
			}
		}
		if(account_code == 2 || account_code == 3) {
			//non profile and business
			if(data_sets < 20) {
				return true;
			}
		}
		if(account_code == 4) {
			//enterprise
			return true;
		}
		else {
			return false;
		}
		//There is a maximum number of datasets a customer (or a user within an organization) can upload determined by the plan type
		//free: 1 dataset (? not sure if that's possible ATM)
		//business: 20
		//non-profit: 20
		//enterprise: unlimited
	},
	showCancelButton: function() {
		var show = Session.get('uploadDataSet');

		if (show == '' || show == undefined) {
			return true;

		}
		
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
		Meteor.call("get_summary_stats", datasetId); 
		
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
	'click #add-dataset': function(e, instance) {	
		//used for dynamic template upload widget and for cancel button
		Session.set('uploadDataSet', 'uploadDataSet');

	},
	'click #cancel-add-dataset': function(e) {

		Session.set('uploadDataSet', '');

	}
});


//dynamic template to show and hide upload widget.  
Template.showUploadDataSet.helpers({  
  showUploadDataSet: function() {
    return Session.get('uploadDataSet');
  }
});







