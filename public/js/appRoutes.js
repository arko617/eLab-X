angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// welcome page
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})

		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeController', 
			//controller: 'CloudController', //111615: johnny--- seem like you can only put one controller
		})

		.when('/account', {
			templateUrl: 'views/account.html',
			controller: 'AccountController'	
		})

		.when('/analytics',{
			templateUrl: 'views/analytics.html',
			controller: 'AnalyticsController'				
		});

	$locationProvider.html5Mode(true);

}]);