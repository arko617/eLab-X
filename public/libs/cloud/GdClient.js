// #########################################
// An object for google drive api to handle CRUD operations
// #########################################

var GdClient = function(api){
	this.api = api
}

var gdp = GdClient.prototype

// account info
gdp.getAccountInfo = function(callback) {
  var request = this.api.about.get();

  // resp = {name, rootFolerId, quotaBytesTotal, quotaBytesused}
  request.execute(function(resp) {
  	callback && callback(resp)
  });
}







