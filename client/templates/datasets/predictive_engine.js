Template.choosePredictiveEngine.events({
	'click #predictive-engine-choice': function (event, template) {
		var engine = template.find(".choosePredictiveEngine input[type='radio']:checked").value;
		if(engine == 'logisticReg') {
			console.log(this);
			var iterations = template.find(".logistic_iterations_"+this._id+" option:selected").value;
			var logistic_regression = MungLogisticRegression.init(this._id, iterations);
			// after getting the logistic regression response
			// set it to a session and instatiate a new template that presents an input
			// then click to get a prediction
		}// end logistic regression
		else if (engine == 'linearReg') {
			var iterations = template.find(".linear_iterations_"+this._id+" option:selected").value;
			var logistic_regression = MungLinearRegression.init(this._id, iterations);
		}
	}

});
