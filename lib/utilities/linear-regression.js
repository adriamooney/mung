MungLinearRegression = {
	init: function (data_set_id, num_iterations) {
		var data = DataSetData.findOne({ref_id: data_set_id});
		 // because we're storing the index values we have to iterate through 
		 // and skip those -- thereby creating a "matrix" of just the feature values
		var feature_data = [];
		var theta = [];
		for (var i=1; i < data.row_data.length; i++) {
			feature_data[i] = data.row_data[i];
		}
		// then we need to account for the intercept term
		// we'll set them all to 1 and treat it like a "normal feature"
		feature_data[0] = [];
		feature_data[0] = numeric.rep([feature_data[1].length], 1);
		feature_data = numeric.transpose(feature_data);

		console.log(numeric.dim(feature_data));

		// PRETTY SURE
		// that if features are < 10,000, we are okay to use Normal Equation
		// to calc theta (at global minimum)
		// so just getting theta, calc'ing cost at that theta and returning answer
		if(feature_data.length < 10000) {
		 theta = MungLinearRegression.calc_theta(feature_data, data.classifiers);
		 // dimensional requirements force a transpose here (counterintuitively)
		 theta = numeric.transpose(theta);
		 //console.log(numeric.dim(theta));	
		var hypothesis = MungLinearRegression.calc_hypoth(feature_data, theta);
		var cost = MungLinearRegression.calc_cost(feature_data, hypothesis, data.classifiers);
		/* REMOVE AFTER TESTING
		:: this is a "unit test" (kinda) on known data...
		var prediction1 = numeric.dot([1, 3.5], theta);
		prediction1 = prediction1 * 10000;
		console.log(prediction1);
		var prediction2 = numeric.dot([1, 7], theta);
		prediction2 = prediction2 * 10000;
		console.log(prediction2);
		*/
		var prediction_multi = numeric.dot([1, 1650, 3], theta);
		console.log(prediction_multi);
				
		} else {
		//if > 10,000 features, then we'll run stochastic gradient descent
		
		// STOCHASTIC GRADIENT DESCENT
		// outer loop
		// NEEDED: way to randomize data but keep maping for classifications...
		var theta = numeric.rep([feature_data.length - 1],0);
		console.log(theta);
		var alpha = .01;
		var grad = [];
		var cost = [];
		for (var j = 0; j < num_iterations; j++ ){
			// stochastic gradient descent 
			console.log("iteration:   " + j);
			for (var t = 0; t < feature_data.length; t++) {
				var hypothesis = MungLinearRegression.calc_hypoth(feature_data[t], theta);
				var current_cost = MungLinearRegression.calc_cost(hypothesis, data.classifiers[0][t]);	
				var new_params = MungLinearRegression.gradient_descent(feature_data[t], data.classifiers[0][t], theta, current_cost, alpha);
				cost[t] = new_params.cost;
				//grad[j] = new_params.gradient;
				theta = new_params.theta;
				/*if (cost[t-1] > cost[t]) {
					alpha = alpha / 2;
				} else {
					alpha = alpha * 1.3;
				} */
			} // end Stochastic GD
			console.log(cost);
		}// end outer loop  

		} // END STOCHASTIC GD
	}, 
	calc_theta: function(features, classifications) {
		// THETA = inv(features' * features) * features' * y
		var feat_trans = numeric.transpose(features);
		var feat_trans_prod = numeric.dot(feat_trans, features);
		// then get the inverse of it
			feat_trans_prod = numeric.inv(feat_trans_prod);
		// var feat_feat_prod = numeric.dot(feat_trans_prod, feat_trans);
		var feat_class_prod = numeric.dot(feat_trans, classifications);
		// var theta_temp = numeric.dot(feat_feat_prod, classifications);
		var theta_temp = numeric.dot(feat_class_prod, feat_trans_prod);
		// morphing flat array into a single-row vector for handling later in code
		var theta = [];
		theta[0] = theta_temp;
		console.log(theta);	
		return theta;
	},
	calc_hypoth: function(features, theta){
		// h = X * theta; % first calculate the hypothesis 
		//theta = numeric.transpose(theta);
		var hypothesis = numeric.dot(features, theta);
		console.log(hypothesis);
		console.log(numeric.dim(hypothesis));
		return hypothesis; 
	}, 
	calc_cost: function(features, hypothesis, classifications) {
		// mathematical forumla of cost function:
		// error = h - y; % then calculate the erorr (h - y)
		// error_sqr = error.^2; % square it
		// q_sum = sum(error_sqr); % sum it
		// J = q_sum / (2*m); % input into final cost function
		
		// the first bit of this is formatting classification data 
		// so that it's "shape" is correct
		var classifieds = [];
		classifieds[0] = classifications;
		classifieds = numeric.transpose(classifieds);
		//console.log(numeric.dim(classifieds));
		var error = numeric.sub(hypothesis, classifieds);
		// using if/else to control for correct version of algorithm to use
		// hypothesis will be m x n where "n" == # of features
		// if > 2 features, then it's multivariate (first term is "bias")
		// MULTIVARIATE
		if (features[1].length > 2) { 
			var error_trans = numeric.transpose(error);
			var error_trans_prod = numeric.dot(error_trans, error);
			var cost = error_trans_prod / (2 * classifications.length);
			console.log('multivariate');

		} // UNIVARIATE 
		else {  
			var error_sqr = numeric.pow(error, 2);
			var sq_sum = numeric.sum(error_sqr);
			var cost = sq_sum / (2 * classifications.length);
			console.log('uni-variate');
		}
		console.log(cost);
		return cost; 
	}, 
	gradient_descent: function(features, classifications, current_theta, current_cost, alpha) {
		var alpha_cost = current_cost * alpha;
		var theta = numeric.sub(current_theta, alpha_cost);		
		var hypothesis = MungLinearRegression.calc_hypoth(features, theta);			
		var cost = MungLinearRegression.calc_cost(hypothesis, classifications);
		//var gradient = MungLinearRegression.calc_gradient(features, classifications);
		var new_params = {
			alpha: alpha,
			theta: theta,
			cost: cost//,
			//gradient: gradient
		}
		return new_params;
	}

}