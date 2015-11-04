angular.module('eLabXApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'HomeCtrl', 'HomeService', 'AccountCtrl', 'AccountService','ManageCtrl','ManageService']);

// Get apis oauth here

//--------------Google APIs information
var CLIENT_ID = '102710631798-lb77ojeikkaa0dsjcuvq08igkd8llrjh.apps.googleusercontent.com';	//for johnny5550822
//var CLINET_ID = '900888398054.apps.googleusercontent.com';	//For labbook2013 account
var SCOPES = ['https://www.googleapis.com/auth/drive.install','https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/plus.login'];	//Different scope have different meaning, see https://developers.google.com/drive/scopes
var apiKey = "AIzaSyB71KszVh0JIH-7EXVgmTv8vt2uy33lPMU";



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
	});
		
	//----------------------------LOAD GOOGLE DRIVE OAUTH
	console.log('Dropbox is authorized successfully:', dbClient);
	//handleGoogleClientLoad();
});

