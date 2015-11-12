angular.module('HomeCtrl', []).controller('HomeController', function($scope) {

	$scope.googleFile = [{name: 'Workspace', folder: "../img/folder.png"}, 
						{name: 'Random', folder: "../img/folder.png"},
						{name: 'Project', folder: "../img/folder.png"}];
	
	$scope.dropboxFile = [{name: 'Resume', folder: "../img/folder.png"}];
	
	$scope.boxFile = [{name: 'eLab', folder: "../img/folder.png"},
						{name: 'Physics', folder: "../img/folder.png"},
						{name: 'English', folder: "../img/folder.png"},
						{name: 'Lab', folder: "../img/folder.png"},
						{name: 'Math', folder: "../img/folder.png"},
						{name: 'Science', folder: "../img/folder.png"}];
	
	$scope.localFile = [{name: 'A', folder: "../img/folder.png"},
						{name: 'B', folder: "../img/folder.png"},
						{name: 'C', folder: "../img/folder.png"},
						{name: 'D', folder: "../img/folder.png"},
						{name: 'E', folder: "../img/folder.png"},
						{name: 'F', folder: "../img/folder.png"},
						{name: 'G', folder: "../img/folder.png"},
						{name: 'H', folder: "../img/folder.png"},
						{name: 'I', folder: "../img/folder.png"}];

	$scope.folderSelect = 0;

	$scope.create = "";
	$scope.rename = "disabled";
	$scope.del = "disabled";
	$scope.download = "disabled";
	$scope.transfer = "disabled";
	$scope.selectNone = "disabled";

	$scope.folderSelection = function(){
		if($scope.folderSelect === 0){
			$scope.create = "";
			$scope.rename = "disabled";
			$scope.del = "disabled";
			$scope.download = "disabled";
			$scope.transfer = "disabled";
			$scope.selectNone = "disabled";
		}

		if($scope.folderSelect === 1){
			$scope.create = "disabled";
			$scope.rename = "";
			$scope.del = "";
			$scope.download = "";
			$scope.transfer = "";
			$scope.selectNone = "";
		}

		if($scope.folderSelect > 1){
			$scope.create = "disabled";
			$scope.rename = "disabled";
			$scope.del = "";
			$scope.download = "";
			$scope.transfer = "";
			$scope.selectNone = "";
		}
	}

	$scope.toggleFolder = function(x){
		if(x.folder === "../img/folder.png"){
			x.folder = "../img/folder_select.png";
			$scope.folderSelect++;
		}
		else{
			x.folder = "../img/folder.png";
			$scope.folderSelect--;
		}

		$scope.folderSelection();
	};

	$scope.selectAllGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++){
			$scope.googleFile[i].folder = "../img/folder_select.png";
			$scope.folderSelect++;
		}

		$scope.folderSelection();
	};

	$scope.selectNoneGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++)
			$scope.googleFile[i].folder = "../img/folder.png";			

		$scope.folderSelect = 0;
		$scope.folderSelection();
	};

	$scope.selectAllDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++){
			$scope.dropboxFile[i].folder = "../img/folder_select.png";
			$scope.folderSelect++;
		}

		$scope.folderSelection();
	};

	$scope.selectNoneDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++)
			$scope.dropboxFile[i].folder = "../img/folder.png";

		$scope.folderSelect = 0;
		$scope.folderSelection();
	};

	$scope.selectAllBox = function(){
		for(var i = 0; i < $scope.boxFile.length; i++){
			$scope.boxFile[i].folder = "../img/folder_select.png";
			$scope.folderSelect++;
		}

		$scope.folderSelection();
	};

	$scope.selectNoneBox = function(){
		for(var i = 0; i < $scope.boxFile.length; i++)
			$scope.boxFile[i].folder = "../img/folder.png";

		$scope.folderSelect = 0;
		$scope.folderSelection();
	};

	$scope.selectAllLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++){
			$scope.localFile[i].folder = "../img/folder_select.png";
			$scope.folderSelect++;
		}

		$scope.folderSelection();
	};

	$scope.selectNoneLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++)
			$scope.localFile[i].folder = "../img/folder.png";

		$scope.folderSelect = 0;
		$scope.folderSelection();
	};
});