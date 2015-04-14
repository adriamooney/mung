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
		for (i=1; i < data.row_data.length; i++) {
			feature_data[i-1] = data.row_data[i];
		}
		// NOT SURE IF I SHOULD BE CALCULATING THETA OR INITIALIZING IT TO ZEROS
		// WAS GETTING BAD RESULTS WITH INIT TO ZERO SO USING NORMALIZED EQUATION TO CALC THETA
			// notes say that feature scaling isn't needed for Normal Equation
			// BUT may need to feature scale if we're using gradient descent
		//var scaled_data = MungLogisticRegression.scale_data(feature_data, mean);
		theta = MungLogisticRegression.calc_theta(feature_data, data.classifiers);
		/* 
		// TO DO: establish method for one-vs-all
		// 		currently assumes only one classification
		*/ 
		var hypothesis = MungLogisticRegression.calc_hypoth(feature_data, theta);	
		// remember: sigmoid returns a probablity: p(y|x; theta);
		var sigmoid = MungLogisticRegression.calc_sigmoid(hypothesis);
		var alpha = .01;
		var cost = MungLogisticRegression.calc_cost(sigmoid, data.classifiers);
		//MungLogisticRegression.calc_gradient(feature_data, data.classiers, alpha);
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
		var hypothesis = numeric.dot(features, theta);
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
	calc_gradient: function(features, classifications, alpha){

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
		//var cost = numeric.div(cost, classifications.length);
		console.log(cost);
		return cost[0]; 
		/*
		// we'll need this loop for getting the negative classifications "-y"
		// while we're there, we'll also get (1 - sigmoid) for each value of sigmoid
		// also use this to claculate (1 - y)
		var class_neg = [];
		var one_sig = [];
		var one_neg_class = [];
		
		for (var i = 0; i < classifications.length; i++) {
			class_neg[i] = classifications[i] * -1;
			one_sig[i] = 1 - sigmoid[i];
			one_neg_class[i] = 1 - classifications[i];
		}
		
		var class_neg_inv = numeric.inv(class_neg);
		var one_neg_class_inv = numeric.inv(one_neg_class);
		var log_sig = numeric.log(sigmoid);
		var log_1_sig = numeric.log(one_sig);

		var pos_ex = numeric.dot(class_neg_inv, log_sig);
		var neg_ex = numeric.dot(one_neg_class_inv, log_1_sig);
		var cost = numeric.sub(pos_ex, neg_ex);
		cost = numeric.div(cost, classifications.length);
		*/
	}


}