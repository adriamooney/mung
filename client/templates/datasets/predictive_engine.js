Template.choosePredictiveEngine.events({
	'click #predictive-engine-choice': function (event, template) {
		var engine = template.find(".choosePredictiveEngine input[type='radio']:checked").value;
		if(engine == 'logisticReg') {
			var iterations = template.find(".gradient_iterations option:selected").value;
			var logistic_regression = MungLogisticRegression.init(this._id, iterations);

		}// end logistic regression
	}

});
