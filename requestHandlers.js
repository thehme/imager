var fs = require('fs');
var querystring = require("querystring");
var formidable = require("formidable");

function start(response) {
	console.log("Request handler 'start' was called.");
	
	fs.readFile('./assets/stylesheets/style.html', function(err, html){
		if (err)
			throw err;

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files){
		console.log("parsing done");
		// fs.rename(oldPath, newPath, callback)
		fs.rename(files.upload.path, "./tmp/test.jpg", function(error) {
			if (error) {
				fs.unlink("./tmp/test.jpg");
				fs.rename(files.upload.path, "./tmp/test.jpg");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br />");
		response.write("<img src='/show' />");
		response.end();
	});
}

// function upload(response, postData) {
// 	console.log("Request handler 'upload' was called.");
// 	response.writeHead(200, {"Content-Type": "text/plain"});
// 	//response.write("You've entered: " + postData);
// 	response.write("You've entered: " + querystring.parse(postData).text);
// 	response.end();
// }

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/jpeg"});
	fs.createReadStream("./tmp/test.jpg").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;

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



