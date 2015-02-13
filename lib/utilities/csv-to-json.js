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
		var file_url = url_base + files_dir + file_info.name;
		//console.log(file_url);

		// this is all very proceedural. 
		// should probably refactor so it's structured as callbacks 
		MungCSV.read_file(file_url);
		//return file_url;

		/*
		var read_file = MungCSV.read_file(file_url);
		var parsed_file = MungCSV.parse_file(read_file);
		var formated_data = MungCSV.format_parsed_data(parsed_file);

		return formated_data;
		*/
	},// END CSV_TO_JSON	
	
	read_file: function(file_url){
		var fs = Meteor.npmRequire('fs');

		// currnetly using the synchronous version of this
		var file_data = fs.readFileSync(file_url).toString();

		MungCSV.parse_file(file_data);

		//return file_data;
		// below is an ATTEMPT at the async but that wasn't going anywhere
		// if you do enable the async code block
		// you'll see it ouptuts the buffer into some wierd prime number (in an array)
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
			MungCSV.format_parsed_data(parsed_output);
		}); // END PARSER
	},// END PARSE_FILE
	
	format_parsed_data: function(parsed_output){
		// view what the parser outputs
		//console.log(parsed_output);
		// How this works:  (there's probably a better way to do this...maybe somehow treating things like a vector)
		// 1. get the first line and it's length
		// 		the length tells us how many features / columns in the data there are
		//		GOTCHA ASSUMPTION: we assume the first line of the file is column headings and not real values...
		var first_line = parsed_output[0];
		var first_line_length = first_line.length;
		
		// console.log(first_line);
		
		// 2. then create an array of each property (to have as a discrete list)
		//	  this is also used to understand the demensions of the array 
		//  	i.e. what data goes with what columns
		var file_props = {};
		var file_rows = {};
		for (var i = 0; i<first_line_length; i++) {
			file_props[i] = first_line[i];
			file_rows[i] = [];
		}
		// console.log(file_props);
		
		// 3. last, we create an object that contains "x-number" of arrays with the row values
		// 		we do this by looping through the parsed_output array 
		//		(starting at 1, the assumed "first row" of "real data")
		//		take each row, and loop through it 
		//		on each iteration of parsed_data, we push the values into the associated array
		//		of properites that correspond to the correct column		
		
		// start outer loop (which goes through the parsed_ouptut array)
		for (var i = 1; i<parsed_output.length; i++) {
			// start inner-loop
			var current_parsed_array = parsed_output[i];
			//console.log(current_parsed_array);
			for (var j = 0; j < first_line_length; j++) {
				// console.log(current_parsed_array[j]);
				file_rows[j].push(current_parsed_array[j]);	
			}// end inner-loop
			 //  console.log(file_rows);
		}// end outer loop
		var csv_data = [file_props, file_rows];
		MungCSV.csv_data = csv_data;
		//return csv_data;
	}
};
