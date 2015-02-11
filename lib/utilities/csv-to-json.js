MungCSV = {
	csv_to_json: function(file_info) {
		//console.log(file_info);
		var path = Meteor.npmRequire('path');

		// use this to determine the path for node
		// console.log(process.cwd())
		// then split (url_base) to get a more relative directory
		var url_base = path.resolve('.').split('.meteor')[0];
		// console.log(url_base);
		var files_dir = ".uploads/";
		var file_url = path.join(url_base, files_dir, file_info.name);
		//console.log(file_url);
		MungCSV.read_file(file_url);
	},// END CSV_TO_JSON	
	
	read_file: function(file_url){
		var fs = Meteor.npmRequire('fs');

		// currnetly using the synchronous version of this
		// below is an ATTEMPT at the async but that wasn't going anywhere
		// if you do enable the async code block
		// you'll see it ouptuts the buffer into some wierd prime number (in an array)
		file_data = fs.readFileSync(file_url).toString();
		MungCSV.parse_file (file_data);

		/*fs.readFile(file_url, function(error, data){
			if (error) throw error;
			//console.log(data);
			console.log(data.length);
			//file_data = JSON.parse(data);
			//MungCSV.parse_file(file_data);
			//console.log(file_data);
		})// END FS.READFILE */
	},// END READ_FILE
	
	parse_file: function(file_data) {
		var parser = Meteor.npmRequire('csv-parse');
		
		parser(file_data, function(error, parsed_output){
			if (error) throw error;
			MungCSV.load_into_collections(parsed_output);
		}); // END PARSER
	},// END PARSE_FILE
	
	load_into_collections: function(parsed_output){
		// view what the parser outputs
		//console.log(parsed_output);
		// How this works:  (there's probably a better way to do this)
		// 1. will get the lenght of the first line
		// 	to get the number of properities
		var first_line = parsed_output[0];
		var first_line_length = first_line.length;
		console.log(first_line);
		
		// 2. then create an array of each property (to have as a discrete list)
		//	  this is also used to understand the demensions of the array 
		//  	i.e. what data goes with what columns
		var file_props = {};
		for (i = 0; i<first_line_length; i++) {
			file_props[i] = first_line[i];
		}
		console.log(file_props);
		// 3. going to do two loops: 
		//		first "outer loop" controls the pointer for the property/column to associate in the array
		//		second 'inner loop' controls the association of the column-values with the proprety list
		//		then create an another object that contains "n-number arrays" of each value
		// 		using the length of the first line as the increment value for the loop
		
		// 		... or (plan b) maybe use a modus becuase if x % first_line_length !=0, then i know it's not the right property...
		var data_values = {};
		var value_array_container = [];
		
		// start outer loop
		for (i = 0; i<first_line_length; i++) {
			// start inner-loop
			// note: starting pointer as length + 1
			var x = 0;
			for (j = first_line_length+i+1; j < parsed_output.length; j + first_line_length) {
				/*if (j > parsed_output.length) {  DO I NEED THIS??? 
				} */
				console.log(j);
				value_array_container.push(parsed_output[j]);
				x++;
				console.log(value_array_container);
			}// end inner-loop
				data_values[i] = value_array_container;
				console.log(data_values);
		}// end outer loop


	}// END LOAD_INTO_COLLECTIONS

};
