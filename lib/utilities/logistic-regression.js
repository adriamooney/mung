MungLogisticRegression = {
	init: function(data_set_id, num_iterations){
		// steps: get numeric
		// get the data and input into numeric as matrix
		// then send to a calc cost
		// then send to a calc gradient 
		// return answer

		/*  EXAMPLES for using Numeric
		// http://www.numericjs.com/documentation.html		
		// CREATE A MATRIX
		var A = [[1, 2, 3], [4, 5, 6], [7, 1, 9]];
		console.log(A);
		// DO STUFF 
		// numeric.[[whatever]]
		var B = numeric.add(A[0], A[1], A[2]);
		console.log(B);
		var x = numeric.linspace(0, 6.3, 25);
		console.log(x);
		*/ 
		var data = DataSetData.findOne({ref_id: data_set_id});
		// var data_sum = DataSetSummary.findOne({_id: data_set_id});
		// var mean;
		
			 // because we're storing the index values we have to iterate through 
			 // and skip those -- thereby creating a "matrix" of just the feature values
			
		var feature_data = [];
		var theta = [];
		var theta_temp = [];
		for (i=1; i < data.row_data.length; i++) {
			feature_data[i-1] = data.row_data[i];
			theta_temp[i-1] = 0;
		}
		// NOT SURE IF I SHOULD BE CALCULATING THETA OR INITIALIZING IT TO ZEROS
		// WAS GETTING BAD RESULTS WITH INIT TO ZERO SO USING NORMALIZED EQUATION TO CALC THETA
			// notes say that feature scaling isn't needed for Normal Equation
			// BUT may need to feature scale if we're using gradient descent
		//var scaled_data = MungLogisticRegression.scale_data(feature_data, mean);
		//theta = MungLogisticRegression.calc_theta(feature_data, data.classifiers);
		//theta_temp[0] = 0;
		theta[0] = theta_temp;
		/* 
		// TO DO: establish method for one-vs-all
		// 		currently assumes only one classification
		*/ 
		var hypothesis = MungLogisticRegression.calc_hypoth(feature_data, theta);	
		// remember: sigmoid returns a probablity: p(y|x; theta);
		var sigmoid = MungLogisticRegression.calc_sigmoid(hypothesis);
		var alpha = .01;
		var cost = [];
			cost[0] = MungLogisticRegression.calc_cost(sigmoid, data.classifiers);
		
		var grad = MungLogisticRegression.calc_gradient(feature_data, data.classifiers, sigmoid);
		for (var j=1; j< num_iterations; j++) {
			var new_params = MungLogisticRegression.gradient_descent(feature_data, data.classifiers, theta, cost[j-1], alpha);
				// we want to make sure alpha is set to an approriate size
				// this will help us regulate alpha automatically
				// NOTE: alpha is init to .01
			cost[j] = new_params.cost;
			theta = new_params.theta;
			/*if (cost[j-1] > cost[j]) {
				alpha = alpha / 2;
			} else {
				alpha = alpha * 1.3;
			} */
		}
		console.log(cost);
	},
	calc_scale_data: function(raw_data, mean){
		var scaled_data;
		return scaled_data;
	},
	calc_theta: function(features, classifications) {
		var feat_trans = numeric.transpose(features);
		var feat_trans_prod = numeric.dot(feat_trans, features);
		// then get the inverse of it
			feat_trans_prod = numeric.inv(feat_trans_prod);
		var feat_class_prod = numeric.dot(feat_trans, classifications);
		var theta_temp = numeric.dot(feat_trans_prod, feat_class_prod);
		// morphing flat array into a single-row vector for handling later in code
		var theta = [];
		theta[0] = theta_temp;
		return theta;
	},
	calc_hypoth: function(features, theta){
		var hypothesis = numeric.dot(theta, features);
		return hypothesis; 
	},
	calc_sigmoid: function(hypothesis){
		/*
			hypothesis = numeric.mul(hypothesis, -1)
			hypothesis = numeric.exp(hypothesis);
			hypothesis = numeric.add(hypothesis, 1);
			var sigmoid = numeric.div(1, hypothesis);
		*/
		var sigmoid = [];
		for(i=0; i<hypothesis[0].length; i++) {
			hypothesis[0][i] = hypothesis[0][i] * -1;
			sigmoid[i] = 1 / (1 + Math.exp(hypothesis[0][i]));
		}
		return sigmoid;
	},
	calc_gradient: function(features, classifications, sigmoid){
		// OCTAVE VERSION:
		// hypothesis = sigmoid(X * theta);
		// error = hypothesis - y;
		// grad = (X' * error) / m;
		var error = numeric.sub(sigmoid, classifications);
		var feat_transpose = numeric.transpose(features);
		var feat_error = numeric.dot(error, feat_transpose);

		var grad = numeric.div(feat_error, classifications.length);
		console.log(grad);
		return grad; 
	},
	calc_regularization: function(theta, lambda){

	},
	calc_cost: function(sigmoid, classifications) {
		// mathematical forumla of cost function:
		// 	J = -y(log(hypothesis)) - ((1 - y)log(1-hypothesis))) / m;
		// ocatave version of what we're doing:
		// 	J = (-y' * (log(hypothesis)) - ((1 - y)' * log(1-hypothesis))) / m;
		
		var class_neg = numeric.mul(classifications, -1);
		var log_sig = numeric.log(sigmoid);
		var one_min_class = numeric.sub(1, classifications);
		var one_min_sig = numeric.sub(1, sigmoid);
			one_min_sig = numeric.log(one_min_sig);
		var cost_temp1 = numeric.mul(class_neg, log_sig);
		var cost_temp2 = numeric.mul(one_min_class, one_min_sig);
		var cost = numeric.sub(cost_temp1, cost_temp2);
		//cost = numeric.div(cost, classifications.length);
		// BUG: getting array of costs; should only get one cost
		// just taking first entry since that's the "right answer"
		//console.log(cost);
		return cost[0]; 

	}, 
	gradient_descent: function(feature_data, classifications, current_theta, current_cost, alpha) {
		var alpha_cost = current_cost * alpha;
		var theta = numeric.sub(current_theta, alpha_cost);		
		var hypothesis = MungLogisticRegression.calc_hypoth(feature_data, theta);			
		var sigmoid = MungLogisticRegression.calc_sigmoid(hypothesis);
		var cost = MungLogisticRegression.calc_cost(sigmoid, classifications);
		var new_params = {
			alpha: alpha,
			cost: cost,
			theta: theta
		}
		return new_params;
	}



}