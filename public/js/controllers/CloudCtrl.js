// To handle all the cloud-related work 

angular.module('CloudCtrl', []).controller('CloudController', function($scope) {
	$scope.tagline = 'The is for cloud';
});

//#################################################### Get apis oauth here. First load dropbox then google
// api client instantiation
var dbClient = null
var gdClient = null // the client of google drive is gapi. To maintain the consistence among other clouds, we still assign gapi to a variable

//--------------------------------Dropbox APIs information
//Documentation: https://github.com/dropbox/dropbox-js
//To be more specific: https://github.com/dropbox/dropbox-js/blob/stable/guides/getting_started.md
var dropboxAPIKey = 'r2k206ydj5s5kv1';
var dropBoxClient = new Dropbox.Client({ key: dropboxAPIKey });

//Load DROPBOX OAUTH
dropBoxClient.authenticate(function(error,client){
	if(error){
		console.log(error);
		return error;
	}	
	console.log('Dropbox is authorized successfully:', client);

	// assign value
	dbClient = client		
		
	// Example with Dropbox. Get user information
	getDropboxUserInfo(dbClient, function(accountInfo){
		console.log("Hello, " + accountInfo.name + "!");
	});
		
	//LOAD GOOGLE DRIVE OAUTH
	handleGoogleClientLoad();
});

//----------------------------------Google APIs information
//https://developers.google.com/drive/v2/reference/
var CLIENT_ID = '102710631798-lb77ojeikkaa0dsjcuvq08igkd8llrjh.apps.googleusercontent.com';	//for johnny5550822
//var CLINET_ID = '900888398054.apps.googleusercontent.com';	//For labbook2013 account
var SCOPES = ['https://www.googleapis.com/auth/drive.install','https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/plus.login'];	//Different scope have different meaning, see https://developers.google.com/drive/scopes

/**
* Called when the client library is loaded to start the auth flow.
*/
function handleGoogleClientLoad() {
	//gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth, 400);	//e.g.500ms; remember to wait some time for the google script to load
}

/**
* Check if the current user has authorized the application.
*/
function checkAuth() {
	gapi.auth.authorize({
		'client_id': CLIENT_ID, 
		'scope': SCOPES, 
		'immediate': true
	}, handleAuthResult);	//immediate:true-->refresh the token without a popup
}

/**
* Called when authorization server replies.
*/
function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		console.log('Google drive client is authorized successfully', gapi)
		gdClient = gapi

		//test
		// google drive
		gdClient.client.load('drive', 'v2', function(){
		 	var request = gdClient.client.drive.about.get();
		 	request.execute(function(resp){
		 		console.log('Hello user:',resp.name)
		 	})
		});

		// jump into drive management loop
		mainCloudLoop()
	} else {
		console.log("Fail to do google drive client oauth");
	}
}

// ################################################################################################
// main loop: once the oauth is done you can do whatever you want here for google drive, dropobx, or etc
// You may have to re-do oauth from time to time: ignore at this stage - 111415
// ################################################################################################

/**
* Once the authis good, then load the api and do something
*/
function mainCloudLoop(){
		// google drive
		gdClient.client.load('drive', 'v2', function(){

		});

		// Dropbox
		//dbClient
}





