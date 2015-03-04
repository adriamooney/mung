Template.sidebar.events({
	'click #collsapse-sidebar': function(e) {
		$('#datasets-wrap').hide();

		$('#sidebar').removeClass('col-md-4');
		$('#sidebar').addClass('contracted');
		$('#canvas').removeClass('col-md-8');


		$(e.currentTarget.parentElement).html('<button id="expand-sidebar" class="btn btn-xs btn-default"><i class="glyphicon glyphicon-triangle-right"></i><i class="glyphicon glyphicon-menu-hamburger"></i></button>');		
	},
	'click #expand-sidebar': function(e) {
	

		$('#sidebar').addClass('col-md-4');
		$('#sidebar').removeClass('contracted');
		$('#canvas').addClass('col-md-8');

		$('#datasets-wrap').fadeIn();

		$(e.currentTarget.parentElement).html('<button id="collsapse-sidebar" class="btn btn-xs btn-default"><i class="glyphicon glyphicon-triangle-left"></i><i class="glyphicon glyphicon-menu-hamburger"></i></button></button>');	
	}
});