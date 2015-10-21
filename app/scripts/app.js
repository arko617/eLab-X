var express = require('express');
var app = express();
var bodyParse = require('body-parser');

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

//
function dropboxCallback(authenticated) {
  if (authenticated) {
    console.log("success");
  } else {
    console.log("failure");
  }
}

//var dropbox = new DropboxClient(d9mnfhrzstqs3x0, gcz83i7nrhkpuf5);

app.get('/', function(request, response){
  response.send("Webpage Working...");
});

// Server-side applications use both the API key and secret.
var dropboxAuthentication = new Dropbox.Client({
    key: d9mnfhrzstqs3x0,
    secret: "gcz83i7nrhkpuf5"
});

// Algorithm, authenticate the user, then pick up their stuff. If they want to retrive
//aisrtstuff, could as long as you draw everything out.

//1) Authenticate first using authenticate(options, callback)
dropboxAuthentication.authenticate(dropboxCallback(authenticated));
console.log(options); //Test print values for unknownv variable
console.log(dropboxAuthentication(authenticated));

//2) Choose files using readFile(path, options, callback)
var file;
dropboxAuthentication.readFile("~/file", arrayBuffer, dropboxCallback); //Store it in the user's home directory for now
//Display values of arrayBuffer and dropboxCallback to see results
console.log(arrayBuffer); 
console.log(dropboxCallback);

//3) Move or Transfer to Google Drive from home
// 
//GET https://www.googleapis.com/drive/v2/files/file;
//https://

/**
 * Download a file's content.
 *
 * @param {File} file Drive File instance.
 * @param {Function} callback Function to call when the request is complete.
 */
function downloadGoogleDriveFile(file, callback) {
  if (file.downloadUrl) {
    var accessToken = gapi.auth.getToken().access_token;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file.downloadUrl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.onload = function() {
      callback(xhr.responseText);
    };
    xhr.onerror = function() {
      callback(null);
    };
    xhr.send();
  } else {
    callback(null);
  }
}

var node_dropbox = require('node-dropbox');
//node_dropbox.Authenticate('key', 'secret', 'redirect_url', function(err, url){
    // redirect user to the url.
    // looks like this: "https://www.dropbox.com/1/oauth2/authorize?client_id=<key_here>&response_type=code&redirect_uri=<redirect_url_here>"
});
//

//////////////////////////
app.listen(3000);
console.log("Server Created...");

