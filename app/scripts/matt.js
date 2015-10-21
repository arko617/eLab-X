var express = require('express');
var app = express();
var bodyParse = require('body-parser');

//var dropbox = new DropboxClient(d9mnfhrzstqs3x0, gcz83i7nrhkpuf5);

app.get('/', function(request, response){
	response.send("Webpage Working...");
});

// Server-side applications use both the API key and secret.
var dropboxAuthentication = new Dropbox.Client({
    key: d9mnfhrzstqs3x0,
    secret: "gcz83i7nrhkpuf5"
});

//1) Authenticate first using authenticate(options, callback)
dropboxAuthentication.authenticate(options, dropboxCallback(authenticated));

//2) Choose files using readFile(path, options, callback)
dropboxAuthentication.readFile();

//3) Move or Transfer to Google Drive?????

function dropboxCallback(authenticated) {
	if (authenticated) {
		console.log("success");
	} else {
		console.log("failure");
	}
}
//

//////////////////////////
app.listen(3000);
console.log("Server Created...");