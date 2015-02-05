Template.canvasItem.events({
	'click .options-toggle': function(e) {
		console.log(e.currentTarget.nextElementSibling);
		var optionsDiv = e.currentTarget.nextElementSibling;


		optionsDiv.style.display = (optionsDiv.style.display != 'block' ? 'block' : 'none');


	}

});