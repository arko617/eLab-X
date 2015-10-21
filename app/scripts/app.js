'use strict';

/**
 * @ngdoc overview
 * @name eLabXApp
 * @description
 * # eLabXApp
 *
 * Main module of the application.
 */
angular
  .module('eLabXApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/google', {
        templateUrl: 'views/google.html',
        controller: 'GoogleCtrl',
        controllerAs: 'google'
      })
      .when('/dropbox', {
        templateUrl: 'views/dropbox.html',
        controller: 'DropboxCtrl',
        controllerAs: 'dropbox'
      })
      .when('/box', {
        templateUrl: 'views/box.html',
        controller: 'BoxCtrl',
        controllerAs: 'box'
      })
      .when('/local', {
        templateUrl: 'views/local.html',
        controller: 'LocalCtrl',
        controllerAs: 'local'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
