var rootCreate = ['0AN9TACL_6_flUk9PVA'];

var empty = [];

var gFile = [];

var dFile = [{name: 'Resume', size:"0 MB", folder: "../img/checkbox.png", folderDest: "../img/checkbox.png"}];

var bFile = [{name: 'eLab', size:"0 MB", folder: "../img/checkbox.png", folderDest: "../img/checkbox.png"},
					{name: 'Physics', size:"0 MB", folder: "../img/checkbox.png", folderDest: "../img/checkbox.png"},
					{name: 'English', size:"0 MB", folder: "../img/checkbox.png", folderDest: "../img/checkbox.png"},
					{name: 'Lab', size:"0 MB", folder: "../img/checkbox.png", folderDest: "../img/checkbox.png"},
					{name: 'Math', size:"0 MB", folder: "../img/checkbox.png", folderDest: "../img/checkbox.png"},
					{name: 'Science', size:"0 MB", folder: "../img/checkbox.png", folderDest: "../img/checkbox.png"}];

var lFile = [];

angular.module('HomeCtrl', []).controller('HomeController', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
	$scope.showgoogle = true;

	$scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    $scope.createModal = false;
    $scope.toggleCreateModal = function(){
        $scope.createModal = !$scope.createModal;
    };

    $scope.renameModal = false;
    $scope.toggleRenameModal = function(){
        $scope.renameModal = !$scope.renameModal;
    };

    $scope.deleteModal = false;
    $scope.toggleDeleteModal = function(){
        $scope.deleteModal = !$scope.deleteModal;
    };

    $scope.pickModal = false;
    $scope.togglePickModal = function(){
        $scope.pickModal = !$scope.pickModal;
    };

    $scope.gFileSelect = {};
    $scope.selectOne = {folder_image: "../img/folder.png"};
    $scope.renameSelect = "";

    //-----------Create Operation----------//

    $scope.createGooglePerform = function(){
    	var title = angular.element(document.getElementById("google-folder-create").value).selector;
    	gdClient.createGFile(rootCreate[rootCreate.length-1],title,"application/vnd.google-apps.folder",function(resp, folder){
    		console.log(folder.id);
    		window.location = window.location.href;
    	});
    }

    $scope.createDropboxPerform = function() {
    	alert("createDropboxPerform called");
    
    	var title = angular.element(document.getElementById("dropbox-create").value).selector;
    	dbClient.mkdir(rootCreate[rootCreate.length-1], function(resp, folder) {
    		console.log(folder.id);
    		window.location = window.location.href;
    	});
    }

    $scope.createBoxPerform = function() {
    	alert("createBoxPerform called");
    }

    //-----------Rename Operation----------//

    $scope.renameGooglePerform = function(){
    	gdClient.rename($scope.selectOne.id, document.getElementById("google-folder-rename").value,function(file){
			console.log(file);
    		window.location = window.location.href;
		});

    	alert("renameGooglePerform called");
    }

    $scope.renameDropboxPerform = function() {
    	alert("renameDropboxPerform called");
    }

    $scope.renameBoxPerform = function() {
    	alert("renameBoxPerform called");
    }

    //-----------Delete Operation----------//

    $scope.deleteGooglePerform = function(){

    	var x = Object.keys($scope.gFileSelect).length;
    	for(var i in $scope.gFileSelect){
    		gdClient.deleteItem(i, function(){
    			x--;
    			// for(var j = 0; j < $scope.gFileSelect[i].sibling.length; j++){
    			// 	if($scope.gFileSelect[i].sibling[j].id === i){
    			// 		delete $scope.gFileSelect[i].sibling[j];
    			// 		delete $scope.gFileSelect[i];
    			// 		break;
    			// 	}
    			// }
	    		if(x === 0){
	    			$scope.gFileSelect = {}
	    			window.location = window.location.href;
	    		}
    		});
    	}
    }

    $scope.deleteDropboxPerform = function() {
    	alert("deleteDropboxPerform called");
    }

    $scope.deleteBoxPerform = function() {
    	alert("deleteBoxPerform called");
    }

    //-----------Local Upload------------//

    $scope.dropZone = angular.element(document.getElementById('drop-zone'));

    $scope.startUpload = function(files) {
        console.log("LOCAL FILE: ",files);
        var x = lFile.length;
        for(var i = 0; i < x; i++){
        	lFile.pop();
        }

        /*
        //----------
        // 02/11/16 for johnny testing
        for(var i = 0; i < files.length; i++){
        	fileData = files[i];
        	var reader = new FileReader();
			reader.readAsBinaryString(fileData);
			var base64Data = btoa(reader.result);
			console.log('READER....',base64Data)
			console.log('DONE reader')
        }
        */

        // continue

        for(var i = 0; i < files.length; i++){
			lFile.push({original: files[i], id: files[i].name, name: files[i].name, size: Math.ceil(files[i].size /= 1000000) || "N/A", folder: "../img/checkbox.png", folder_image: "../img/file.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: false});
			console.log(lFile);				
			if(files[i].size)
				lFile[lFile.length-1].size += " MB";
        }
        
        angular.element(document.getElementById('js-upload-files').value = "");
    }

    $scope.uploadForm = function() {
        var uploadFiles = angular.element(document.getElementById('js-upload-files').files);
        $scope.startUpload(uploadFiles);
    }

    $scope.dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        $scope.startUpload(e.dataTransfer.files)
    }

    $scope.dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    $scope.dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

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

	$scope.temp_parent = [];

	$scope.googleFile = gFile;
	$scope.dropboxFile = dFile;
	$scope.boxFile = bFile;
	$scope.localFile = lFile;

	$scope.curDirGoogle = "/";

	$scope.intoGoogleFolder = function(f){
		if(!f.directory)
			return;

		if(f.children.length === 0){
			$scope.temp_parent = f.sibling;

			if($scope.curDirGoogle === "/")
				$scope.curDirGoogle += f.name;

			else
				$scope.curDirGoogle += "/" + f.name;

			$scope.googleFile = empty;
			rootCreate.push(f.id);
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
						if(files[i].mimeType === "application/vnd.google-apps.folder"){
							f.children[cur].children.push({original: files[i], id: files[i].id, name: files[i].title, size: files[i].modifiedDate.split("T")[0] + "\n" + (Math.ceil(files[i].fileSize /= 1000000) || "N/A"), folder: "../img/checkbox.png", folder_image: "../img/folder.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: true, children: [], parent: f.children, sibling: f.children[cur].children});
						
							if(files[i].fileSize)
								f.children[cur].children[f.children[cur].children.length-1].size += " MB";
						}
							
						else{
							f.children[cur].children.push({original: files[i], id: files[i].id, name: files[i].title, size: files[i].modifiedDate.split("T")[0] + "\n" + (Math.ceil(files[i].fileSize /= 1000000) || "N/A"), folder: "../img/checkbox.png", folder_image: "../img/file.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: false, parent: f.children});
							if(files[i].fileSize)
								f.children[cur].children[f.children[cur].children.length-1].size += " MB";
						}
					}

					// f.children[cur].children[0].parent = f.children.slice();
					console.log("F CHILDREN: ", f.children[cur].children);
				});	
			}
		}

		if($scope.curDirGoogle === "/")
			$scope.curDirGoogle += f.name;

		else
			$scope.curDirGoogle += "/" + f.name;

		$scope.googleFile = f.children;
		rootCreate.push(f.id);
	}

	$scope.outofGoogleFolder = function(){
		if($scope.curDirGoogle !== "/"){
			while($scope.curDirGoogle[$scope.curDirGoogle.length-1] !== '/')
				$scope.curDirGoogle = $scope.curDirGoogle.slice(0, -1);

			$scope.curDirGoogle = $scope.curDirGoogle.slice(0, -1);

			if($scope.googleFile === empty){
				$scope.googleFile = $scope.temp_parent;
				$scope.temp_parent = [];
			}

			else
				$scope.googleFile = $scope.googleFile[0].parent;
		}

		rootCreate.pop();

		if($scope.curDirGoogle === "")
			$scope.curDirGoogle = "/";
	}
// 

// 

	$scope.intoDropboxFolder = function(f){
		if(!f.directory) 
			return;

		if(f.children.length === 0) {
			$scope.temp_parent = f.sibling;

			if($scope.curDirDropbox === "/")
				$scope.curDirDropbox += f.name;

			else
				$scope.curDirDropbox += "/" + f.name;

			$scope.dropboxFile = empty;
			rootCreate.push(f.id);
			return;
		}

		// for(var x = 0; x < f.children.length; x++){
		// 	if(f.children[x].directory){
		// 		dbClient.retrieveChildrenFiles(f.children[x].id,false,false,function(files, fileId){
		// 			var cur = -1;
		// 			for(var i = 0; i < f.children.length; i++){
		// 				if(f.children[i].id === fileId){
		// 					cur = i;
		// 					break;
		// 				}
		// 			}
		// 			console.log("ELAB: ", files);
		// 			for(var i = 0; i < files.length; i++){
		// 				if(files[i].mimeType === "application/vnd.google-apps.folder"){
		// 					f.children[cur].children.push({original: files[i], id: files[i].id, name: files[i].title, size: files[i].modifiedDate.split("T")[0] + "\n" + (Math.ceil(files[i].fileSize /= 1000000) || "N/A"), folder: "../img/checkbox.png", folder_image: "../img/folder.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: true, children: [], parent: f.children, sibling: f.children[cur].children});
						
		// 					if(files[i].fileSize)
		// 						f.children[cur].children[f.children[cur].children.length-1].size += " MB";
		// 				}
							
		// 				else{
		// 					f.children[cur].children.push({original: files[i], id: files[i].id, name: files[i].title, size: files[i].modifiedDate.split("T")[0] + "\n" + (Math.ceil(files[i].fileSize /= 1000000) || "N/A"), folder: "../img/checkbox.png", folder_image: "../img/file.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: false, parent: f.children});
		// 					if(files[i].fileSize)
		// 						f.children[cur].children[f.children[cur].children.length-1].size += " MB";
		// 				}
		// 			}

		// 			// f.children[cur].children[0].parent = f.children.slice();
		// 			console.log("F CHILDREN: ", f.children[cur].children);
		// 		});	
		// 	}
		// }

		$scope.dropboxFile = empty;
	}

	$scope.outofDropboxFolder = function(){
		if($scope.curDirDropbox !== "/"){
			while($scope.curDirDropbox[$scope.curDirDropbox.length-1] !== '/')
				$scope.curDirDropbox = $scope.curDirDropbox.slice(0, -1);

			$scope.curDirDropbox = $scope.curDirDropbox.slice(0, -1);
			$scope.dropboxFile = dFile;
		}

		if($scope.curDirDropbox === "")
			$scope.curDirDropbox = "/";
	}

	$scope.curDirBox = "/";

	$scope.intoBoxFolder = function(f){
		if($scope.curDirBox === "/")
			$scope.curDirBox += f.name;

		else
			$scope.curDirBox += "/" + f.name;

		$scope.boxFile = empty;
	}

	$scope.outofBoxFolder = function(){
		if($scope.curDirBox !== "/"){
			while($scope.curDirBox[$scope.curDirBox.length-1] !== '/')
				$scope.curDirBox = $scope.curDirBox.slice(0, -1);

			$scope.curDirBox = $scope.curDirBox.slice(0, -1);
			$scope.boxFile = bFile;
		}

		if($scope.curDirBox === "")
			$scope.curDirBox = "/";
	}

	$scope.curDirLocal = "/";

	$scope.folderSelectGoogle = 0;
	$scope.folderSelectDropbox = 0;
	$scope.folderSelectBox = 0;
	$scope.folderSelectLocal = 0;

	$scope.folderSelectionGoogle = function(){
		if($scope.folderSelectGoogle === 0){
			angular.element(document.getElementById("google-copy").disabled = true);
			angular.element(document.getElementById("google-move").disabled = true);
			angular.element(document.getElementById("google-rename").disabled = true);
			angular.element(document.getElementById("google-delete").disabled = true);
		}

		else if($scope.folderSelectGoogle === 1){
			angular.element(document.getElementById("google-copy").disabled = false);
			angular.element(document.getElementById("google-move").disabled = false);
			angular.element(document.getElementById("google-rename").disabled = false);
			angular.element(document.getElementById("google-delete").disabled = false);
		}

		else{
			angular.element(document.getElementById("google-copy").disabled = true);
			angular.element(document.getElementById("google-move").disabled = true);
			angular.element(document.getElementById("google-rename").disabled = true);
			angular.element(document.getElementById("google-delete").disabled = false);
		}
	};

	$scope.folderSelectionDropbox = function(){
		if($scope.folderSelectDropbox === 0){
			angular.element(document.getElementById("dropbox-copy").disabled = true);
			angular.element(document.getElementById("dropbox-move").disabled = true);
			angular.element(document.getElementById("dropbox-rename").disabled = true);
			angular.element(document.getElementById("dropbox-delete").disabled = true);
		}

		else if($scope.folderSelectDropbox === 1){
			angular.element(document.getElementById("dropbox-copy").disabled = false);
			angular.element(document.getElementById("dropbox-move").disabled = false);
			angular.element(document.getElementById("dropbox-rename").disabled = false);
			angular.element(document.getElementById("dropbox-delete").disabled = false);
		}

		else{
			angular.element(document.getElementById("dropbox-copy").disabled = true);
			angular.element(document.getElementById("dropbox-move").disabled = true);
			angular.element(document.getElementById("dropbox-rename").disabled = true);
			angular.element(document.getElementById("dropbox-delete").disabled = false);
		}
	};

	$scope.folderSelectionBox = function(){
		if($scope.folderSelectBox === 0){
			angular.element(document.getElementById("box-copy").disabled = true);
			angular.element(document.getElementById("box-move").disabled = true);
			angular.element(document.getElementById("box-rename").disabled = true);
			angular.element(document.getElementById("box-delete").disabled = true);
		}

		else if($scope.folderSelectBox === 1){
			angular.element(document.getElementById("box-copy").disabled = false);
			angular.element(document.getElementById("box-move").disabled = false);
			angular.element(document.getElementById("box-rename").disabled = false);
			angular.element(document.getElementById("box-delete").disabled = false);
		}

		else{
			angular.element(document.getElementById("box-copy").disabled = true);
			angular.element(document.getElementById("box-move").disabled = true);
			angular.element(document.getElementById("box-rename").disabled = true);
			angular.element(document.getElementById("box-delete").disabled = false);
		}
	};

	$scope.folderSelectionLocal = function(){
		if($scope.folderSelectLocal === 0)
			angular.element(document.getElementById("local-copy").disabled = true);

		else if($scope.folderSelectLocal === 1)
			angular.element(document.getElementById("local-copy").disabled = false);

		else
			angular.element(document.getElementById("local-copy").disabled = true);
	};

	$scope.toggleFolder = function(x, storage){
		console.log(storage);
		if(x.folder === "../img/checkbox.png"){
			x.folder = "../img/checked_checkbox.png";

			if(storage === "g"){
				$scope.gFileSelect[x.id] = x;
				$scope.folderSelectGoogle++;
				$scope.folderSelectionGoogle();
				$scope.renameSelect = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]].name;
				$scope.selectOne = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]];
				return;
			}
				
			if(storage === "d"){
				$scope.folderSelectDropbox++;
				$scope.folderSelectionDropbox();
				return;
			}

			if(storage === "b"){
				$scope.folderSelectBox++;
				$scope.folderSelectionBox();
				return;
			}

			if(storage === "l"){
				$scope.folderSelectLocal++;
				$scope.folderSelectionLocal();
				return;
			}
		}

		else{
			x.folder = "../img/checkbox.png";
			
			if(storage === "g"){
				delete $scope.gFileSelect[x.id];
				$scope.folderSelectGoogle--;
				$scope.folderSelectionGoogle();
				$scope.renameSelect = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]].name;
				$scope.selectOne = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]];
				return;
			}
				
			if(storage === "d"){
				$scope.folderSelectDropbox--;
				$scope.folderSelectionDropbox();
				return;
			}

			if(storage === "b"){
				$scope.folderSelectBox--;
				$scope.folderSelectionBox();
				return;
			}

			if(storage === "l"){
				$scope.folderSelectLocal--;
				$scope.folderSelectionLocal();
				return;
			}
		}
	};

	$scope.selectAllGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++){
			$scope.googleFile[i].folder = "../img/checked_checkbox.png";
			$scope.gFileSelect[$scope.googleFile[i].id] = $scope.googleFile[i];
			$scope.folderSelectGoogle++;
		}

		$scope.renameSelect = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]].name;
		$scope.selectOne = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]];
		$scope.folderSelectionGoogle();
	};

	$scope.selectNoneGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++){
			$scope.googleFile[i].folder = "../img/checkbox.png";
			delete $scope.gFileSelect[$scope.googleFile[i].id];
		}

		$scope.renameSelect = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]].name || "";
		$scope.selectOne = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]] || {folder_image: "../img/folder.png"};
		$scope.folderSelectGoogle = 0;
		$scope.folderSelectionGoogle();
	};

	$scope.selectAllDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++){
			$scope.dropboxFile[i].folder = "../img/checked_checkbox.png";
			$scope.folderSelectDropbox++;
		}

		$scope.folderSelectionDropbox();
	};

	$scope.selectNoneDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++)
			$scope.dropboxFile[i].folder = "../img/checkbox.png";

		$scope.folderSelectDropbox = 0;
		$scope.folderSelectionDropbox();
	};

	$scope.selectAllBox = function(){
		for(var i = 0; i < $scope.boxFile.length; i++){
			$scope.boxFile[i].folder = "../img/checked_checkbox.png";
			$scope.folderSelectBox++;
		}

		$scope.folderSelectionBox();
	};

	$scope.selectNoneBox = function(){
		for(var i = 0; i < $scope.boxFile.length; i++)
			$scope.boxFile[i].folder = "../img/checkbox.png";

		$scope.folderSelectBox = 0;
		$scope.folderSelectionBox();
	};

	$scope.selectAllLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++){
			$scope.localFile[i].folder = "../img/checked_checkbox.png";
			$scope.folderSelectLocal++;
		}

		$scope.folderSelectionLocal();
	};

	$scope.selectNoneLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++)
			$scope.localFile[i].folder = "../img/checkbox.png";

		$scope.folderSelectLocal = 0;
		$scope.folderSelectionLocal();
	};


	//-----------Destination-----------//

	$scope.temp_parentDest = [];

	$scope.googleDestFile = gFile;
	$scope.dropboxDestFile = dFile;
	$scope.boxDestFile = bFile;
	$scope.localDestFile = lFile;

	$scope.curDestDirGoogle = "/";

	$scope.intoGoogleDestFolder = function(f){
		if(!f.directory)
			return;

		if(f.children.length === 0){
			$scope.temp_parentDest = f.sibling;

			if($scope.curDestDirGoogle === "/")
				$scope.curDestDirGoogle += f.name;

			else
				$scope.curDestDirGoogle += "/" + f.name;

			$scope.googleDestFile = empty;
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
						if(files[i].mimeType === "application/vnd.google-apps.folder"){
							f.children[cur].children.push({id: files[i].id, name: files[i].title, size: Math.ceil(files[i].fileSize /= 1000000) || "N/A", folder: "../img/checkbox.png", folder_image: "../img/folder.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: true, children: [], parent: f.children, sibling: f.children[cur].children});
						
							if(files[i].fileSize)
								f.children[cur].children[f.children[cur].children.length-1].size += " MB";
						}
							
						else{
							f.children[cur].children.push({id: files[i].id, name: files[i].title, size: Math.ceil(files[i].fileSize /= 1000000) || "N/A", folder: "../img/checkbox.png", folder_image: "../img/file.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: false, parent: f.children});
							if(files[i].fileSize)
								f.children[cur].children[f.children[cur].children.length-1].size += " MB";
						}
					}

					// f.children[cur].children[0].parent = f.children.slice();
					console.log("F CHILDREN: ", f.children[cur].children);
				});	
			}
		}

		if($scope.curDestDirGoogle === "/")
			$scope.curDestDirGoogle += f.name;

		else
			$scope.curDestDirGoogle += "/" + f.name;

		$scope.googleDestFile = f.children;
	}

	$scope.outofGoogleDestFolder = function(){
		if($scope.curDestDirGoogle !== "/"){
			while($scope.curDestDirGoogle[$scope.curDestDirGoogle.length-1] !== '/')
				$scope.curDestDirGoogle = $scope.curDestDirGoogle.slice(0, -1);

			$scope.curDestDirGoogle = $scope.curDestDirGoogle.slice(0, -1);

			if($scope.googleDestFile === empty){
				$scope.googleDestFile = $scope.temp_parentDest;
				$scope.temp_parentDest = [];
			}

			else
				$scope.googleDestFile = $scope.googleDestFile[0].parent;
		}


		if($scope.curDestDirGoogle === "")
			$scope.curDestDirGoogle = "/";
	}

	$scope.curDestDirDropbox = "/";

	$scope.intoDropboxDestFolder = function(f){
		if($scope.curDestDirDropbox === "/")
			$scope.curDestDirDropbox += f.name;

		else
			$scope.curDestDirDropbox += "/" + f.name;

		$scope.dropboxDestFile = empty;
	}

	$scope.outofDropboxDestFolder = function(){
		if($scope.curDestDirDropbox !== "/"){
			while($scope.curDestDirDropbox[$scope.curDestDirDropbox.length-1] !== '/')
				$scope.curDestDirDropbox = $scope.curDestDirDropbox.slice(0, -1);

			$scope.curDestDirDropbox = $scope.curDestDirDropbox.slice(0, -1);
			$scope.dropboxDestFile = dFile.slice();
		}

		if($scope.curDestDirDropbox === "")
			$scope.curDestDirDropbox = "/";
	}

	$scope.curDestDirBox = "/";

	$scope.intoBoxDestFolder = function(f){
		if($scope.curDestDirBox === "/")
			$scope.curDestDirBox += f.name;

		else
			$scope.curDestDirBox += "/" + f.name;

		$scope.boxDestFile = empty;
	}

	$scope.outofBoxDestFolder = function(){
		if($scope.curDestDirBox !== "/"){
			while($scope.curDestDirBox[$scope.curDestDirBox.length-1] !== '/')
				$scope.curDestDirBox = $scope.curDestDirBox.slice(0, -1);

			$scope.curDestDirBox = $scope.curDestDirBox.slice(0, -1);
			$scope.boxDestFile = bFile.slice();
		}

		if($scope.curDestDirBox === "")
			$scope.curDestDirBox = "/";
	}

	$scope.curDestDirLocal = "/";


	$scope.intoLocalDestFolder = function(f){
		if(!f.directory)
			return;

		if($scope.curDestDirLocal === "/")
			$scope.curDestDirLocal += f.name;

		else
			$scope.curDestDirLocal += "/" + f.name;

		$scope.locaDestFile = empty;
	}

	$scope.outofLocalDestFolder = function(){
		if($scope.curDestDirLocal !== "/"){
			while($scope.curDestDirLocal[$scope.curDestDirLocal.length-1] !== '/')
				$scope.curDestDirLocal = $scope.curDestDirLocal.slice(0, -1);

			$scope.curDestDirLocal = $scope.curDestDirLocal.slice(0, -1);
			$scope.localDestFile = lFile.slice();
		}

		if($scope.curDestDirLocal === "")
			$scope.curDestDirLocal = "/";
	}


	$scope.folderSelectDestGoogle = 0;
	$scope.folderSelectDestDropbox = 0;
	$scope.folderSelectDestBox = 0;
	$scope.folderSelectDestLocal = 0;

	$scope.folderSelectionDestGoogle = function(){
		// if($scope.folderSelectDestGoogle === 0){
		// 	angular.element(document.getElementById("google-confirm").disabled = true);
		// }

		// else if($scope.folderSelectDestGoogle === 1){
		// 	angular.element(document.getElementById("google-confirm").disabled = false);
		// }

		// else{
		// 	angular.element(document.getElementById("google-confirm").disabled = false);
		// }
	};

	$scope.folderSelectionDestDropbox = function(){
		// if($scope.folderSelectDestDropbox === 0){
		// 	angular.element(document.getElementById("dropbox-confirm").disabled = true);
		// }

		// else if($scope.folderSelectDestDropbox === 1){
		// 	angular.element(document.getElementById("dropbox-confirm").disabled = false);
		// }

		// else{
		// angular.element(document.getElementById("dropbox-confirm").disabled = false);
		// }
	};

	$scope.folderSelectionDestBox = function(){
		// if($scope.folderSelectDestBox === 0){
		// 	angular.element(document.getElementById("box-confirm").disabled = true);
		// }

		// else if($scope.folderSelectDestBox === 1){
		// 	angular.element(document.getElementById("box-confirm").disabled = false);
		// }

		// else{
		// 	angular.element(document.getElementById("box-confirm").disabled = false);v
		// }
	};

// WORK ON THIS SHIT MATT
	$scope.folderSelectionDestLocal = function(){
		// if($scope.folderSelectDestLocal === 0)
		// 	angular.element(document.getElementById("local-confirm").disabled = true);

		// else if($scope.folderSelectDestLocal === 1)
		// 	angular.element(document.getElementById("local-confirm").disabled = false);

		// else
		// 	angular.element(document.getElementById("local-confirm").disabled = false);
	};

	// WOKR ON THIS SHIT MATT

	$scope.toggleDestFolder = function(x, storage){
		console.log(storage);
		if(x.folderDest === "../img/checkbox.png"){
			x.folderDest = "../img/checked_checkbox.png";

			if(storage === "g"){
				$scope.folderSelectDestGoogle++;
				$scope.folderSelectionDestGoogle();
				return;
			}
				
			if(storage === "d"){
				$scope.folderSelectDestDropbox++;
				$scope.folderSelectionDestDropbox();
				return;
			}

			if(storage === "b"){
				$scope.folderSelectDestBox++;
				$scope.folderSelectionDestBox();
				return;
			}

			if(storage === "l"){
				$scope.folderSelectDestLocal++;
				$scope.folderSelectionDestLocal();
				return;
			}
		}

		else{
			x.folderDest = "../img/checkbox.png";
			
			if(storage === "g"){
				$scope.folderSelectDestGoogle--;
				$scope.folderSelectionDestGoogle();
				return;
			}
				
			if(storage === "d"){
				$scope.folderSelectDestDropbox--;
				$scope.folderSelectionDestDropbox();
				return;
			}

			if(storage === "b"){
				$scope.folderSelectDestBox--;
				$scope.folderSelectionDestBox();
				return;
			}

			if(storage === "l"){
				$scope.folderSelectDestLocal--;
				$scope.folderSelectionDestLocal();
				return;
			}
		}
	};

	$scope.selectAllDestGoogle = function(){
		for(var i = 0; i < $scope.googleDestFile.length; i++){
			$scope.googleDestFile[i].folderDest = "../img/checked_checkbox.png";
			$scope.folderSelectDestGoogle++;
		}

		$scope.folderSelectionDestGoogle();
	};

	$scope.selectNoneDestGoogle = function(){
		for(var i = 0; i < $scope.googleDestFile.length; i++)
			$scope.googleDestFile[i].folderDest = "../img/checkbox.png";			

		$scope.folderSelectDestGoogle = 0;
		$scope.folderSelectionDestGoogle();
	};

	$scope.selectAllDestDropbox = function(){
		for(var i = 0; i < $scope.dropboxDestFile.length; i++){
			$scope.dropboxDestFile[i].folderDest = "../img/checked_checkbox.png";
			$scope.folderSelectDestDropbox++;
		}

		$scope.folderSelectionDestDropbox();
	};

	$scope.selectNoneDestDropbox = function(){
		for(var i = 0; i < $scope.dropboxDestFile.length; i++)
			$scope.dropboxDestFile[i].folderDest = "../img/checkbox.png";

		$scope.folderSelectDestDropbox = 0;
		$scope.folderSelectionDestDropbox();
	};

	$scope.selectAllDestBox = function(){
		for(var i = 0; i < $scope.boxDestFile.length; i++){
			$scope.boxDestFile[i].folderDest = "../img/checked_checkbox.png";
			$scope.folderSelectDestBox++;
		}

		$scope.folderSelectionDestBox();
	};

	$scope.selectNoneDestBox = function(){
		for(var i = 0; i < $scope.boxDestFile.length; i++)
			$scope.boxDestFile[i].folderDest = "../img/checkbox.png";

		$scope.folderSelectDestBox = 0;
		$scope.folderSelectionDestBox();
	};

	$scope.selectAllDestLocal = function(){
		for(var i = 0; i < $scope.localDestFile.length; i++){
			$scope.localDestFile[i].folderDest = "../img/checked_checkbox.png";
			$scope.folderSelectDestLocal++;
		}

		$scope.folderSelectionDestLocal();
	};

	$scope.selectNoneDestLocal = function(){
		for(var i = 0; i < $scope.localDestFile.length; i++)
			$scope.localDestFile[i].folderDest = "../img/checkbox.png";

		$scope.folderSelectDestLocal = 0;
		$scope.folderSelectionDestLocal();
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
  })
.directive('mod', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div style="width:40%" class="modal-dialog">' + 
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
  })
.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});