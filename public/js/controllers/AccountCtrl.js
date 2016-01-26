angular.module('AccountCtrl', []).controller('AccountController', function($scope) {

	$scope.tagline = 'The square root of life is pi!';	

	// 111415 Interesting: the global variable defined in another controller can be asseee within other controllers' module
	// But, you if access out the module function in other controllers, you cannot use it.
	console.log('A testing on the AccountCtrl for dropbox api', dropboxAPIKey);
	console.log('A testing on the AccountCtrl for google drive api', CLIENT_ID);



	$scope.myFunction = function() {
	    $scope.x = document.getElementById("myFile");
	    $scope.txt = "";

	    if ('files' in $scope.x) {
	        if ($scope.x.files.length == 0) {
	            $scope.txt = "Select one or more files.";
	        } else {
	            for ($scope.i = 0; $scope.i < $scope.x.files.length; $scope.i++) {
	                $scope.txt += "<br><strong>" + ($scope.i+1) + ". file</strong><br>";
	                $scope.file = $x.files[$i];
	                if ('name' in $scope.file) {
	                    $scope.txt += "name: " + $scope.file.name + "<br>";
	                }
	                if ('size' in $scope.file) {
	                    $scope.txt += "size: " + $scope.file.size + " bytes <br>";
	                }
	            }
	        }
	    } else {
	        if ($scope.x.value == "") {
	            $scope.txt += "Select one or more files.";
	        } else {
	            $scope.txt += "The files property is not supported by your browser!";
	            $scope.txt  += "<br>The path of the selected file: " + $scope.x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
	        }
	    }
	    document.getElementById("demo").innerHTML = $scope.txt;
	}
});
