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
	if(error) {
		console.log(error);
		return error;
	}	
	console.log('Dropbox is authorized successfully:', client);

	// assign value
	dbClient = new DbClient(client);		
		
	// Example with Dropbox. Get user information
	dbClient.getAccountInfo(function(accountInfo){
		console.log("Dropbox account info", accountInfo)
		console.log("Hello dropbox user, " + accountInfo.name + "!");
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

		// load the particular drive api and then just into main application
		gapi.client.load('drive', 'v2', function(){
			//assign the drive api
			gdClient = new GdClient(gapi.client.drive)

			gdClient.getAccountInfo(function(account){
				console.log('Hello gDrive user:',account.name)
				console.log('THe root folderId is:', account.rootFolderId)
				
				// jump into drive test
				// dropboxTests()
				// gDriveTests()

			})

		});
	} else {
		console.log("Fail to do google drive client oauth");
	}
}

// ################################################################################################
// main loop: once the oauth is done you can do whatever you want here for google drive, dropobx, or etc
// You may have to re-do oauth from time to time: ignore at this stage - 111415
// ################################################################################################

/**
* Once the authis good, then load the api and do something.
* You can treat this as a test
*/
function gDriveTests(){
		//--------------------------- google drive
		//console.log(gdClient)
		var rootFolderId = '0AN9TACL_6_flUk9PVA'

		
		// receive all file and folder from root 
		gdClient.retrieveChildrenFiles(rootFolderId,false,false,function(files){
			console.log('----gDrive TEST:retreive files from google drive:', files)
		})

		/*
		// get a file meta
		gdClient.getItemMeta(rootFolderId,function(meta){
			console.log('----gDrive TEST: get root folder meta data',meta)
		})

		// Create a google doc and then remove it
		folderId = rootFolderId
		title = 'Testing'
		mimeType = 'application/vnd.google-apps.document'
		gdClient.createGFile(folderId,title,mimeType,function(resp,result){
			console.log('----gDrive TEST: Create a new google item in root folder', result)

			// delete it then
			gdClient.deleteItem(result.id,function(resp,result){
				console.log('----gDrive TEST: remove an item {0}'.f(result))
			})
		})
		*/

		// Create a Folder in a destination id
		// projects 
		/*title = 'testFolder'
		destFolderId = "0B99TACL_6_flMmYxN2YyMjRTMGs"
		console.log('-------TEST: create a folder in google drive')
		gdClient.createFolder(destFolderId,title,function(){

		})
		*/

		// Copy/move a file from google drive to dropbox
		// 112215: more complicated to do this cause there are manay different data type in google drive and the way to download them is a bit different
		// File "TobeRemoved.txt" in google drive: "0B99TACL_6_flODJOdThkcnJOM2c"
		// File "xxx.exe" in google drive: 0B99TACL_6_flYlZKZGVuNVZJVTA
		// File "xxxx.pdf" "0B99TACL_6_flYW9XTGhVUTJuZFU"
		// A google doc "15tyK4ZMCK4s3giD6OtxdQPdcOwXkBJBxBiEv0ewAHw4"
		/*fileId = "15tyK4ZMCK4s3giD6OtxdQPdcOwXkBJBxBiEv0ewAHw4"
		console.log('----TEST: copying/moving a file from google drive to dropbox')
		destination = '/' // destination of the file
		options = {noOverwrite: true}
		isCopy = true

		gdClient.aFileToDropbox(fileId, dbClient, destination, options, isCopy, function(){

		})
		*/
}

/**
* Once the authis good, then load the api and do something.
* You can treat this as a test
*/
function dropboxTests(){
		//--------------------------- Dropbox
		console.log('Test Dropbox......')

		/*
		// Load a directory content
		dbClient.readDirContent('/Apps',function(result){
			console.log('----dropbox TEST: read a directory', result)

		})

		//Read a file content
		dbClient.readAFile('gitignore.txt', function(result){
			console.log('----dropbox TEST: read a file content', result)
		})

		// Create download link for an item
		filePath = 'gitignore.txt'
		options = {download:true} // download link instead of preview
		dbClient.getDownloadLink(filePath, options, function(result){
			console.log('----dropbox TEST: create download link for an item', result)
		})

		// identity all the files and folder in dropbox recursively
		cPos = 0
		fileList = ['/']
		fileIsFolderList = [1]
		dbClient.readDirAllContent(cPos,fileList,fileIsFolderList, function(fileList, fileIsFolderList){
			console.log('----dropbox TEST: obtain all the files and folder in dropbox', fileList, fileIsFolderList)
		})
		*/

		// upload something to the file
		/*
		destination = '/testDb.txt'
		options = {noOverwrite: true}
		data = 'dddd'
		dbClient.upload(destination,data,options,function(){
			console.log('----Dropbox test: upload an item')
		})
		*/

		/*
		// upload a file to a google drive destination from dropbox
		// TEST: elab's folder in gDrive: "0B99TACL_6_flb2EwbnhiLUVNdEE"
		path = '/'
		fileName = 'gitignore.txt'
		destFolderId = "0B99TACL_6_flb2EwbnhiLUVNdEE"
		gClient = gdClient
		isCopy = true

		console.log('----dropbox TEST: upload a file to google drive.')
		console.log('Moving/Copying a file from dropbox to gooogle drive.......')
		dbClient.aFileToGDrive(path,fileName,destFolderId, gClient, isCopy, function(){
		})
		*/

		// Create a folder
		destFolderId = '/testing/testings/'
		dbClient.mkdir(destFolderId,function(resp){
			console.log('------dropbox TEST: Create a folder!',resp)
		})
}


