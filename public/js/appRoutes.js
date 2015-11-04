angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// welcome page
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})

		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/account', {
			templateUrl: 'views/account.html',
			controller: 'AccountController'	
		})

		.when('/manage',{
			templateUrl: 'views/manage.html',
			controller: 'ManageController'				
		});

		.when('/google',{
			templateUrl: 'views/google.html',
			controller: 'GoogleController'				
		});

		.when('/dropbox',{
			templateUrl: 'views/dropbox.html',
			controller: 'DropboxController'				
		});

		.when('/box',{
			templateUrl: 'views/box.html',
			controller: 'BoxController'				
		});

		.when('/local',{
			templateUrl: 'views/local.html',
			controller: 'LocalController'				
		});


	$locationProvider.html5Mode(true);

}]);