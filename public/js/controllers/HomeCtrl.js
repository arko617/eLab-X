var empty = [];

// var gFile = [{name: 'Workspace', folder: "../img/checkbox.png"}, 
// 					{name: 'Random', folder: "../img/checkbox.png"},
// 					{name: 'Project', folder: "../img/checkbox.png"}];
var gFile = [];

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
					{name: 'I', folder: "../img/checkbox.png"},
					{name: 'J', folder: "../img/checkbox.png"},
					{name: 'K', folder: "../img/checkbox.png"},
					{name: 'L', folder: "../img/checkbox.png"},
					{name: 'M', folder: "../img/checkbox.png"},
					{name: 'N', folder: "../img/checkbox.png"},
					{name: 'O', folder: "../img/checkbox.png"},
					{name: 'P', folder: "../img/checkbox.png"},
					{name: 'Q', folder: "../img/checkbox.png"},
					{name: 'R', folder: "../img/checkbox.png"},
					{name: 'S', folder: "../img/checkbox.png"},
					{name: 'T', folder: "../img/checkbox.png"},
					{name: 'U', folder: "../img/checkbox.png"},
					{name: 'V', folder: "../img/checkbox.png"},
					{name: 'W', folder: "../img/checkbox.png"},
					{name: 'X', folder: "../img/checkbox.png"},
					{name: 'Y', folder: "../img/checkbox.png"},
					{name: 'Z', folder: "../img/checkbox.png"}];


angular.module('HomeCtrl', []).controller('HomeController', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {

	$scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    $scope.deleteModal = false;
    $scope.toggleDeleteModal = function(){
        $scope.deleteModal = !$scope.deleteModal;
    };

	//-----------Source-----------//

	$scope.createHoverIn = function(){
		angular.element(document.getElementById("google-create").innerHTML = "Create");
		angular.element(document.getElementById("dropbox-create").innerHTML = "Create");
		angular.element(document.getElementById("box-create").innerHTML = "Create");
		angular.element(document.getElementById("local-create").innerHTML = "Pick");
	}

	$scope.createHoverOut = function(){
		angular.element(document.getElementById("google-create").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-folder-open'></span>");
		angular.element(document.getElementById("dropbox-create").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-folder-open'></span>");
		angular.element(document.getElementById("box-create").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-folder-open'></span>");
		angular.element(document.getElementById("local-create").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-download-alt'></span>");
	}

	$scope.renameHoverIn = function(){
		angular.element(document.getElementById("google-rename").innerHTML = "Rename");
		angular.element(document.getElementById("dropbox-rename").innerHTML = "Rename");
		angular.element(document.getElementById("box-rename").innerHTML = "Rename");
		angular.element(document.getElementById("local-rename").innerHTML = "Rename");
	}

	$scope.renameHoverOut = function(){
		angular.element(document.getElementById("google-rename").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-pencil'></span>");
		angular.element(document.getElementById("dropbox-rename").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-pencil'></span>");
		angular.element(document.getElementById("box-rename").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-pencil'></span>");
		angular.element(document.getElementById("local-rename").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-pencil'></span>");
	}

	$scope.copyHoverIn = function(){
		angular.element(document.getElementById("google-copy").innerHTML = "Copy");
		angular.element(document.getElementById("dropbox-copy").innerHTML = "Copy");
		angular.element(document.getElementById("box-copy").innerHTML = "Copy");
		angular.element(document.getElementById("local-copy").innerHTML = "Copy");
	}

	$scope.copyHoverOut = function(){
		angular.element(document.getElementById("google-copy").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-file'></span>");
		angular.element(document.getElementById("dropbox-copy").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-file'></span>");
		angular.element(document.getElementById("box-copy").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-file'></span>");
		angular.element(document.getElementById("local-copy").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-file'></span>");
	}

	$scope.moveHoverIn = function(){
		angular.element(document.getElementById("google-move").innerHTML = "Move");
		angular.element(document.getElementById("dropbox-move").innerHTML = "Move");
		angular.element(document.getElementById("box-move").innerHTML = "Move");
		angular.element(document.getElementById("local-move").innerHTML = "Move");
	}

	$scope.moveHoverOut = function(){
		angular.element(document.getElementById("google-move").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-transfer'></span>");
		angular.element(document.getElementById("dropbox-move").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-transfer'></span>");
		angular.element(document.getElementById("box-move").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-transfer'></span>");
		angular.element(document.getElementById("local-move").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-transfer'></span>");
	}

	$scope.deleteHoverIn = function(){
		angular.element(document.getElementById("google-delete").innerHTML = "Delete");
		angular.element(document.getElementById("dropbox-delete").innerHTML = "Delete");
		angular.element(document.getElementById("box-delete").innerHTML = "Delete");
		angular.element(document.getElementById("local-delete").innerHTML = "Delete");
	}

	$scope.deleteHoverOut = function(){
		angular.element(document.getElementById("google-delete").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-trash'></span>");
		angular.element(document.getElementById("dropbox-delete").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-trash'></span>");
		angular.element(document.getElementById("box-delete").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-trash'></span>");
		angular.element(document.getElementById("local-delete").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-trash'></span>");
	}

	$scope.selectHoverIn = function(){
		angular.element(document.getElementById("google-select").innerHTML = "<span>Select<br>All</span>");
		angular.element(document.getElementById("dropbox-select").innerHTML = "<span>Select<br>All</span>");
		angular.element(document.getElementById("box-select").innerHTML = "<span>Select<br>All</span>");
		angular.element(document.getElementById("local-select").innerHTML = "<span>Select<br>All</span>");
	}

	$scope.selectHoverOut = function(){
		angular.element(document.getElementById("google-select").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		angular.element(document.getElementById("dropbox-select").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		angular.element(document.getElementById("box-select").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		angular.element(document.getElementById("local-select").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
	}

	$scope.unselectHoverIn = function(){
		angular.element(document.getElementById("google-unselect").innerHTML = "<span>Unselect<br>All</span>");
		angular.element(document.getElementById("dropbox-unselect").innerHTML = "<span>Unselect<br>All</span>");
		angular.element(document.getElementById("box-unselect").innerHTML = "<span>Unselect<br>All</span>");
		angular.element(document.getElementById("local-unselect").innerHTML = "<span>Unselect<br>All</span>");
	}

	$scope.unselectHoverOut = function(){
		angular.element(document.getElementById("google-unselect").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		angular.element(document.getElementById("dropbox-unselect").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		angular.element(document.getElementById("box-unselect").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		angular.element(document.getElementById("local-unselect").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
	}

	$scope.confirmHoverIn = function(){
		angular.element(document.getElementById("google-confirm").innerHTML = "Confirm");
		angular.element(document.getElementById("dropbox-confirm").innerHTML = "Confirm");
		angular.element(document.getElementById("box-confirm").innerHTML = "Confirm");
		angular.element(document.getElementById("local-confirm").innerHTML = "Confirm");
	}

	$scope.confirmHoverOut = function(){
		angular.element(document.getElementById("google-confirm").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-up'></span>");
		angular.element(document.getElementById("dropbox-confirm").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-up'></span>");
		angular.element(document.getElementById("box-confirm").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-up'></span>");
		angular.element(document.getElementById("local-confirm").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-up'></span>");
	}

	$scope.cancelHoverIn = function(){
		angular.element(document.getElementById("google-cancel").innerHTML = "Cancel");
		angular.element(document.getElementById("dropbox-cancel").innerHTML = "Cancel");
		angular.element(document.getElementById("box-cancel").innerHTML = "Cancel");
		angular.element(document.getElementById("local-cancel").innerHTML = "Cancel");
	}

	$scope.cancelHoverOut = function(){
		angular.element(document.getElementById("google-cancel").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-down'></span>");
		angular.element(document.getElementById("dropbox-cancel").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-down'></span>");
		angular.element(document.getElementById("box-cancel").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-down'></span>");
		angular.element(document.getElementById("local-cancel").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-down'></span>");
	}

	$scope.selectDestHoverIn = function(){
		angular.element(document.getElementById("google-selectDest").innerHTML = "<span>Select<br>All</span>");
		angular.element(document.getElementById("dropbox-selectDest").innerHTML = "<span>Select<br>All</span>");
		angular.element(document.getElementById("box-selectDest").innerHTML = "<span>Select<br>All</span>");
		angular.element(document.getElementById("local-selectDest").innerHTML = "<span>Select<br>All</span>");
	}

	$scope.selectDestHoverOut = function(){
		angular.element(document.getElementById("google-selectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		angular.element(document.getElementById("dropbox-selectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		angular.element(document.getElementById("box-selectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		angular.element(document.getElementById("local-selectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
	}

	$scope.unselectDestHoverIn = function(){
		angular.element(document.getElementById("google-unselectDest").innerHTML = "<span>Unselect<br>All</span>");
		angular.element(document.getElementById("dropbox-unselectDest").innerHTML = "<span>Unselect<br>All</span>");
		angular.element(document.getElementById("box-unselectDest").innerHTML = "<span>Unselect<br>All</span>");
		angular.element(document.getElementById("local-unselectDest").innerHTML = "<span>Unselect<br>All</span>");
	}

	$scope.unselectDestHoverOut = function(){
		angular.element(document.getElementById("google-unselectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		angular.element(document.getElementById("dropbox-unselectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		angular.element(document.getElementById("box-unselectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		angular.element(document.getElementById("local-unselectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
	}

	// $scope.googleFile = JSON.parse(JSON.stringify(gFile));
	// $scope.dropboxFile = JSON.parse(JSON.stringify(dFile));
	// $scope.boxFile = JSON.parse(JSON.stringify(bFile));
	// $scope.localFile = JSON.parse(JSON.stringify(lFile));

	$scope.googleFile = gFile;
	$scope.dropboxFile = dFile;
	$scope.boxFile = bFile;
	$scope.localFile = lFile;

	$scope.curDirGoogle = "/Home";

	$scope.intoGoogleFolder = function(f){
		if(!f.directory){
			alert("NOT A FOLDER");
			return;
		}

		if(f.children.length === 0){
			alert("FOLDER IS EMPTY");
			return;
		}
		
		for(var x = 0; x < f.children.length; x++){
			if(f.children[x].directory){
				gdClient.retrieveChildrenFiles(f.children[x].id,false,false,function(files, fileId){
					var cur = -1;
					for(var i = 0; i < f.children.length; i++){
						if(f.children[i].id === fileId){
							cur = i;
							break;
						}
					}
					console.log("ELAB: ", files);
					for(var i = 0; i < files.length; i++){
						if(files[i].mimeType === "application/vnd.google-apps.folder")
							f.children[cur].children.push({id: files[i].id, name: files[i].title, folder: "../img/checkbox.png", directory: true, children: [], parent: []});
							
						else
							f.children[cur].children.push({id: files[i].id, name: files[i].title, folder: "../img/checkbox.png", directory: false, parent: []});
					}

					f.children[cur].children[0].parent = f.children.slice();
					console.log("F CHILDREN: ", f.children[cur].children);
				});	
			}
		}

		$scope.curDirGoogle += "/" + f.name;
		$scope.googleFile = f.children;
	}

	$scope.outofGoogleFolder = function(){
		if($scope.curDirGoogle !== "/Home"){
			while($scope.curDirGoogle[$scope.curDirGoogle.length-1] !== '/')
				$scope.curDirGoogle = $scope.curDirGoogle.slice(0, -1);

			$scope.curDirGoogle = $scope.curDirGoogle.slice(0, -1);
			$scope.googleFile = $scope.googleFile[0].parent;
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

	// var i;

	// var scroll_1 = function(){
	// 	if(i > 1025)
	// 		return;

	// 	else
	// 		window.scrollTo(0, i+=10);

	// 	$timeout(scroll_2, 1);
	// }

	// var scroll_2 = function(){
	// 	if(i > 1025)
	// 		return;

	// 	else
	// 		window.scrollTo(0, i+=10);

	// 	$timeout(scroll_1, 1);
	// }

	// $scope.scroll = function(){
	// 	i = window.pageYOffset;
	// 	$timeout(scroll_1, 1);
	// }

	// var scrolling_1 = function(){
	// 	if(i < 185){
	// 		$scope.showDestgoogle=false;
	// 		$scope.showDestdropbox=false;
	// 		$scope.showDestbox=false;
	// 		$scope.showDestlocal= false;
	// 		$scope.showDestination=false;
	// 		return;
	// 	}

	// 	else
	// 		window.scrollTo(0, i-=10);

	// 	$timeout(scrolling_2, 1);
	// }

	// var scrolling_2 = function(){
	// 	if(i < 185){
	// 		$scope.showDestgoogle=false;
	// 		$scope.showDestdropbox=false;
	// 		$scope.showDestbox=false;
	// 		$scope.showDestlocal= false;
	// 		$scope.showDestination=false;
	// 		return;
	// 	}

	// 	else
	// 		window.scrollTo(0, i-=10);

	// 	$timeout(scrolling_1, 1);
	// }

	// $scope.scrollBack = function(){
	// 	i = window.pageYOffset;
	// 	$timeout(scrolling_1, 1);
	// }

	$scope.folderSelect = 0;

	$scope.create = "";
	$scope.rename = "disabled";
	$scope.del = "disabled";
	$scope.transfer = "disabled";
	$scope.selectNone = "disabled";

	$scope.folderSelection = function(){
		if($scope.folderSelect === 0){
			$scope.create = "";
			$scope.rename = "disabled";
			$scope.del = "disabled";
			$scope.transfer = "disabled";
			$scope.selectNone = "disabled";
		}

		if($scope.folderSelect === 1){
			$scope.create = "disabled";
			$scope.rename = "";
			$scope.del = "";
			$scope.transfer = "";
			$scope.selectNone = "";
		}

		if($scope.folderSelect > 1){
			$scope.create = "disabled";
			$scope.rename = "disabled";
			$scope.del = "";
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


	//-----------Destination-----------//

	$scope.googleDestFile = gFile;
	$scope.dropboxDestFile = dFile;
	$scope.boxDestFile = bFile;
	$scope.localDestFile = lFile;

	$scope.curDestDirGoogle = "/Home";

	$scope.intoGoogleDestFolder = function(f){

		if(!f.directory){
			alert("NOT A FOLDER");
			return;
		}

		if(f.children.length === 0){
			alert("FOLDER IS EMPTY");
			return;
		}
		
		for(var x = 0; x < f.children.length; x++){
			if(f.children[x].directory){
				gdClient.retrieveChildrenFiles(f.children[x].id,false,false,function(files, fileId){
					var cur = -1;
					for(var i = 0; i < f.children.length; i++){
						if(f.children[i].id === fileId){
							cur = i;
							break;
						}
					}
					console.log("ELAB: ", files);
					for(var i = 0; i < files.length; i++){
						if(files[i].mimeType === "application/vnd.google-apps.folder")
							f.children[cur].children.push({id: files[i].id, name: files[i].title, folder: "../img/checkbox.png", directory: true, children: [], parent: []});
							
						else
							f.children[cur].children.push({id: files[i].id, name: files[i].title, folder: "../img/checkbox.png", directory: false, parent: []});
					}

					f.children[cur].children[0].parent = f.children.slice();
					console.log("F CHILDREN: ", f.children[cur].children);
				});	
			}
		}

		$scope.curDestDirGoogle += "/" + f.name;
		$scope.googleDestFile = f.children;
	}

	$scope.outofGoogleDestFolder = function(){
		if($scope.curDestDirGoogle !== "/Home"){
			while($scope.curDestDirGoogle[$scope.curDestDirGoogle.length-1] !== '/')
				$scope.curDestDirGoogle = $scope.curDestDirGoogle.slice(0, -1);

			$scope.curDestDirGoogle = $scope.curDestDirGoogle.slice(0, -1);
			$scope.googleDestFile = $scope.googleDestFile[0].parent;
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

	$scope.selectAllDestGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++){
			$scope.googleDestFile[i].folder = "../img/checked_checkbox.png";
		}
	};

	$scope.selectNoneDestGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++)
			$scope.googleDestFile[i].folder = "../img/checkbox.png";			
	};

	$scope.selectAllDestDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++){
			$scope.dropboxDestFile[i].folder = "../img/checked_checkbox.png";
		}
	};

	$scope.selectNoneDestDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++)
			$scope.dropboxDestFile[i].folder = "../img/checkbox.png";
	};

	$scope.selectAllDestBox = function(){
		for(var i = 0; i < $scope.boxFile.length; i++){
			$scope.boxDestFile[i].folder = "../img/checked_checkbox.png";
		}
	};

	$scope.selectNoneDestBox = function(){
		for(var i = 0; i < $scope.boxFile.length; i++)
			$scope.boxDestFile[i].folder = "../img/checkbox.png";
	};

	$scope.selectAllDestLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++){
			$scope.localDestFile[i].folder = "../img/checked_checkbox.png";
		}
	};

	$scope.selectNoneDestLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++)
			$scope.localDestFile[i].folder = "../img/checkbox.png";
	};

	// -------------------- johnny: for APIs testing
	$scope.testGDrive = function(){
		gDriveTests()
	};

	$scope.testDropbox = function(){
		dropboxTests()
	};
}])
.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<center><h4 class="modal-title">{{ title }}</h4></center>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });