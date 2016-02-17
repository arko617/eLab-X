angular.module('AnalyticsCtrl', []).controller('AnalyticsController', function($scope) {

	$scope.tagline = 'The is for cloud';
	$scope.test = 'Matthews test';
});

// *************************************************************************
// ***********Mathew testing code
// *************************************************************************
//Copy from Dropbox to Google Drive
//1) Copy rom Dropbox
//2) Store info in Google Drive
/*Matthew's Experiemental added code*/
// dropBoxClient.copy(function(from, toPath, callback){ 
// 	//Grab current file's path
// 	googleDriveClient.insert(from, callback);
// 	//Call googleDriveClient and append the "from" parameter to the new path.


// });

//Example: Modify this later
// googleDriveClient.insert(function(fileData, callback) {
// 	const boundary = '-------314159265358979323846';
//   const delimiter = "\r\n--" + boundary + "\r\n";
//   const close_delim = "\r\n--" + boundary + "--";

//   var reader = new FileReader();
//   reader.readAsBinaryString(fileData);
//   reader.onload = function(e) {
//     var contentType = fileData.type || 'application/octet-stream';
//     var metadata = {
//       'title': fileData.fileName,
//       'mimeType': contentType
//     };

//     var base64Data = btoa(reader.result);
//     var multipartRequestBody =
//         delimiter +
//         'Content-Type: application/json\r\n\r\n' +
//         JSON.stringify(metadata) +
//         delimiter +
//         'Content-Type: ' + contentType + '\r\n' +
//         'Content-Transfer-Encoding: base64\r\n' +
//         '\r\n' +
//         base64Data +
//         close_delim;

//     var request = gapi.client.request({
//         'path': '/upload/drive/v2/files',
//         'method': 'POST',
//         'params': {'uploadType': 'multipart'},
//         'headers': {
//           'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
//         },
//         'body': multipartRequestBody});
//     if (!callback) {
//       callback = function(file) {
//         console.log(file)
//       };
//     }
//     request.execute(callback);
//   }
// });

//console.log("TEST AND EXECUTES TO THE END! MATTHEW");
/*End*/

