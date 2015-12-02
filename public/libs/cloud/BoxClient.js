// #########################################
// An api object for dropbox tohandle CRUD operation
// subclass for CloudClient
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
// #########################################

//subclass constructor
function BoxClient(api, subject) {
	CloudClient.call(this,api); // the api will be gapi.client.drive

	// initialize the DbClient-specific properties if any
	this.subject = subject;
}

// Copy inheritance
BoxClient.prototype = Object.create(CloudClient.prototype);
BoxClient.prototype.constructor = BoxClient
var boxp = BoxClient.prototype

// ------------------------------------------------------------------Core functions
	kqlokmqr4a6fmf0zt6oethyjsxwx4gre