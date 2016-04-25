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

// --------------------------------------------------------- Core function
// Obtain account info
dbp.getAccountInfo = function(callback){
	// Get user information
	this.api.getAccountInfo(function(error, accountInfo) {
		  if (error) {
		    return (error);  // Something went wrong.
		  }

		  callback && callback(accountInfo);
		});
}

// Read a directory content
dbp.readDirContent = function(directory, callback){
	// Get user information
	this.api.readdir(directory, function(error, entries) {
		  if (error) {
		    return (error);  // Something went wrong.
		  }

		  callback && callback(entries);
		});
}

// Read a file content
dbp.readAFile = function(filePath, callback){
	this.api.readFile(filePath, function(error, data) {
		  if (error) {
		    return (error);  // Something went wrong.
		  }

		  callback && callback(data);
		});
}

// rename a file
dbp.rename = function(filePath, newFilePath, callback){
	this.api.move(filePath, newFilePath, function(error, resp) {
		  if (error) {
		  	console.log('Fail to rename the file in dropbox',error)
		    return;  // Something went wrong.
		  }

		  callback && callback(resp);
		});
}

// Make a download link
dbp.getDownloadLink = function(filePath, options, callback){
	this.api.makeUrl(filePath, options, function(error, url) {
		  if (error) {
		    return (error);  // Something went wrong.
		  }

		  callback && callback(url,error);
		});
}

// Get all the files and their heirachical order recursively
dbp.readDirAllContent = function (cPos,fileList,fileIsFolderList,callback){
	var that = this
	//console.log('cPos:',cPos);
	if (fileList[cPos]!=null){					  
		//1. get the content
		thisName = fileList[cPos];
		this.api.readdir(thisName, function readDirCallback(error, entries) {
			if (error) {
				return (error);  
			}
			  
			//append to the file list
			if (entries !=null){
				//append the parent to all the current entries
				for (i=0;i<entries.length;i++){
					// make sure not appending / again
					if (thisName!='/'){
						entries[i] = thisName + '/' + entries[i]
					}else{
						entries[i] = thisName + entries[i]
					}
				}
				  
				fileList = fileList.concat(entries);
			}
			  
			//store if the 'thisName' is a file or a folder
			if (entries ==null){
				fileIsFolderList.push(0);
			}else{
				fileIsFolderList.push(1);
			}
			  						  
			//update position
			cPos += 1;
			that.readDirAllContent(cPos,fileList,fileIsFolderList,callback);					  
		});
	}else{
		callback && callback(fileList, fileIsFolderList);
	}
}

// remove a file
dbp.remove = function(filePath,callback){
	this.api.remove(filePath,function(error, resp){
		if (error){
			return ("Fail to remove a file from dropbox,",error);
		}

		callback && callback(resp)
	})
}

// upload a data file to dropbox
// data: String, ArrayBuffer, ArrayBufferView, Blob, File, Buffer
dbp.upload = function(destination,data,options,callback){
	this.api.writeFile(destination, data, options, function(error, resp){
		if (error){
			console.log('Fail to upload a data file to dropbox', error)
			return
		}
		console.log('Uploaded a data file to dropbox!', resp)
		callback && callback()
	})
}

//Create a directory
dbp.mkdir = function(path, callback){
	this.api.mkdir(path,function(error,resp){
		if (error){
			console.log('fail to create a folder in dropbox', error)
			return
		}
		console.log('Created a folder in dropbox', resp)
		callback && callback(resp)
	})
}

// ---------------------------------- Function to do copy and move across cloud storages	

// move/copy a single file into drive from dropbox.
dbp.aFileToGDrive = function(path,fileName,destinationFolderId, gClient, isCopy, callback){
	filePath = path + fileName;
	console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX", filePath);
	options = {download:true}; // A direct download link in db
	var that = this

	this.getDownloadLink(filePath,options,function(url){
		// Put the file into the google drive
		// ref:http://qnimate.com/javascript-create-file-object-from-url/
		var blob = null;	// the data blob
		var xhr = new XMLHttpRequest(); 
		xhr.open("GET", url.url); 
		//xhr.responseType = "ArrayBuffer";//force the HTTP response, response-type header to be blob
		xhr.responseType = "blob"; // 042116 want blob for response type; see http://qnimate.com/an-introduction-to-javascript-blobs-and-file-interface/

		xhr.onload = function(){
			//Get the data blob
			blob = xhr.response;	//xhr.response is now a blob object
			blob.name = fileName	//set the data name

			//Upload
			console.log('!!!!dropbox blob',xhr.response)
			gClient.upload(destinationFolderId,blob,function(){
				// if not a copy, remove the original file in db
				if (!isCopy){
					that.remove(filePath,function(resp){
						console.log('It is a move option from dropbox to google drive--> Deleted the original file')
						callback && callback()
					})
				}
			})
		}
		xhr.send();
	})

}

// -------------------------------------------------- End copy and move core functions







