// #########################################
// An object for your local machine to handle CRUD operations
// subclass for CloudClient
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
// #########################################

//subclass constructor
function LocalClient(api,subject){
	CloudClient.call(this,api); // the api will be gapi.client.drive

	// initialize the DbClient-specific properties if any
	this.subject = subject;
}

// Copy inheritance
LocalClient.prototype = Object.create(CloudClient.prototype);
LocalClient.prototype.constructor = LocalClient
var localp = LocalClient.prototype

// ------------------------------------------------------------------Core functions

//select
localp.select = function(callback) {
	if(window.File && window.FileReader && window.FileList && window.Blob) {
		//Great success! All the File APIs are supported.
	} else {
		alert('The File APIs are not fully supported in the browser');
	}
}

//Create a function that will do something after you click it!


//create
localp.create = function(callback) {
	
}

//rename
localp.rename = function(callback) {

}

//delete
localp.delete = function(callback) {

}
//download
localp.download = function(callback) {

}

//Copy
localp.copy = function(callback) {

}

//move
localp.move = function(callback) {

}
