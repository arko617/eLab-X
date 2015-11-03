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
		});

	$locationProvider.html5Mode(true);

}]);