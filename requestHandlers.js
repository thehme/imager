var fs = require('fs');
var querystring = require("querystring");

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	
	fs.readFile('./assets/stylesheets/style.html', function(err, html){
		if (err)
			throw err;

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	//response.write("You've entered: " + postData);
	response.write("You've entered: " + querystring.parse(postData).text);
	response.end();
}

exports.start = start;
exports.upload = upload;

// ORIGINAL
// function start() {
// 	console.log("Request handler 'start' was called."); 
// 	return "Hello Start";
// }

// function upload() {
// 	console.log("Request handler 'upload' was called."); 
// 	return "Hello upload";
// }

// exports.start = start;
// exports.upload = upload;


// SLEEP - BLOCKING DEMO
// function start(){
// 	console.log("Request handler 'start' was called.");

// 	function sleep(milliseconds) {
// 		var startTime = new Date().getTime();
// 		while (new Date().getTime() < (startTime + milliseconds));
// 	}
	
// 	sleep(1000);
// 	return "Hello Start";
// }

// function upload() {
// 	console.log("Request handler 'upload' was called.");
// 	return "Hello upload";
// }

// exports.start = start;
// exports.upload = upload;

// CHILD PROCESS BLOCKING DEMO
// var exec = require("child_process").exec;

// function start(response) {
// 	console.log("Request handler 'start' was called.");
// 	//var content = "empty";

// 	exec("ls -lah", function(error, stdout, stderr) {
// 		// if (error)
// 		// 	throw stderr;
// 		// content = stdout;
// 		response.writeHead(200, {"content-Type": "text/plain"});
// 		response.write(stdout);
// 		response.end();
// 	});
// }

// function upload(response) {
// 	console.log("Request handler 'upload' was called.");
// 	response.writeHead(200, {"Content-Type": "text/plain"});
// 	response.write("Hello Upload");
// 	response.end();
// }

// exports.start = start;
// exports.uploade = upload;



