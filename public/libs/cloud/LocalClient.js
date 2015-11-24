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