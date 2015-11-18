angular.module('HomeCtrl', []).controller('HomeController', function($scope) {

	var empty = [];

	var gFile = [{name: 'Workspace', folder: "../img/checkbox.png"}, 
						{name: 'Random', folder: "../img/checkbox.png"},
						{name: 'Project', folder: "../img/checkbox.png"}];
	
	var dFile = [{name: 'Resume', folder: "../img/checkbox.png"}];

	var bFile = [{name: 'eLab', folder: "../img/checkbox.png"},
						{name: 'Physics', folder: "../img/checkbox.png"},
						{name: 'English', folder: "../img/checkbox.png"},
						{name: 'Lab', folder: "../img/checkbox.png"},
						{name: 'Math', folder: "../img/checkbox.png"},
						{name: 'Science', folder: "../img/checkbox.png"}];

	var lFile = [{name: 'A', folder: "../img/checkbox.png"},
						{name: 'B', folder: "../img/checkbox.png"},
						{name: 'C', folder: "../img/checkbox.png"},
						{name: 'D', folder: "../img/checkbox.png"},
						{name: 'E', folder: "../img/checkbox.png"},
						{name: 'F', folder: "../img/checkbox.png"},
						{name: 'G', folder: "../img/checkbox.png"},
						{name: 'H', folder: "../img/checkbox.png"},
						{name: 'I', folder: "../img/checkbox.png"}];


	//-----------Source

	$scope.googleFile = JSON.parse(JSON.stringify(gFile));
	$scope.dropboxFile = JSON.parse(JSON.stringify(dFile));
	$scope.boxFile = JSON.parse(JSON.stringify(bFile));
	$scope.localFile = JSON.parse(JSON.stringify(lFile));

	$scope.curDirGoogle = "/Home";

	$scope.intoGoogleFolder = function(f){
		$scope.curDirGoogle += "/" + f.name;
		$scope.googleFile = empty;
	}

	$scope.outofGoogleFolder = function(){
		if($scope.curDirGoogle !== "/Home"){
			while($scope.curDirGoogle[$scope.curDirGoogle.length-1] !== '/')
				$scope.curDirGoogle = $scope.curDirGoogle.slice(0, -1);

			$scope.curDirGoogle = $scope.curDirGoogle.slice(0, -1);
			$scope.googleFile = gFile.slice();
		}
	}

	$scope.curDirDropbox = "/Home";

	$scope.intoDropboxFolder = function(f){
		$scope.curDirDropbox += "/" + f.name;
		$scope.dropboxFile = empty;
	}

	$scope.outofDropboxFolder = function(){
		if($scope.curDirDropbox !== "/Home"){
			while($scope.curDirDropbox[$scope.curDirDropbox.length-1] !== '/')
				$scope.curDirDropbox = $scope.curDirDropbox.slice(0, -1);

			$scope.curDirDropbox = $scope.curDirDropbox.slice(0, -1);
			$scope.dropboxFile = dFile.slice();
		}
	}

	$scope.curDirBox = "/Home";

	$scope.intoBoxFolder = function(f){
		$scope.curDirBox += "/" + f.name;
		$scope.boxFile = empty;
	}

	$scope.outofBoxFolder = function(){
		if($scope.curDirBox !== "/Home"){
			while($scope.curDirBox[$scope.curDirBox.length-1] !== '/')
				$scope.curDirBox = $scope.curDirBox.slice(0, -1);

			$scope.curDirBox = $scope.curDirBox.slice(0, -1);
			$scope.boxFile = bFile.slice();
		}
	}

	$scope.curDirLocal = "/Home";

	$scope.intoLocalFolder = function(f){
		$scope.curDirLocal += "/" + f.name;
		$scope.localFile = empty;
	}

	$scope.outofLocalFolder = function(){
		if($scope.curDirLocal !== "/Home"){
			while($scope.curDirLocal[$scope.curDirLocal.length-1] !== '/')
				$scope.curDirLocal = $scope.curDirLocal.slice(0, -1);

			$scope.curDirLocal = $scope.curDirLocal.slice(0, -1);
			$scope.localFile = lFile.slice();
		}
	}

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
	};

	$scope.toggleFolder = function(x){
		if(x.folder === "../img/checkbox.png"){
			x.folder = "../img/checked_checkbox.png";
			$scope.folderSelect++;
		}
		else{
			x.folder = "../img/checkbox.png";
			$scope.folderSelect--;
		}

		$scope.folderSelection();
	};

	$scope.selectAllGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++){
			$scope.googleFile[i].folder = "../img/checked_checkbox.png";
			$scope.folderSelect++;
		}

		$scope.folderSelection();
	};

	$scope.selectNoneGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++)
			$scope.googleFile[i].folder = "../img/checkbox.png";			

		$scope.folderSelect = 0;
		$scope.folderSelection();
	};

	$scope.selectAllDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++){
			$scope.dropboxFile[i].folder = "../img/checked_checkbox.png";
			$scope.folderSelect++;
		}

		$scope.folderSelection();
	};

	$scope.selectNoneDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++)
			$scope.dropboxFile[i].folder = "../img/checkbox.png";

		$scope.folderSelect = 0;
		$scope.folderSelection();
	};

	$scope.selectAllBox = function(){
		for(var i = 0; i < $scope.boxFile.length; i++){
			$scope.boxFile[i].folder = "../img/checked_checkbox.png";
			$scope.folderSelect++;
		}

		$scope.folderSelection();
	};

	$scope.selectNoneBox = function(){
		for(var i = 0; i < $scope.boxFile.length; i++)
			$scope.boxFile[i].folder = "../img/checkbox.png";

		$scope.folderSelect = 0;
		$scope.folderSelection();
	};

	$scope.selectAllLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++){
			$scope.localFile[i].folder = "../img/checked_checkbox.png";
			$scope.folderSelect++;
		}

		$scope.folderSelection();
	};

	$scope.selectNoneLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++)
			$scope.localFile[i].folder = "../img/checkbox.png";

		$scope.folderSelect = 0;
		$scope.folderSelection();
	};


	//-----------Destination

	$scope.googleDestFile = JSON.parse(JSON.stringify(gFile));
	$scope.dropboxDestFile = JSON.parse(JSON.stringify(dFile));
	$scope.boxDestFile = JSON.parse(JSON.stringify(bFile));
	$scope.localDestFile = JSON.parse(JSON.stringify(lFile));

	$scope.curDestDirGoogle = "/Home";

	$scope.intoGoogleDestFolder = function(f){
		$scope.curDestDirGoogle += "/" + f.name;
		$scope.googleDestFile = empty;
	}

	$scope.outofGoogleDestFolder = function(){
		if($scope.curDestDirGoogle !== "/Home"){
			while($scope.curDestDirGoogle[$scope.curDestDirGoogle.length-1] !== '/')
				$scope.curDestDirGoogle = $scope.curDestDirGoogle.slice(0, -1);

			$scope.curDestDirGoogle = $scope.curDestDirGoogle.slice(0, -1);
			$scope.googleDestFile = gFile.slice();
		}
	}

	$scope.curDestDirDropbox = "/Home";

	$scope.intoDropboxDestFolder = function(f){
		$scope.curDestDirDropbox += "/" + f.name;
		$scope.dropboxDestFile = empty;
	}

	$scope.outofDropboxDestFolder = function(){
		if($scope.curDestDirDropbox !== "/Home"){
			while($scope.curDestDirDropbox[$scope.curDestDirDropbox.length-1] !== '/')
				$scope.curDestDirDropbox = $scope.curDestDirDropbox.slice(0, -1);

			$scope.curDestDirDropbox = $scope.curDestDirDropbox.slice(0, -1);
			$scope.dropboxDestFile = dFile.slice();
		}
	}

	$scope.curDestDirBox = "/Home";

	$scope.intoBoxDestFolder = function(f){
		$scope.curDestDirBox += "/" + f.name;
		$scope.boxDestFile = empty;
	}

	$scope.outofBoxDestFolder = function(){
		if($scope.curDestDirBox !== "/Home"){
			while($scope.curDestDirBox[$scope.curDestDirBox.length-1] !== '/')
				$scope.curDestDirBox = $scope.curDestDirBox.slice(0, -1);

			$scope.curDestDirBox = $scope.curDestDirBox.slice(0, -1);
			$scope.boxDestFile = bFile.slice();
		}
	}

	$scope.curDestDirLocal = "/Home";

	$scope.intoLocalDestFolder = function(f){
		$scope.curDestDirLocal += "/" + f.name;
		$scope.locaDestFile = empty;
	}

	$scope.outofLocalDestFolder = function(){
		if($scope.curDestDirLocal !== "/Home"){
			while($scope.curDestDirLocal[$scope.curDestDirLocal.length-1] !== '/')
				$scope.curDestDirLocal = $scope.curDestDirLocal.slice(0, -1);

			$scope.curDestDirLocal = $scope.curDestDirLocal.slice(0, -1);
			$scope.localDestFile = lFile.slice();
		}
	}

	$scope.toggleDestFolder = function(x){
		if(x.folder === "../img/checkbox.png")
			x.folder = "../img/checked_checkbox.png";
		
		else
			x.folder = "../img/checkbox.png";
	};

	// -------------------- johnny: for APIs testing
	$scope.testGDrive = function(){
		gDriveTests()
	};

	$scope.testDropbox = function(){
		dropboxTests()
	};
});