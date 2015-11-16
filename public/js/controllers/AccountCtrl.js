angular.module('AccountCtrl', []).controller('AccountController', function($scope) {

	$scope.tagline = 'The square root of life is pi!';	

	// 111415 Interesting: the global variable defined in another controller can be asseee within other controllers' module
	// But, you if access out the module function in other controllers, you cannot use it.
	//console.log('A testing on the AccountCtrl for dropbox api', dropboxAPIKey)
});
