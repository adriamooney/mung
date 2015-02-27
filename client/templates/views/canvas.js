Template.canvas.helpers({
	canvasItems: function() {
		var selected_dataset = Session.get('selected_dataset');
		console.log(selected_dataset);

		var arr = [];

		if(selected_dataset) {
			for (var key in selected_dataset) {
				if (selected_dataset.hasOwnProperty(key)) {

					var data = DataSetSummary.findOne({_id: selected_dataset[key]});
					arr.push(data);

			  	}   
			}

			return arr;
		}
	}
});