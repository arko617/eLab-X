// Get apis oauth here. First load dropbox then google

//--------------Dropbox APIs information
//-----Documentation: https://github.com/dropbox/dropbox-js
//-----To be more specific: https://github.com/dropbox/dropbox-js/blob/stable/guides/getting_started.md
var dropboxAPIKey = 'r2k206ydj5s5kv1';
var dropBoxClient = new Dropbox.Client({ key: dropboxAPIKey });
console.log("Connecting to Dropbox Client...",dropBoxClient);

//Load DROPBOX OAUTH
var that = this;
dropBoxClient.authenticate(function(error,dbClient){
	if(error){
		alert(error);
		return error;
		}			
	//Assign variable
	that.dbClient = dbClient;
		
	// Example with Dropbox. Get user information
	getDropboxUserInfo(dbClient, function(accountInfo){
		console.log("Hello, " + accountInfo.name + "!");
		that.file = accountInfo.name;
	});

	dbClient.readdir('/', function(error, entries) {
	  	if (error) {
	    	return showError(error);  // Something went wrong.
		}

		that.file = entries;
	})
		
	//----------------------------LOAD GOOGLE DRIVE OAUTH
	console.log('Dropbox is authorized successfully:', dbClient);
	handleGoogleClientLoad();
});


//--------------Google APIs information
var CLIENT_ID = '102710631798-lb77ojeikkaa0dsjcuvq08igkd8llrjh.apps.googleusercontent.com';	//for johnny5550822
//var CLINET_ID = '900888398054.apps.googleusercontent.com';	//For labbook2013 account
var SCOPES = ['https://www.googleapis.com/auth/drive.install','https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/plus.login'];	//Different scope have different meaning, see https://developers.google.com/drive/scopes
// var apiKey = "AIzaSyB71KszVh0JIH-7EXVgmTv8vt2uy33lPMU";


/**
* Called when the client library is loaded to start the auth flow.
*/
function handleGoogleClientLoad() {
	//gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth, 200);	//e.g.500ms; remember to wait some time for the google script to load
	console.log("Checking auth...");
}

/**
* Check if the current user has authorized the application.
*/

function checkAuth() {
	gapi.auth.authorize(
	{'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
	handleAuthResult);	//immediate:true-->refresh the token without a popup
}


/**
* Called when authorization server replies.
*/
function handleAuthResult(authResult) {
	//var authButton = document.getElementById('authorizeButton');
	//authButton.style.display = 'none';
	if (authResult && !authResult.error) {
		console.log("Done google drive Client Oauth!");
		gapi.client.load('drive','v2',function(){
		callback && callback();
		})
	} else {
		// No access token could be retrieved, show the button to start the authorization flow.
		//authButton.style.display = 'block';
		console.log("Fail to do google drive client oauth");
		//authButton.onclick = function() {
		//gapi.auth.authorize(
		//	{'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
		//	handleAuthResult);
		//};o
	}
}


angular.module('ManageCtrl', []).controller('ManageController', function($scope) {

	$scope.tagline = 'Manage your drive here';
	$scope.key = that.file;

});