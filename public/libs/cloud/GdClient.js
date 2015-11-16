// #########################################
// An object for google drive api to handle CRUD operations
// subclass for CloudClient
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
// #########################################

//subclass constructor
function GdClient(api,subject){
	CloudClient.call(this,api);

	// initialize the DbClient-specific properties if any
	this.subject = subject;
}

// Copy inheritance
GdClient.prototype = Object.create(CloudClient.prototype);
GdClient.prototype.constructor = GdClient
var gdp = GdClient.prototype

// account info
gdp.getAccountInfo = function(callback) {
  var request = this.api.about.get();

  // resp = {name, rootFolerId, quotaBytesTotal, quotaBytesused}
  request.execute(function(resp) {
  	callback && callback(resp)
  });
}







