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


		var user_id = file_info.user_id;
		var org_name = file_info.org_name;
		var org_id = file_info.org_id;
		var title = file_info.name; // for now this and title are the same 
		var dt_added = file_info.dt_added;

		var info = {
		    title: title,
		    file_name: title,
		    uploadedBy: file_info.user_id,
		    orgName: org_name,
		    orgId: org_id,
	      }
  		var ref_id = Collections.insert(info);
  		var ref_id2 = DataSetSummary.insert(info);
  		console.log(ref_id2);
  		file_info.ref_id = ref_id;

  		// for now will make ref_id2 = the new collection
  		// when i'm sure it's all working correctly i'll swap them and remove the ref to the old collection
  		file_info.ref_id2 = ref_id2;

		var file_read = MungCSV.read_file(file_info, file_url);

		// this is all very proceedural. 
		// should probably refactor but it was being a pain in the ass 
		// and i'm not seeing this as a good use of time (right now)
		MungCSV.parse_file(file_info, file_read); 
	},// END CSV_TO_JSON	
	
	read_file: function(file_info, file_url){
		var fs = Meteor.npmRequire('fs');
		
		// currnetly using the synchronous version of this
		// probably makes sense to do all this async / stream-style 
		var file_data = fs.readFileSync(file_url).toString();
		 return file_data;  // -> for refactor rather than all this strange proceedural crap 
		//MungCSV.parse_file(file_info, file_data); 		
	},// END READ_FILE
	
	parse_file: function(file_info, file_data) {
		var parser = Meteor.npmRequire('csv-parse');
		// NOTE:   throw new Error("Meteor code must always run within a Fiber. "
		// Meteor needs a bind here to keep the threading/fiber straight on the parser callback
		//   	https://www.discovermeteor.com/blog/wrapping-npm-packages/
		//		http://phucnguyen.info/blog/everything-you-need-to-know-about-async-meteor/
		//		'wrap Meteor.bindEnvironment around the callback'
		parser(file_data, Meteor.bindEnvironment(function(error, parsed_output){
			if (error) throw error;
			MungCSV.format_parsed_data(file_info, parsed_output);
		})); // END PARSER
	},// END PARSE_FILE
	
	format_parsed_data: function(file_info, parsed_output){
		// How this works:  (there's probably a better way to do this...maybe somehow treating things like a vector)
		// 1. get the first line and it's length
		// 		the length tells us how many features / columns in the data there are
		//		GOTCHA ASSUMPTION: we assume the first line of the file is column headings and not real values...
		//		Probably should make that a "does file have headers" kind of boolean...
		var first_line = parsed_output[0];
		var first_line_length = first_line.length;
		
		// 2. then create an array of each property (to have as a discrete list)
		//	  this is also used to understand the demensions of the array 
		//  	i.e. what data goes with what columns
		var file_props = [];
		var file_rows = [];
		for (var i = 0; i<first_line_length; i++) {
			file_props[i] = first_line[i];
			file_rows[i] = [];
		}
		
		// 3. last, we create an object that contains "x-number" of arrays with the row values
		// 		we do this by looping through the parsed_output array 
		//		(starting at 1, the assumed "first row" of "real data")
		//		take each row, and loop through it 
		//		on each iteration of parsed_data, we push the values into the associated array
		//		of properites that correspond to the correct column		
		
		// start outer loop (which goes through the parsed_ouptut array)
		for (var i = 1; i<parsed_output.length; i++) {
			// start inner-loop
			var current_parsed_output = parsed_output[i];
			//console.log(current_parsed_array);
			for (var j = 0; j < first_line_length; j++) {
				// console.log(current_parsed_array[j]);
				file_rows[j].push(current_parsed_output[j]);	
			}// end inner-loop
			 //  console.log(file_rows);
		}// end outer loop
		MungCSV.load_into_collections(file_info, file_props, file_rows);
	}, 
	load_into_collections: function(file_info, file_props, file_rows) {
		var ref_id = file_info.ref_id;

		//what i want to do is separate out the row data into a differnet collection
		// and make reference to the one being inserted now
		// this one will be the "summary" data collection
		// the other will be the detailed data collection
		// will help reduce the amount of data we have to send the client
		// on the server we can asychronously calculate specific values like SD, mean, theta, etc etc
		// if/when the acutal data is needed, then we can make bigger calls to it. 

		var info = {
		        file_data: {
		        	properties: file_props,
		        	row_data: file_rows
		        }
	      }
  		Collections.update(ref_id, {$set: info});

  		var info = {
  			properties: file_props
  		}

  		var ref_id2 = file_info.ref_id2;
		DataSetSummary.update(ref_id2, {$set: info});

		var info = {
				ref_id: ref_id2,
		        properties: file_props,
		        row_data: file_rows
	      }
  		var conf_ref = DataSetData.insert(info);
  		console.log(conf_ref);
	}
};
