// #########################################
// An object for google drive api to handle CRUD operations
// subclass for CloudClient
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
// #########################################

//subclass constructor
function GdClient(api,subject){
	CloudClient.call(this,api); // the api will be gapi.client.drive

	// initialize the DbClient-specific properties if any
	this.subject = subject;
}

// Copy inheritance
GdClient.prototype = Object.create(CloudClient.prototype);
GdClient.prototype.constructor = GdClient
var gdp = GdClient.prototype

// ------------------------------------------------------------------Core functions

// account info
gdp.getAccountInfo = function(callback) {
  var request = this.api.about.get();

  // resp = {name, rootFolerId, quotaBytesTotal, quotaBytesused}
  request.execute(function(resp) {
  	callback && callback(resp)
  });
}

// Get an item meta data
gdp.getItemMeta = function(fileId,callback){
	var request = this.api.files.get({
		'fileId': fileId
	});
	request.execute(function(resp) {
		callback(resp);
	});
}

// retreive a list of file/folder in a particular folder
gdp.retrieveChildrenFiles = function(folderId, query, mimeType, callback){
	console.log("Getting files & folders list from LabBook project...");

	// Formulate the search query
	var defaultQuery = "'{0}' in parents ".f(folderId);
	if(query){
		if (query!=""){
			defaultQuery +="and " + query;
		}
	}	
	if(mimeType){
		defaultQuery +=" and mimeType" + mimeType;
	}

	var retrievePageOfFiles = function(request, result) {
		request.execute(function(resp) {
			result = result.concat(resp.items);

			//If the number of files exceed limits, it will go to next page (cumulative)
			var nextPageToken = resp.nextPageToken;
			if (nextPageToken) {
				request = this.api.files.list({
					"folderId":folderId,
					'pageToken': nextPageToken,
					"maxResults":1000,
					"q": defaultQuery || query,
				});
				retrievePageOfFiles(request, result);
			} else {
				return callback(result);
			};
		});
	}
	var initialRequest = this.api.files.list({
		"folderId":folderId,
		"maxResults":1000,
		"q":defaultQuery || query,
	});
	retrievePageOfFiles(initialRequest, []);
}

// move an item into a folder of drive
gdp.insertFileIntoFolder = function(folderId, fileId, callback) {
	var body = {'id': fileId};
	var request = this.api.children.insert({
		'folderId': folderId,
		'resource': body
	});
	request.execute(function(resp) { 
		callback && callback(resp);
	});
}

// create a google drive file. 1. create 2. Insert to the destination
gdp.createGFile = function(folderId,title,mimeType,callback){
	var that = this // to maintain the object itself
	data = new Object();
	data.title = title;
	data.mimeType = mimeType;
	this.api.files.insert({'resource': data}).execute(function(resp){
		if (!resp.error){
			that.insertFileIntoFolder(folderId,resp.id,function(resp2){
				if (!resp2.error){
					callback && callback('Create a google item {0} and insert it into {1}'.f(resp.id, folderId),resp);
				}else{
					callback && callback('Fail to insert the created google item into {0}'.f(folderId),resp);
				}
			});
		}else{
			callback && callback('Fail to create a google item',false);
		}
	});	
}

// delete a file
gdp.deleteItem = function(fileId,callback){
	var that = this
	this.getItemMeta(fileId, function(file){
		var request = that.api.files.delete({
			'fileId': fileId
		});
		request.execute(function(resp) { 
			if (!resp.error){
				if (isEmptyObject(resp["result"])){
					callback && callback('Remove a gDrive item', fileId);
				}
			}else{
				callback && callback('Fail to remove a gDrive item', fileId);
			}

		});
	});	
}







