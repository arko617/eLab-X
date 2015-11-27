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
  	if (!resp.error){
  		callback && callback(resp)
  	}else{
  		console.log('Error: get google drive account info', resp)
  	}
  });
}

// Get an item meta data
gdp.getItemMeta = function(fileId,callback){
	var request = this.api.files.get({
		'fileId': fileId
	});
	request.execute(function(resp) {
		if (!resp.error){
			callback(resp);
		}else{
			console.log('Error: get google a file meta data', resp)
		}

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

/**
 * Copy an existing file.
 *
 * @param {String} folderId ID of the origin file to copy.
 * @param {String} fileId Title of the copy.
 */
gdp.copy = function(folderId, fileId, callback) {
	var body = {'id': fileId};
	var request = this.api.children.copy({
	//var request = this.api.files.copy({
		'folderId': folderId,
		'resource': body
	});
	request.execute(function(resp) {
		console.log('Copy ID: ' + resp.id);
		callback && callback(resp);
	});
}

/**
 * Copy an existing file.
 *
 * @param {String} originFileId ID of the origin file to copy.
 * @param {String} copyTitle Title of the copy.
 */
// function copyFile(originFileId, copyTitle) {
//   var body = {'title': copyTitle};
//   var request = gapi.client.drive.files.copy({
//     'fileId': originFileId,
//     'resource': body
//   });
//   request.execute(function(resp) {
//     console.log('Copy ID: ' + resp.id);
//   });
// }
//

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

// upload file to a google drive destination. Make sure you set the metaData: title and destination's folder ID
gdp.upload = function(destFolderId, datablob,callback){
	const boundary = '-------314159265358979323846';
	const delimiter = "\r\n--" + boundary + "\r\n";
	const close_delim = "\r\n--" + boundary + "--";
	var reader = new FileReader();
	reader.readAsBinaryString(datablob);
	reader.onload = function(e) {
		var contentType = datablob.type || 'application/octet-stream';
		var parents = [{id:destFolderId}] // the destination folder id; not root anymore
		var metadata = {
				'title': datablob.name,
				'mimeType': contentType,
				'parents': parents
		};

		var base64Data = btoa(reader.result);
		var multipartRequestBody =
			delimiter +
			'Content-Type: application/json\r\n\r\n' +
			JSON.stringify(metadata) +
			delimiter +
			'Content-Type: ' + contentType + '\r\n' +
			'Content-Transfer-Encoding: base64\r\n' +
			'\r\n' +
			base64Data +
			close_delim;

		var request = gapi.client.request({
			'path': '/upload/drive/v2/files',
			'method': 'POST',
			'params': {'uploadType': 'multipart'},	//no resumable upload at this moment. File size<5MB
			'headers': {
				'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
			},
			'body': multipartRequestBody});

		//upload file to the root of google drive
		request.execute(function(resp){
			if (!resp.error){
				console.log("Success: uploaded a file to google drive's {0}".f(destFolderId))
				callback && callback()
			}else{
				console.log("Fail to upload a file to google drive's {0}".f(destFolderId))
			}
		});
	};
}

// ---------------------------------- Function to do copy and move across cloud storages	

// move or copy a file from google drive to dropbox
gdp.aFileToDropbox = function(fileId, dboxClient, destination, options, isCopy, callback){
	var downloadUrl;
	var that = this

	this.getItemMeta(fileId,function(file){
		//only non-google-drive created file have downloadURL, i.e. your uploaded files each has a webContentLink
		//If the document is created in Google, it has exportLinks
		//If it is a folder, it cannot be downloaded
		if (file.downloadUrl) {	
			downloadUrl = file.downloadUrl
		}else if (file['exportLinks']){
			var exportLinks = file['exportLinks'];
			for (var property in exportLinks) {				
				//TODO: 122715. ask user what format they want the google files to be. From now on, let's omit that first
				if (exportLinks.hasOwnProperty(property)) {
					switch (property){
					case "application/pdf":
						downloadUrl = exportLinks[property]
						break;
					case "application/rtf":
						downloadUrl = exportLinks[property]
						break;
					case "application/vnd.oasis.opendocument.text":
						downloadUrl = exportLinks[property]
						break;
					case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
						downloadUrl = exportLinks[property]
						break;
					case "text/html":
						downloadUrl = exportLinks[property]
						break;
					case "text/plain":
						downloadUrl = exportLinks[property]
						break;
					case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
						downloadUrl = exportLinks[property]
						break;
					case "application/x-vnd.oasis.opendocument.spreadsheet":
						downloadUrl = exportLinks[property]
						break;
					case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
						downloadUrl = exportLinks[property]
						break;
					case "image/png":
						downloadUrl = exportLinks[property]
						break;
					case "image/jpeg":
						downloadUrl = exportLinks[property]
						break;
					case "image/svg+xml":
						downloadUrl = exportLinks[property]
						break;
					}
				}
			}
		}else{
			url+="Sorry, this cannot be downloaded";
		};

		// Got the url; then create data object and upload to dropbox
		// ref:http://qnimate.com/javascript-create-file-object-from-url/
		var blob = null;	// the data blob
		var xhr = new XMLHttpRequest(); 
		var accessToken = gapi.auth.getToken().access_token;	//Get the access token and use it for allowing download in google drive

		xhr.open("GET", downloadUrl); 
		xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		xhr.responseType = "blob";//force the HTTP response, response-type header to be 

		xhr.onload = function(){
			//Get the data blob
			blob = xhr.response;	//xhr.response is now a blob object
			blob.name = file.title;	//set the data name

			dataFullPath = "{0}{1}".f(destination,file.title)	//we need to give the fullpath, including the file name

			dboxClient.upload(dataFullPath,blob,options,function(resp){

				if (!isCopy){
					that.deleteItem(fileId,function(){
						console.log('It is a move option from dropbox to google drive--> Deleted the original file')
						callback && callback()
					})
				}

			})
		}
		xhr.send();
	})

}




