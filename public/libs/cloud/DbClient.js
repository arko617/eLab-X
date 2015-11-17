// #########################################
// An api object for dropbox tohandle CRUD operation
// subclass for CloudClient
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
// #########################################

//subclass constructor
function DbClient(api,subject){
	// Call the parent constructor, making sure "this" is set correctly
	CloudClient.call(this,api);

	// Initialize the DbClient-specific properties if any
	this.subject = subject;
}

// Create the prototype object that inferits from CloudClient
DbClient.prototype = Object.create(CloudClient.prototype);
// Set the constructor property to refer to DBClient
DbClient.prototype.constructor = DbClient
// short cut to define functions for this object
var dbp = DbClient.prototype

// Obtain account info
dbp.getAccountInfo = function(callback){
	// Get user information
	this.api.getAccountInfo(function(error, accountInfo) {
		  if (error) {
		    return showError(error);  // Something went wrong.
		  }

		  callback && callback(accountInfo);
		});
}

//