// #########################################
// This is the CRUD for google drive
// #########################################

/**
 * Print information about the current user along with the Drive API
 * settings.
 */
function getAccountInfo_gd(callback) {
  var request = gapi.client.drive.about.get();

  // resp = {name, rootFolerId, quotaBytesTotal, quotaBytesused}
  request.execute(function(resp) {
  	callback && callback(resp)
  });
}







