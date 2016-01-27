angular.module('AccountCtrl', []).controller('AccountController', function($scope) {

	$scope.tagline = 'The square root of life is pi!';	

	// 111415 Interesting: the global variable defined in another controller can be asseee within other controllers' module
	// But, you if access out the module function in other controllers, you cannot use it.
	console.log('A testing on the AccountCtrl for dropbox api', dropboxAPIKey);
	console.log('A testing on the AccountCtrl for google drive api', CLIENT_ID);
});

	var dataBuffer = []	//Array to store the data that is to be uploaded

	// for(var i = 0; i < 3; i++) {
	// 	alert($scope.arr[i]); 
	// }

	$scope.myFunction = function() {
		alert("FUCK")

	    var x = document.getElementById("myFile");
	    var txt = "";

	    if ('files' in x) {
	        if (x.files.length == 0) {
	            txt = "Select one or more files.";
	        } else {
	            for (var i = 0; i < x.files.length; i++) {
	                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
	                var file = x.files[i];
	                dataBuffer.push(i);
	                alert(dataBuffer[i]);
	                if ('name' in $scope.file) {
	                    txt += "name: " + file.name + "<br>";
	                }
	                if ('size' in $scope.file) {
	                    txt += "size: " + file.size + " bytes <br>";
	                }
	            }
	        }
	    } else {
	        if (x.value == "") {
	            txt += "Select one or more files.";
	        } else {
	            txt += "The files property is not supported by your browser!";
	            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
	        }
	    }
	    document.getElementById("demo").innerHTML = txt;
	}