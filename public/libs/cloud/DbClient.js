// #########################################
// An api object for dropbox tohandle CRUD operation
// #########################################

//Constructor
var DbClient = function(api){
	this.api = api
}

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