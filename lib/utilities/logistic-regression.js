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
		console.log(num_iterations);
		var data = DataSetData.findOne({ref_id: data_set_id});
		// because we're storing the index values we have to iterate through 
		// and skip those -- thereby creating a matrix of just the feature values
		var feature_data = [];
		for (var i=1; i < data.row_data.length; i++) {
			feature_data[i] = data.row_data[i];
		}
		// getting this number later was a POA so just nabbing it here
		var num_examples = feature_data[1].length;
		feature_data[0] = [];
		// we have to add the intercept terms 
		// (very important and over looked for WAY too long!!)
		feature_data[0] = numeric.rep([feature_data[1].length], 1);
		// due to dimensionality of matrix, we need to transpose immediately
		feature_data = numeric.transpose(feature_data);
		// same dimeniontality fixes for the classifications
		var classifications = [];
			classifications[0] = data.classifiers;
			classifications = numeric.transpose(classifications);
			
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
		var cost = [];
		var grad = [];
		var hypothesis = [];
		var sigmoid = [];
		var alpha = .01;

		for (var j=0; j< num_iterations; j++) {
		console.log("---- LOOP #   " + j + "-------");
			hypothesis[j] = MungLogisticRegression.calc_hypoth(feature_data, theta);	
		// remember: sigmoid returns a probablity: p(y|x; theta);
			sigmoid[j] = MungLogisticRegression.calc_sigmoid(hypothesis[j]);
			cost[j] = MungLogisticRegression.calc_cost(sigmoid[j], classifications, num_examples);
		 	grad[j] = MungLogisticRegression.calc_gradient(feature_data, classifications, sigmoid[j], num_examples);
			var theta_temp = MungLogisticRegression.gradient_descent(feature_data, classifications, theta, hypothesis[j], sigmoid[j], grad[j], alpha, num_examples);
				theta = theta_temp;
			if (cost[j-1] > cost[j]) {
				alpha = alpha / 2;
			} else {
				alpha = alpha * 1.3;
			}
		}
		console.log(theta);
		console.log(cost);
		console.log(grad);
	},
	calc_scale_data: function(raw_data, mean){
		var scaled_data;
		return scaled_data;
	},
	calc_hypoth: function(features, theta){
		var hypothesis = numeric.dot(features, theta);
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
		return sigmoid;
	},
	calc_gradient: function(features, classifications, sigmoid, num_examples){
		// OCTAVE VERSION:
		// hypothesis = sigmoid(X * theta);
		// error = hypothesis - y;
		// grad = (X' * error) / m;
		var error = numeric.sub(sigmoid, classifications);
		var feat_transpose = numeric.transpose(features);
		var feat_error = numeric.dot(feat_transpose, error);
		var	gradient = numeric.div(feat_error, num_examples);
		console.log(gradient);
		return gradient; 
	},
	calc_regularization: function(theta, lambda){

	},
	calc_cost: function(sigmoid, classifications, num_examples) {
		// mathematical forumla of cost function:
		// 	J = -y(log(hypothesis)) - ((1 - y)log(1-hypothesis))) / m;
		// ocatave version of what we're doing:
		// 	J = (-y' * (log(hypothesis)) - ((1 - y)' * log(1-hypothesis))) / m;
		// NOTE: for dimensional corretness, we also transpose matrices here (like in octave)
		var class_neg = numeric.mul(classifications, -1);
			class_neg = numeric.transpose(class_neg);
		var log_sig = numeric.log(sigmoid);
		
		var cost_temp1 = numeric.dot(class_neg, log_sig);
		
		var one_min_class = numeric.sub(1, classifications);
			one_min_class = numeric.transpose(one_min_class);
		var one_min_sig = numeric.sub(1, sigmoid);
			one_min_sig = numeric.log(one_min_sig);		
		var cost_temp2 = numeric.dot(one_min_class, one_min_sig);

		var cost = numeric.sub(cost_temp1, cost_temp2);
			cost = numeric.div(cost, num_examples);
		console.log(cost[0][0]);
		return cost[0][0]; 

	}, 
	gradient_descent: function(features, classifications, current_theta, hypothesis, sigmoid, current_gradient, alpha, num_examples) {
			/*
			// error = hypothesis - y;
			// grad = (X' * error) / m;
			*/
			console.log("inside gradient descent:   START");
		var alpha_cost = numeric.mul(alpha, current_gradient);
		var theta = numeric.sub(current_theta, alpha_cost);	
			console.log(theta);
		
		console.log("inside gradient descent:   END");
		return theta;
	}
}