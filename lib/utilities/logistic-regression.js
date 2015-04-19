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
		// because we're storing the index values we have to iterate through 
		// and skip those -- thereby creating a matrix of just the feature values
		var feature_data = [];
		for (i=1; i < data.row_data.length; i++) {
			feature_data[i] = data.row_data[i];
		}
		feature_data[0] = [];
		// we have to add the intercept terms 
		// (very important and over looked for WAY too long!!)
		feature_data[0] = numeric.rep([feature_data[1].length], 1);
		// due to dimensionality of matrix, we need to transpose immediately
		feature_data = numeric.transpose(feature_data);
		
		// TODO: feature scale if we're using gradient descent
		//var scaled_data = MungLogisticRegression.scale_data(feature_data, mean);
		// NOT SURE IF I CAN USE NORMALIZATION FOR THETA W/ LOGISTIC REGRESSION
		// SO GOING TO JUST HARD-CODE THIS FOR GRADIENT DESCENT
		// INIT TO ZEROS
		//theta = MungLogisticRegression.calc_theta(feature_data, data.classifiers);
		//theta_temp[0] = 0;
		var dimensions = numeric.dim(feature_data);
		var theta_temp = numeric.rep([dimensions[1]], 0);
		var theta = [];
			theta[0] = theta_temp;
			// fix dimensionality, like we did with feature_data
			theta = numeric.transpose(theta);
			//console.log(numeric.dim(theta));
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
		//var grad = [];
		 //grad[0] = MungLogisticRegression.calc_gradient(feature_data, data.classifiers, sigmoid);
		for (var j=1; j< num_iterations; j++) {
			var new_params = MungLogisticRegression.gradient_descent(feature_data, data.classifiers, theta, cost[j-1], alpha);
				// we want to make sure alpha is set to an approriate size
				// this will help us regulate alpha automatically
				// NOTE: alpha is init to .01
			cost[j] = new_params.cost;
			//grad[j] = new_params.gradient;
			theta = new_params.theta;
				console.log(theta)
			if (cost[j-1] > cost[j]) {
				alpha = alpha / 2;
			} else {
				alpha = alpha * 1.3;
			} 
		}
		console.log(cost);
		//console.log(grad);
	},
	calc_scale_data: function(raw_data, mean){
		var scaled_data;
		return scaled_data;
	},
	calc_hypoth: function(features, theta){
		var hypothesis = numeric.dot(features, theta);
		console.log(numeric.dim(hypothesis));
		return hypothesis; 
	},
	calc_sigmoid: function(hypothesis){
		
		// NOTE:
			// SIGMOID(LARGE_POSTIVE_INT) --> 1
			// SIGMOID(LARGE_NEGATIVE_INT) --> 0
			// SIGMOID(0) == 0.5
			hypothesis = numeric.mul(hypothesis, -1)
			hypothesis = numeric.exp(hypothesis);
			hypothesis = numeric.add(hypothesis, 1);
			var sigmoid = numeric.div(1, hypothesis);
			console.log(sigmoid);
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
		// NOTE: THE ABOVE IS THE ** SUM ** OF THE INNER DIVIDED BY M (the num of examples)
		// 	SORT of like an average... 
		console.log(numeric.dim(sigmoid));
		
		var classifieds = [];
		classifieds[0] = classifications;
		classifieds = numeric.transpose(classifieds);
		var class_neg = numeric.mul(classifieds, -1);
		console.log(numeric.dim(class_neg));
		var log_sig = numeric.log(sigmoid);
		
		var cost_temp1 = numeric.mul(class_neg, log_sig);
		
		var one_min_class = numeric.sub(1, classifieds);
		var one_min_sig = numeric.sub(1, sigmoid);
			one_min_sig = numeric.log(one_min_sig);		
		var cost_temp2 = numeric.mul(one_min_class, one_min_sig);

		var cost = numeric.sub(cost_temp1, cost_temp2);
			cost = numeric.sum(cost);
			cost = numeric.div(cost, classifications.length);
		console.log(cost);
		return cost; 

	}, 
	gradient_descent: function(features, classifications, current_theta, current_cost, alpha) {
		var alpha_cost = current_cost * alpha;
		console.log(current_theta);
		var theta = numeric.sub(current_theta, alpha_cost);		
		var hypothesis = MungLogisticRegression.calc_hypoth(features, theta);			
		var sigmoid = MungLogisticRegression.calc_sigmoid(hypothesis);
		var cost = MungLogisticRegression.calc_cost(sigmoid, classifications);
		//var gradient = MungLogisticRegression.calc_gradient(features, classifications, sigmoid);
		var new_params = {
			alpha: alpha,
			theta: theta,
			cost: cost//,
			//gradient: gradient
		}
		return new_params;
	}
}