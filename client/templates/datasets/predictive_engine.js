Template.choosePredictiveEngine.events({
	'click #predictive-engine-choice': function (event, template) {
		var engine = template.find(".choosePredictiveEngine input[type='radio']:checked").value;
		if(engine == 'logisticReg') {
			var iterations = template.find(".gradient_iterations option:selected").value;
			var logistic_regression = MungLogisticRegression.init(this._id, iterations);
			// after getting the logistic regression response
			// set it to a session and instatiate a new template that presents an input
			// then click to get a prediction
		}// end logistic regression
	}

});