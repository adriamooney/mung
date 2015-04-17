MungLinearRegression = {
	init: function (data_set_id, num_iterations) {
		var data = DataSetData.findOne({ref_id: data_set_id});
		 // because we're storing the index values we have to iterate through 
		 // and skip those -- thereby creating a "matrix" of just the feature values
				
		var feature_data = [];
		var theta = [];
		// var theta_temp = [];
		for (i=1; i < data.row_data.length; i++) {
			feature_data[i-1] = data.row_data[i];
			//theta_temp[i-1] = 0;
		}
		// PRETTY SURE
		// that if features are < 10,000, we are okay to use Normal Equation
		// to calc theta (at global minimum)
		// so just getting theta, calc'ing cost at that theta and returning answer
		theta = MungLinearRegression.calc_theta(feature_data, data.classifiers);
		var hypothesis = MungLinearRegression.calc_hypoth(feature_data, theta);
		var cost = MungLinearRegression.calc_cost(hypothesis, data.classifiers);	

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
		var theta_temp = numeric.dot(feat_trans_prod, feat_class_prod);
		// morphing flat array into a single-row vector for handling later in code
		var theta = [];
		theta[0] = theta_temp;
		console.log(theta);	
		return theta;
	},
	calc_hypoth: function(features, theta){
		// h = X * theta; % first calculate the hypothesis 
		var hypothesis = numeric.dot(features, theta);
		console.log(hypothesis);
		return hypothesis; 
	}, 
	calc_cost: function(hypothesis, classifications) {
		// mathematical forumla of cost function:
		// error = h - y; % then calculate the erorr (h - y)
		// error_sqr = error.^2; % square it
		// q_sum = sum(error_sqr); % sum it
		// J = q_sum / (2*m); % input into final cost function
		var error = numeric.sub(hypothesis[0], classifications);
		console.log(error);
		var error_sqr = numeric.pow(error, 2);
		console.log(error_sqr);
		var sq_sum = numeric.sum(error_sqr);
		console.log(sq_sum);
		var cost = sq_sum / (2 * classifications.length);
		console.log(cost);
		return cost; 

	}, 
	gradient_descent: function(features, classifications, current_theta, current_cost, alpha) {
		var alpha_cost = current_cost * alpha;
		var theta = numeric.sub(current_theta, alpha_cost);		
		var hypothesis = MungLogisticRegression.calc_hypoth(features, theta);			
		var sigmoid = MungLogisticRegression.calc_sigmoid(hypothesis);
		var cost = MungLogisticRegression.calc_cost(sigmoid, classifications);
		var gradient = MungLogisticRegression.calc_gradient(features, classifications, sigmoid);
		var new_params = {
			alpha: alpha,
			theta: theta,
			cost: cost,
			gradient: gradient
		}
		return new_params;
	}

}