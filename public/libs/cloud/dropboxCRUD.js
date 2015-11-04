function getDropboxUserInfo(dbClient, callback){
	// Get user information
	dbClient.getAccountInfo(function(error, accountInfo) {
		  if (error) {
		    return showError(error);  // Something went wrong.
		  }

		  callback && callback(accountInfo);
		});
}