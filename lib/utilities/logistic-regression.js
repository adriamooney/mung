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
			 // and skip those -- thereby creating a "matrix" of just the feature values
			 // need to create an identical matrix (NOT identity matrix!)
			// that matches feature_data on the dimensions 
			// SO we'll do it all while we're creating the feature data matrix;
		var feature_data = [];
		var theta = [];
		for (i=1; i < data.row_data.length; i++) {
			feature_data[i-1] = data.row_data[i];
		}
		// NOT SURE IF I SHOULD BE CALCULATING THETA OR INITIALIZING IT TO ZEROS
		// WAS GETTING BAD RESULTS WITH INIT TO ZERO SO USING NORMALIZED EQUATION TO CALC THETA
		theta = MungLogisticRegression.calc_theta(feature_data, data.classifiers);
		/* 
		// TO DO: establish method for one-vs-all
		// 		currently assumes only one classification
		*/ 
		var hypothesis = MungLogisticRegression.calc_hypoth(feature_data, theta);	
		var sigmoid = MungLogisticRegression.calc_sigmoid(hypothesis);
		var alpha = .01;
		//MungLogisticRegression.calc_gradient_des(feature_data, data.classiers, alpha);
	},
	calc_theta: function(features, classifications) {
		var feat_trans = numeric.transpose(features);
		var feat_trans_prod = numeric.dotMMbig(feat_trans, features);
		var feat_class_prod = numeric.dotMV(feat_trans, classifications);
		var theta_temp = numeric.dotMV(feat_trans_prod, feat_class_prod);
		// SUSPICION: morphing flat array into a single-row vector for handling later in code
		var theta = [];
		theta[0] = theta_temp;
		return theta;
	},
	calc_hypoth: function(features, theta){
		 //console.log(features);
		 //console.log(theta);
		var hypothesis = numeric.dotVV(features, theta);
		console.log(hypothesis);
		return hypothesis; 
	},
	calc_sigmoid: function(hypothesis){
		console.log(hypothesis);
		for(i=0; i<hypothesis[0].length; i++) {
			//console.log(hypothesis[i]);
			hypothesis[0][i] = hypothesis[i] * -1;
		}
		console.log(hypothesis);
		var sigmoid = 1.0 / (1.0 + Math.exp(hypothesis));
		return sigmoid;
	},
	calc_gradient_des: function(features, classifications, alpha){

	},
	calc_regularization: function(theta, lambda){

	}


}