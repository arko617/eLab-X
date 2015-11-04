angular.module('HomeCtrl', []).controller('HomeController', function($scope) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	.config(function (DropboxProvider) {
    DropboxProvider.config(r2k206ydj5s5kv1, 'http://127.0.0.1:3000/home');
  })

  // inject the service
  .controller('DropboxCtrl', function ($scope, Dropbox) {

    // assign a promise to scope
    $scope.accountInfo = Dropbox.accountInfo();

    // or use callbacks
    Dropbox.copy('dir/image1.jpg', 'dir/image2.jpg').then(function (res) {
      Dropbox.move('dir/image1.jpg', 'dir/image.jpg').then(function (res) {
        $scope.photos = Dropbox.stat('dir');
      });
    });

});