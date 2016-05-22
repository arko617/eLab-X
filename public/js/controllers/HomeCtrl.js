var rootCreate = ['0AN9TACL_6_flUk9PVA'];
var rootCreateDest = ['0AN9TACL_6_flUk9PVA'];
var dBoxToGDriveCheck = 0;
var gDriveToDBoxCheck = 0;
console.log("COOOOOOKKKKKIIIIIEEEEE: ", document.cookie);
var empty = [];

var gFile = [];

// var bFile = [{name: 'Resume', size:"0 MB", folder: "../img/checkbox.png", folderDest: "../img/checkbox.png"}];
var bFile = [];

var dFile = [];

var lFile = [];

var isEmpty = function(obj) {
    for(var key in obj) {
	    if(obj.hasOwnProperty(key))
    	    return false;
    }
    return true;
};


var setCookie = function(cvalue, exseconds) {
    var d = new Date();
    d.setTime(d.getTime() + (exseconds*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cvalue + "; " + expires;
};


//Change name to "alphabeticizedSort"
var alphabeticizedSort = function(a, b){
    if(a.name.toLowerCase() > b.name.toLowerCase())
        return 1;

    else if(a.name.toLowerCase() < b.name.toLowerCase())
        return -1;

    else
        return 0;
};

//Works! But is this default behavior
var chronologicalSort = function(a, b) {
   var aModifiedDate = a.window.IFrame1.document.lastModified;
   var bModifiedDate = b.window.IFrame1.document.lastModified;

   console.log("HELLO");
   console.log(aModifiedDate);

   console.log(bModifiedDate);

   if(aModifiedDate > bModifiedDate)
        return 1;
    else if(aModifiedDate < bModifiedDate)
        return -1;
    else 
        return 0;
}

//Sorts from biggest file to smallest file
var fileSizeSort = function(a, b) {
    var aFileSize = a.size;
    var bFileSize = b.size;

    if(aFileSize > bFileSize) 
        return 1;
    else if(aFileSize < bFileSize) 
        return -1;
    else
        return 0;
}

var done = function(){
     document.getElementById("loadingDrive").style.display = "none";
};

angular.module('HomeCtrl', []).controller('HomeController', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {  
console.log("LOAAAAAAAADDDDDDDDDDDDDDDDDD: ", document.getElementById("loadingLocal").style.display);
    //AFTER REFRESH
    if(document.cookie === "0"){
        $scope.showgoogle = true;
        $scope.showdropbox = false;
        $scope.showbox = false;
        $scope.showlocal = false;
        $scope.googleStyle = {'background-color':'green'};
        $scope.dropboxStyle = {'background-color':'white'};
        $scope.boxStyle = {'background-color':'white'};
        $scope.localStyle = {'background-color':'white'};
    }

    else if(document.cookie === "1"){
        $scope.showgoogle = false;
        $scope.showdropbox = true;
        $scope.showbox = false;
        $scope.showlocal = false;
        $scope.googleStyle = {'background-color':'white'};
        $scope.dropboxStyle = {'background-color':'#339aff'};
        $scope.boxStyle = {'background-color':'white'};
        $scope.localStyle = {'background-color':'white'};
    }

    else if(document.cookie === "2"){
        $scope.showgoogle = false;
        $scope.showdropbox = false;
        $scope.showbox = true;
        $scope.showlocal = false;
        $scope.googleStyle = {'background-color':'white'};
        $scope.dropboxStyle = {'background-color':'white'};
        $scope.boxStyle = {'background-color':'violet'};
        $scope.localStyle = {'background-color':'white'};
    }

    else if(document.cookie === "3"){
        $scope.showgoogle = false;
        $scope.showdropbox = false;
        $scope.showbox = false;
        $scope.showlocal = true;
        $scope.googleStyle = {'background-color':'white'};
        $scope.dropboxStyle = {'background-color':'white'};
        $scope.boxStyle = {'background-color':'white'};
        $scope.localStyle = {'background-color':'red'};
    }
    

	$scope.showModal = false;
    $scope.toggleModal = function(){
        angular.element(document.getElementById("google-rename-refresh-input").innerHTML = "<input style='width:70%' type='text' name='newName' id='google-folder-rename' value='" + $scope.renameSelect + "'><br><br><br>");
        $scope.showModal = !$scope.showModal;
    };

    $scope.renameReplaceModal = false;
    $scope.toggleRenameReplaceFolderModal = function(){
        $scope.renameReplaceModal = !$scope.renameReplaceModal;
    };

    $scope.renameReplaceFileModal = false;
    $scope.toggleRenameReplaceFileModal = function(){
        $scope.renameReplaceFileModal = !$scope.renameReplaceFileModal;
    };

    //--------GOOGLE--------//
    $scope.createModalGoogle = false;
    $scope.toggleCreateModalGoogle = function(){
        $scope.createModalGoogle = !$scope.createModalGoogle;
        angular.element(document.getElementById("google-create-refresh-input").innerHTML = "<input style='width:70%' type='text' name='folderName' id='google-folder-create' value='New Folder'><br><br><br>");   
    };

    $scope.renameModalGoogle = false;
    $scope.toggleRenameModalGoogle = function(){
        $scope.renameModalGoogle = !$scope.renameModalGoogle;
        console.log($scope.renameSelect);
        angular.element(document.getElementById("google-rename-refresh-input").innerHTML = "<input style='width:70%' type='text' name='newName' id='google-folder-rename' value='" + $scope.renameSelect + "'><br><br><br>");   
    };

    $scope.deleteModalGoogle = false;
    $scope.toggleDeleteModalGoogle = function(){
        $scope.deleteModalGoogle = !$scope.deleteModalGoogle;

        console.log("FILE-FLAG", $scope.fileFlag);
        console.log("FOLDER-FLAG", $scope.folderFlag);

        if(!isEmpty($scope.gFileUnselect)){
			angular.element(document.getElementById("google-folder-delete").innerHTML = "<img src='../img/folder.png' style='width:100px;height:100px;'><h4>You have at least one unselected file/folder inside a selected folder</h4><h4><em>(PLEASE FIX THE ISSUE TO CONTINUE...)</em></h4><br>");
			angular.element(document.getElementById("google-delete-button").disabled = true);
			return;
		}

        if($scope.fileFlag === 0 && $scope.folderFlag === 1){
        	angular.element(document.getElementById("google-folder-delete").innerHTML = "<img src='" + $scope.selectOne.folder_image + "' style='width:100px;height:100px;'><h4>" + $scope.renameSelect + "</h4><h4><em>(It may contain additional files and/or folders)</em></h4><br>");
        	angular.element(document.getElementById("google-delete-button").disabled = false);
        }

        else if($scope.fileFlag === 1 && $scope.folderFlag === 0){
        	angular.element(document.getElementById("google-folder-delete").innerHTML = "<img src='" + $scope.selectOne.folder_image + "' style='width:100px;height:100px;'><h4>" + $scope.renameSelect + "</h4><br>");
        	angular.element(document.getElementById("google-delete-button").disabled = false);
        }

        else if($scope.fileFlag > 1 && $scope.folderFlag === 0){
        	angular.element(document.getElementById("google-folder-delete").innerHTML = "<img src='../img/file.png' style='width:100px;height:100px;'><h4>All The Selected Files</h4><br>");
        	angular.element(document.getElementById("google-delete-button").disabled = false);
        }

        else if($scope.fileFlag === 0 && $scope.folderFlag > 1){
        	angular.element(document.getElementById("google-folder-delete").innerHTML = "<img src='../img/folder.png' style='width:100px;height:100px;'><h4>All The Selected Folders</h4><h4><em>(Some of them may contain additional files and/or folders)</em></h4><br>");
        	angular.element(document.getElementById("google-delete-button").disabled = false);
        }

        else{
        	angular.element(document.getElementById("google-folder-delete").innerHTML = "<img src='../img/folder.png' style='width:100px;height:100px;'><h4 style='display:inline-block'>&nbsp;.&nbsp;.&nbsp;.&nbsp;</h4><img src='../img/file.png' style='width:100px;height:100px;'><h4>All The Selected Files and Folders</h4><h4><em>(Some of the folders may contain additional files and/or folders)</em></h4><br>");
        	angular.element(document.getElementById("google-delete-button").disabled = false);
        }
    };


    //--------DROPBOX--------//
    $scope.createModalDropbox = false;
    $scope.toggleCreateModalDropbox = function(){
        $scope.createModalDropbox = !$scope.createModalDropbox;
        angular.element(document.getElementById("dropbox-create-refresh-input").innerHTML = "<input style='width:70%' type='text' name='folderName' id='dropbox-folder-create' value='New Folder'><br><br><br>");   
    };

    $scope.renameModalDropbox = false;
    $scope.toggleRenameModalDropbox = function(){
        $scope.renameModalDropbox = !$scope.renameModalDropbox;
        angular.element(document.getElementById("dropbox-rename-refresh-input").innerHTML = "<input style='width:70%' type='text' name='newName' id='dropbox-folder-rename' value='" + $scope.renameSelectDB + "'><br><br><br>");   
    };

    $scope.deleteModalDropbox = false;
    $scope.toggleDeleteModalDropbox = function(){
        $scope.deleteModalDropbox = !$scope.deleteModalDropbox;
        console.log($scope.dFileUnselect);

        console.log("FILE-FLAG-DB", $scope.fileFlagDB);
        console.log("FOLDER-FLAG-DB", $scope.folderFlagDB);

        if(!isEmpty($scope.dFileUnselect)){
			angular.element(document.getElementById("dropbox-folder-delete").innerHTML = "<img src='../img/folder.png' style='width:100px;height:100px;'><h4>You have at least one unselected file/folder inside a selected folder</h4><h4><em>(PLEASE FIX THE ISSUE TO CONTINUE...)</em></h4><br>");
			angular.element(document.getElementById("dropbox-delete-button").disabled = true);
			return;
		}

        if($scope.fileFlagDB === 0 && $scope.folderFlagDB === 1){
        	angular.element(document.getElementById("dropbox-folder-delete").innerHTML = "<img src='" + $scope.selectOneDB.folder_image + "' style='width:100px;height:100px;'><h4>" + $scope.renameSelectDB + "</h4><h4><em>(It may contain additional files and/or folders)</em></h4><br>");
        	angular.element(document.getElementById("dropbox-delete-button").disabled = false);
        }

        else if($scope.fileFlagDB === 1 && $scope.folderFlagDB === 0){
        	angular.element(document.getElementById("dropbox-folder-delete").innerHTML = "<img src='" + $scope.selectOneDB.folder_image + "' style='width:100px;height:100px;'><h4>" + $scope.renameSelectDB + "</h4><br>");
        	angular.element(document.getElementById("dropbox-delete-button").disabled = false);
        }

        else if($scope.fileFlagDB > 1 && $scope.folderFlagDB === 0){
        	angular.element(document.getElementById("dropbox-folder-delete").innerHTML = "<img src='../img/file.png' style='width:100px;height:100px;'><h4>All The Selected Files</h4><br>");
        	angular.element(document.getElementById("dropbox-delete-button").disabled = false);
        }

        else if($scope.fileFlagDB === 0 && $scope.folderFlagDB > 1){
        	angular.element(document.getElementById("dropbox-folder-delete").innerHTML = "<img src='../img/folder.png' style='width:100px;height:100px;'><h4>All The Selected Folders</h4><h4><em>(Some of them may contain additional files and/or folders)</em></h4><br>");
        	angular.element(document.getElementById("dropbox-delete-button").disabled = false);
        }

        else{
        	angular.element(document.getElementById("dropbox-folder-delete").innerHTML = "<img src='../img/folder.png' style='width:100px;height:100px;'><h4 style='display:inline-block'>&nbsp;.&nbsp;.&nbsp;.&nbsp;</h4><img src='../img/file.png' style='width:100px;height:100px;'><h4>All The Selected Files and Folders</h4><h4><em>(Some of the folders may contain additional files and/or folders)</em></h4><br>");
        	angular.element(document.getElementById("dropbox-delete-button").disabled = false);
        }
    };

    //--------LOCAL--------//
    $scope.pickModal = false;
    $scope.togglePickModal = function(){
        $scope.pickModal = !$scope.pickModal;
    }

    //Matthew
    $scope.toggleDropboxToLocalModal = function() {
        $scope.toggleModal();
        alert("TEST");
    }
    //Matthew

    //-----------FILE TRACKING----------//

    $scope.gFileSelect = {};
    $scope.gFileUnselect = {};
    $scope.gDirSelect = [];
    $scope.gDirUnselect = [];

    $scope.checkLvl = false;
    $scope.level = 0;

    $scope.selectOne = {folder_image: "../img/folder.png"};
    $scope.renameSelect = "";


    $scope.dFileSelect = {};
    $scope.dFileUnselect = {};
    $scope.dDirSelect = [];
    $scope.dDirUnselect = [];

    $scope.checkLvlDB = false;
    $scope.levelDB = 0;

    $scope.selectOneDB = {folder_image: "../img/folder.png"};
    $scope.renameSelectDB = "";

    $scope.lFileSelect = {};



    //-----------CREATE OPERATION----------//

    //---Google---//
    $scope.createGooglePerform = function(){
    	var title = angular.element(document.getElementById("google-folder-create").value).selector;
    	gdClient.createGFile(rootCreate[rootCreate.length-1],title,"application/vnd.google-apps.folder",function(resp, folder){
    		
    		console.log(gFile);
    		gFile.push({original: folder, id: folder.id, name: folder.title, size: folder.modifiedDate.split("T")[0] + "\n" + (Math.ceil(folder.fileSize /= 1000000) || "N/A"), folder: "../img/checkbox.png", folder_image: "../img/folder.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: true, children: [], sibling: gFile});						
			if(folder.fileSize)
				gFile[gFile.length-1].size += " MB";
			console.log(gFile);
            setCookie(0, 5);
    		window.location = window.location.href;
    	});
    }

    //---Dropbox---//
    $scope.createDropboxPerform = function() {
    
    	var title = angular.element(document.getElementById("dropbox-folder-create").value).selector;

    	var dbCurrentRoot = '/';

    	if($scope.curDirDropbox !== "/") 
    		dbCurrentRoot = $scope.curDirDropbox + '/' // obtain somewhere
    	
    	var completePath = dbCurrentRoot + title;

    	var lookIn = function(file, path, resp){
    		if(path.length === 0){
    			if(file === dFile)
    				file.push({original: resp, id: resp.path, name: resp.name, size: "N/A", folder: "../img/checkbox.png", folder_image: "../img/folder.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: true, children: [], sibling: file});
    			// else
    			// 	file.push({original: resp, id: resp.path, name: resp.name, size: "N/A", folder: "../img/checkbox.png", folder_image: "../img/folder.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: true, children: [], sibling: file, parent: p, mother: parent});
    		}

    		// for(var i = 0; i < file.length; i++){

    		// }
    	};

    	dbClient.mkdir(completePath, function(resp) {
    		var path = completePath.split("/");
    		path.shift();
    		path.pop();
    		lookIn(dFile, path, resp);
            setCookie(1, 5);
    		window.location = window.location.href;
    	});
    }

    //---Box---//
    $scope.createBoxPerform = function() {
    	alert("createBoxPerform called");
    }



    //-----------RENAME OPERATION----------//

    //---Google---//
    $scope.renameGooglePerform = function(){
    	gdClient.rename($scope.selectOne.id, document.getElementById("google-folder-rename").value,function(file){
			$scope.selectOne.name = file.title;
			document.getElementById($scope.selectOne.id).childNodes[1].childNodes[7].innerHTML = file.title;
    		setCookie(0, 5);
            window.location = window.location.href;
		});
    }

    //---Dropbox---//
    $scope.renameDropboxPerform = function(){
    	document.getElementById("dropbox-folder-rename").value
    	var splitIndex = ($scope.selectOneDB.id).lastIndexOf("/");
    	var newName = $scope.selectOneDB.id;
    	newName = newName.substring(0, splitIndex);
  		
    	dbClient.rename($scope.selectOneDB.id, newName + "/" + document.getElementById("dropbox-folder-rename").value, function(resp){
    		console.log(resp);
    		$scope.selectOneDB.name = resp.name;
			document.getElementById($scope.selectOneDB.id).childNodes[1].childNodes[7].innerHTML = resp.name;
    		setCookie(1, 5);
            window.location = window.location.href;
    	});
    }

    //---Box---//
    $scope.renameBoxPerform = function() {
    	alert("renameBoxPerform called");
    }

    //-----------DELETE OPERATION----------//

    //---Google---//
    var deleteGoogleRecurse = function(i){
    	gdClient.deleteItem(i, function(){
    		console.log($scope.gFileSelect);
    		if($scope.gFileSelect[i].directory)
    			$scope.folderFlag--;
    		else
    			$scope.fileFlag--;
   			
   			$scope.folderSelectGoogle--;
   			// $scope.folderSelectionGoogle();
   			
            if($scope.gFileSelect[i].sibling){
                for(var j = 0; j < $scope.gFileSelect[i].sibling.length; j++){
                    if($scope.gFileSelect[i].sibling[j].id === i){
                        delete $scope.gFileSelect[i].sibling[j];
                        console.log($scope.googleFile);
                    }
                }
            }

    		delete $scope.gFileSelect[i];
    		for(var k = 0; k < $scope.gDirSelect.length; k++){
    			if($scope.gDirSelect[k].id === i){
    				delete $scope.gDirSelect[k];
    			}
    		}
    		console.log($scope.gFileSelect);
    		// var elem = angular.element(document.getElementById(i));
    		// console.log(elem);
    		// elem.remove();
            setCookie(0, 5);
    		window.location = window.location.href;
    	});
    }

    $scope.deleteGooglePerform = function(){
    	// var x = Object.keys($scope.gFileSelect).length;
    	for(var i in $scope.gFileSelect){
    		deleteGoogleRecurse(i);
    	}
    }


    //---Dropbox---//
    var deleteDropboxRecurse = function(i){
        console.log(i);
    	dbClient.remove(i,function(resp){
    		console.log($scope.dFileSelect);
    		if($scope.dFileSelect[i].directory)
    			$scope.folderFlagDB--;
    		else
    			$scope.fileFlagDB--;
   			
   			$scope.folderSelectDropbox--;
   			// $scope.folderSelectionDropbox();

    		delete $scope.dFileSelect[i];
    		for(var k = 0; k < $scope.dDirSelect.length; k++){
    			if($scope.dDirSelect[k].id === i)
    				delete $scope.dDirSelect[k];
    		}
    		console.log($scope.dFileSelect);
    		// var elem = angular.element(document.getElementById(i));
    		// elem.remove();
            setCookie(1, 5);
    		window.location = window.location.href;
    	});
    }

    $scope.deleteDropboxPerform = function() {
    	// var x = Object.keys($scope.dFileSelect).length;
    	for(var i in $scope.dFileSelect){
    		deleteDropboxRecurse(i);
    	}
    }

    //---Box---//
    $scope.deleteBoxPerform = function() {
    	alert("deleteBoxPerform called");
    }


    //-----------MOVE/COPY OPERATION----------//
    $scope.renameReplaceFileName = "";
    $scope.renameReplaceFileImage = "";
    $scope.renameReplaceFileInfo = [];

    $scope.copy = true;

    $scope.copyIt = function(){
        $scope.copy = true;
    }

    $scope.moveIt = function(){
        $scope.copy = false;
    }    

    var googleToDropbox = function(file, dest, id, checkFolder, overWrite, fileName){
        if(file.original.mimeType){
            if(file.original.mimeType !== "application/vnd.google-apps.spreadsheet")
                gDriveToDBoxCheck++;
        }

        else
            gDriveToDBoxCheck++;        

        console.log(dFile);
        
        dbClient.getDownloadLink(dest + fileName, null, function(resp, error){
            if(error){
                gdClient.aFileToDropbox(file.id, dbClient, dest, {noOverwrite: overWrite}, $scope.copy, dest + fileName, function(){
                    console.log("EXECUTED");
                    gDriveToDBoxCheck--;

                    console.log(gDriveToDBoxCheck);
                    if(gDriveToDBoxCheck === 0){
                        if(!$scope.copy && checkFolder)
                            deleteGoogleRecurse(id);

                        else{
                            setCookie(0, 5);
                            window.location = window.location.href;
                        }   
                    }
                });
            }

            else{
                if(!overWrite){
                    console.log("OVERWRITE::::: ", overWrite);
                    gdClient.aFileToDropbox(file.id, dbClient, dest, {noOverwrite: overWrite}, $scope.copy, null, function(){
                        console.log("EXECUTED");
                        gDriveToDBoxCheck--;

                        console.log(gDriveToDBoxCheck);
                        if(gDriveToDBoxCheck === 0){
                            if(!$scope.copy && checkFolder)
                                deleteGoogleRecurse(id);

                            else{
                                setCookie(0, 5);
                                window.location = window.location.href;
                            }   
                        }
                    });
                }

                else{
                    gDriveToDBoxCheck--;
                    renameReplaceFile(file, dest, id, checkFolder);
                }
            }
        });
    };

    $scope.renameChosen = function(){
        return googleToDropboxDir($scope.renameReplaceFileInfo[0], $scope.renameReplaceFileInfo[1], $scope.renameReplaceFileInfo[2], document.getElementById("rename-replace-input").value);
    };

    $scope.replaceChosen = function(){
        dbClient.remove($scope.curDestDirDropbox + $scope.renameReplaceFileInfo[0].name,function(resp){
            console.log(resp);
            googleToDropboxDir($scope.renameReplaceFileInfo[0], $scope.renameReplaceFileInfo[1], $scope.renameReplaceFileInfo[2], $scope.renameReplaceFileInfo[0].name);
        });
    };

    var renameReplaceFolder = function(file, dest, id, fileName){
        $scope.renameReplaceFileName = fileName;
        $scope.renameReplaceFileImage = file.folder_image;
        $scope.renameReplaceFileInfo = [file, dest, id];
        return $scope.toggleRenameReplaceFolderModal();
    };

    var renameReplaceFile = function(file, dest, id, checkFolder){
        $scope.renameReplaceFileName = file.name;
        $scope.renameReplaceFileImage = file.folder_image;
        $scope.renameReplaceFileInfo = [file, dest, id, checkFolder];
        return $scope.toggleRenameReplaceFileModal();
    };

    $scope.renameChosenFileDropbox = function(){
        return googleToDropbox($scope.renameReplaceFileInfo[0], $scope.renameReplaceFileInfo[1], $scope.renameReplaceFileInfo[2], $scope.renameReplaceFileInfo[3], true, document.getElementById("rename-replace-file-input").value);
    };

    $scope.replaceChosenFileDropbox = function(){
        return googleToDropbox($scope.renameReplaceFileInfo[0], $scope.renameReplaceFileInfo[1], $scope.renameReplaceFileInfo[2], $scope.renameReplaceFileInfo[3], false, $scope.renameReplaceFileInfo[0].name);
    };

    var googleToDropboxDir = function(file, dest, id, fileName){
        dbClient.mkdir(dest + fileName, function(resp){
            if(resp.status){
                return renameReplaceFolder(file, dest, id, fileName);
            }

            else if(file.id === id && file.children.length === 0){
                if(!$scope.copy)
                    deleteGoogleRecurse(id);

                else{
                    setCookie(0, 5);
                    window.location = window.location.href;
                }  
            }

            for(var i = 0; i < file.children.length; i++){
                console.log(file.children[i].name);
                if(file.children[i].directory)
                    googleToDropboxDir(file.children[i], dest + fileName + "/", id, file.children[i].name);

                else
                    googleToDropbox(file.children[i], dest + fileName + "/", id, true, true, file.children[i].name);
            }
        });
    };

    $scope.googleToDropboxPerform = function(){
        $scope.dropboxDestFile = [];
    	for(x in $scope.gFileSelect){
    		if($scope.curDestDirDropbox === "/"){
                if($scope.gFileSelect[x].directory)
                    googleToDropboxDir($scope.gFileSelect[x], $scope.curDestDirDropbox, x, $scope.gFileSelect[x].name);

                else{
                    googleToDropbox($scope.gFileSelect[x], $scope.curDestDirDropbox, x, false, true, $scope.gFileSelect[x].name);
                }
            }

    		else{
                if($scope.gFileSelect[x].directory)
                    googleToDropboxDir($scope.gFileSelect[x], $scope.curDestDirDropbox + "/", x, $scope.gFileSelect[x].name);

                else
                    googleToDropbox($scope.gFileSelect[x], $scope.curDestDirDropbox + "/", x, false, true, $scope.gFileSelect[x].name);
            }
    	}
    };


    var dropboxToGoogle = function(id, name, dest, path){
        dBoxToGDriveCheck++;
    	dbClient.aFileToGDrive(id, name, dest, gdClient, true, function(){
    		console.log("EXECUTED");
            dBoxToGDriveCheck--;

            console.log(dBoxToGDriveCheck);
            if(dBoxToGDriveCheck === 0){
                if(!$scope.copy)
                    deleteDropboxRecurse(path);

                else{
                    setCookie(1, 5);
                    window.location = window.location.href;
                }
            }
    	});
    };

    var dropboxToGoogleDir = function(dest, add, file, path){
        if(add){
            gdClient.createFolder(add,file.name,function(resp){
                if(file.id === path && file.children.length === 0){
                    if(!$scope.copy)
                        deleteDropboxRecurse(path);

                    else{
                        setCookie(1, 5);
                        window.location = window.location.href;
                    }  
                }

                for(var i = 0; i < file.children.length; i++){
                    if(file.children[i].directory)
                        dropboxToGoogleDir(file.id + "/", resp.id, file.children[i], path);

                    else
                        dropboxToGoogle(file.id + "/", file.children[i].name, resp.id, path); 
                }
            });
        }

        else{
            gdClient.createFolder(rootCreateDest[rootCreateDest.length-1],file.name,function(resp){
                if(file.id === path && file.children.length === 0){
                    if(!$scope.copy)
                        deleteDropboxRecurse(path);

                    else{
                        setCookie(1, 5);
                        window.location = window.location.href;
                    }  
                }

                for(var i = 0; i < file.children.length; i++){
                    if(file.children[i].directory)
                        dropboxToGoogleDir(file.id + "/", resp.id, file.children[i], path);

                    else
                        dropboxToGoogle(file.id + "/", file.children[i].name, resp.id, path); 
                }
            });
        }
    };

    $scope.dropboxToGooglePerform = function(){
    	// var count = Object.keys($scope.dFileSelect).length;
    	for(x in $scope.dFileSelect){
    		if($scope.curDirDropbox === "/"){
                if($scope.dFileSelect[x].directory)
                    dropboxToGoogleDir($scope.curDirDropbox, null, $scope.dFileSelect[x], x);

                else
                    dropboxToGoogle($scope.curDirDropbox, $scope.dFileSelect[x].name, rootCreateDest[rootCreateDest.length-1], x);
            }

            else{
                if($scope.dFileSelect[x].directory)
                    dropboxToGoogleDir($scope.curDirDropbox + "/", null, $scope.dFileSelect[x], x);

                else
                    dropboxToGoogle($scope.curDirDropbox + "/", $scope.dFileSelect[x].name, rootCreateDest[rootCreateDest.length-1], x);
            }
    	}
    }


    //-----------LOCAL UPLOAD FILES------------//

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

       lFile.sort(alphabeticizedSort);
       // lFile.sort(chronologicalSort);
       // lFile.sort(fileSizeSort);

        angular.element(document.getElementById('js-upload-files').value = "");
        document.getElementById("loadingLocal").style.display = "none";
    }

    $scope.uploadForm = function() {
        document.getElementById("loadingLocal").style.display = "inherit";
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




    //////////////////////////////////////////////////////////////////////
	////////////////////////---------SOURCE----------/////////////////////
	//////////////////////////////////////////////////////////////////////


	//All Files
	$scope.temp_parent = [];
	$scope.temp_parentDB = [];


	$scope.googleFile = gFile;
	$scope.dropboxFile = dFile;
	$scope.boxFile = bFile;
	$scope.localFile = lFile;

    setInterval(function(){ 
        if($scope.googleFile.length > 0)
            document.getElementById("loadingDrive").style.display = "none";

        if($scope.dropboxFile.length > 0)
            document.getElementById("loadingDropbox").style.display = "none";

        if($scope.dropboxDestFile.length > 0)
            document.getElementById("loadingDropboxDest").style.display = "none";
        else
            document.getElementById("loadingDropboxDest").style.display = "inherit";

        $scope.$apply();
    }, 1000);

 
	//--------------INTO AND OUT OF DIRECTORY-----------//

	//---Google---//	
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

			if(f.select){
				$scope.gDirSelect.push(f);		
				angular.element(document.getElementById("google-create").disabled = true);
				angular.element(document.getElementById("google-copy").disabled = true);
				angular.element(document.getElementById("google-move").disabled = true);
				angular.element(document.getElementById("google-rename").disabled = true);
				angular.element(document.getElementById("google-delete").disabled = true);
				angular.element(document.getElementById("google-select").disabled = true);
				angular.element(document.getElementById("google-unselect").disabled = true);
			}

			return;
		}
		
		for(var x = 0; x < f.children.length; x++){
			if(f.children[x].directory && f.children[x].children.length === 0){
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
                        var extension = "";
                        if(!files[i].fileExtension){
                            var exportLinks = files[i].exportLinks;
                            for (var property in exportLinks) {             
                                if (exportLinks.hasOwnProperty(property)) {
                                    switch (property){
                                    case "application/pdf":
                                        extension = ".pdf";
                                        break;
                                    case "application/rtf":
                                        extension = ".rtf";
                                        break;
                                    case "application/vnd.oasis.opendocument.text":
                                        extension = ".txt";
                                        break;
                                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                        extension = ".doc";
                                        break;
                                    case "text/html":
                                        extension = ".html";
                                        break;
                                    case "text/plain":
                                        extension = ".txt";
                                        break;
                                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                        extension = ".xlsx";
                                        break;
                                    case "application/x-vnd.oasis.opendocument.spreadsheet":
                                        extension = ".xlsx";
                                        break;
                                    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                                        extension = ".ppt";
                                        break;
                                    case "image/png":
                                        extension = ".png";
                                        break;
                                    case "image/jpeg":
                                        extension = ".jpeg";
                                        break;
                                    case "image/svg+xml":
                                        extension = ".xml";
                                        break;
                                    }
                                }
                            }
                        }

						if(files[i].mimeType === "application/vnd.google-apps.folder"){
							f.children[cur].children.push({original: files[i], id: files[i].id, name: files[i].title + extension, size: files[i].modifiedDate.split("T")[0] + "\n" + (Math.ceil(files[i].fileSize /= 1000000) || "N/A"), folder: "../img/checkbox.png", folder_image: "../img/folder.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: true, children: [], parent: f.children, sibling: f.children[cur].children, mother: f.children[cur]});
						
							if(files[i].fileSize)
								f.children[cur].children[f.children[cur].children.length-1].size += " MB";
						}
							
						else{
							f.children[cur].children.push({original: files[i], id: files[i].id, name: files[i].title + extension, size: files[i].modifiedDate.split("T")[0] + "\n" + (Math.ceil(files[i].fileSize /= 1000000) || "N/A"), folder: "../img/checkbox.png", folder_image: "../img/file.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: false, parent: f.children, mother: f.children[cur]});
							if(files[i].fileSize)
								f.children[cur].children[f.children[cur].children.length-1].size += " MB";
						}
					}

                   f.children[cur].children.sort(alphabeticizedSort);
                   // f.children[cur].children.sort(chronologicalSort);
                    // f.children[cur].children.sort(fileSizeSort);

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

		if($scope.checkLvl)
			$scope.level++;

		if(f.select){
			var exists = false;
			for(var i = 0; i < $scope.gDirSelect.length; i++){
				if($scope.gDirSelect[i] === f)
					exists = true;
			}

			if(!exists)
				$scope.gDirSelect.push(f);
		
			for(var i = 0; i < f.children.length; i++){
				f.children[i].folder = "../img/checked_checkbox.png";
				f.children[i].select = true;

				if(f.children[i].id in $scope.gFileUnselect){
					f.children[i].folder = "../img/checkbox.png";
					f.children[i].select = false;
				}
			}
				
			angular.element(document.getElementById("google-create").disabled = true);
			angular.element(document.getElementById("google-copy").disabled = true);
			angular.element(document.getElementById("google-move").disabled = true);
			angular.element(document.getElementById("google-rename").disabled = true);
			angular.element(document.getElementById("google-delete").disabled = true);
			angular.element(document.getElementById("google-select").disabled = true);
			angular.element(document.getElementById("google-unselect").disabled = true);
			console.log($scope.level);

		}

		console.log("DIR-SELECT", $scope.gDirSelect);
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

		if($scope.checkLvl && $scope.level !== 0)
			$scope.level--;

		console.log($scope.level);

		if($scope.gDirUnselect.length > 0){
			for(var i = 0; i < $scope.gDirSelect[$scope.gDirSelect.length-1].children.length; i++){
				for(var j = 0; j < $scope.gDirUnselect.length; j++){
					if($scope.gDirSelect[$scope.gDirSelect.length-1].children[i] === $scope.gDirUnselect[j]){
						console.log("DIR-SELECT", $scope.gDirSelect);
						console.log("DIR-UNSELECT", $scope.gDirUnselect);
						console.log("FILE-UNSELECT", $scope.gFileUnselect);

						if($scope.checkLvl && $scope.level === 0){
							$scope.folderSelectionGoogle();
							angular.element(document.getElementById("google-select").disabled = false);
							angular.element(document.getElementById("google-unselect").disabled = false);
						}

						for(var i = 0; i < $scope.gDirSelect[$scope.gDirSelect.length-1].children.length; i++){
							$scope.gDirSelect[$scope.gDirSelect.length-1].children[i].folder = "../img/checkbox.png";
							$scope.gDirSelect[$scope.gDirSelect.length-1].children[i].select = false;
						}

						return;
					}
				}
			}
		}

		if($scope.gDirSelect.length > 0){

			for(var i = 0; i < $scope.gDirSelect[$scope.gDirSelect.length-1].children.length; i++){
				$scope.gDirSelect[$scope.gDirSelect.length-1].children[i].folder = "../img/checkbox.png";
				$scope.gDirSelect[$scope.gDirSelect.length-1].children[i].select = false;
			}
	
			$scope.gDirSelect.pop();

			if($scope.gDirSelect.length === 0 || ($scope.checkLvl && $scope.level === 0)){
				$scope.folderSelectionGoogle();
				angular.element(document.getElementById("google-select").disabled = false);
				angular.element(document.getElementById("google-unselect").disabled = false);
			}
		
			console.log("DIR-SELECT", $scope.gDirSelect);

		}
	}


	//---Dropbox---//
	$scope.curDirDropbox = "/";

	$scope.intoDropboxFolder = function(f){
		if(!f.directory) 
			return;

		if(f.children.length === 0) {
			$scope.temp_parentDB = f.sibling;

			if($scope.curDirDropbox === "/")
				$scope.curDirDropbox += f.name;

			else
				$scope.curDirDropbox += "/" + f.name;

			$scope.dropboxFile = empty;

			if(f.select){
				$scope.dDirSelect.push(f);		
				angular.element(document.getElementById("dropbox-create").disabled = true);
				angular.element(document.getElementById("dropbox-copy").disabled = true);
				angular.element(document.getElementById("dropbox-move").disabled = true);
				angular.element(document.getElementById("dropbox-rename").disabled = true);
				angular.element(document.getElementById("dropbox-delete").disabled = true);
				angular.element(document.getElementById("dropbox-select").disabled = true);
				angular.element(document.getElementById("dropbox-unselect").disabled = true);
			}

			return;
		}

		if($scope.curDirDropbox === "/")
			$scope.curDirDropbox += f.name;

		else
			$scope.curDirDropbox += "/" + f.name;

		$scope.dropboxFile = f.children;

		if($scope.checkLvlDB)
			$scope.levelDB++;

		if(f.select){
			var exists = false;
			for(var i = 0; i < $scope.dDirSelect.length; i++){
				if($scope.dDirSelect[i] === f)
					exists = true;
			}

			if(!exists)
				$scope.dDirSelect.push(f);
		
			for(var i = 0; i < f.children.length; i++){
				f.children[i].folder = "../img/checked_checkbox.png";
				f.children[i].select = true;

				if(f.children[i].id in $scope.dFileUnselect){
					f.children[i].folder = "../img/checkbox.png";
					f.children[i].select = false;
				}
			}
				
			angular.element(document.getElementById("dropbox-create").disabled = true);
			angular.element(document.getElementById("dropbox-copy").disabled = true);
			angular.element(document.getElementById("dropbox-move").disabled = true);
			angular.element(document.getElementById("dropbox-rename").disabled = true);
			angular.element(document.getElementById("dropbox-delete").disabled = true);
			angular.element(document.getElementById("dropbox-select").disabled = true);
			angular.element(document.getElementById("dropbox-unselect").disabled = true);
			console.log($scope.levelDB);
		}

		console.log("DIR-SELECT-DB", $scope.dDirSelect);
	}

	$scope.outofDropboxFolder = function(){
		if($scope.curDirDropbox !== "/"){
			while($scope.curDirDropbox[$scope.curDirDropbox.length-1] !== '/')
				$scope.curDirDropbox = $scope.curDirDropbox.slice(0, -1);

			$scope.curDirDropbox = $scope.curDirDropbox.slice(0, -1);

			if($scope.dropboxFile === empty){
				$scope.dropboxFile = $scope.temp_parentDB;
				$scope.temp_parentDB = [];
			}

			else
				$scope.dropboxFile = $scope.dropboxFile[0].parent;
		}

		if($scope.curDirDropbox === "")
			$scope.curDirDropbox = "/";

		if($scope.checkLvlDB && $scope.levelDB !== 0)
			$scope.levelDB--;

		console.log($scope.levelDB);

		if($scope.dDirUnselect.length > 0){
			for(var i = 0; i < $scope.dDirSelect[$scope.dDirSelect.length-1].children.length; i++){
				for(var j = 0; j < $scope.dDirUnselect.length; j++){
					if($scope.dDirSelect[$scope.dDirSelect.length-1].children[i] === $scope.dDirUnselect[j]){
						console.log("DIR-SELECT-DB", $scope.dDirSelect);
						console.log("DIR-UNSELECT-DB", $scope.dDirUnselect);
						console.log("FILE-UNSELECT-DB", $scope.dFileUnselect);

						if($scope.checkLvlDB && $scope.levelDB === 0){
							$scope.folderSelectionDropbox();
							angular.element(document.getElementById("dropbox-select").disabled = false);
							angular.element(document.getElementById("dropbox-unselect").disabled = false);
						}

						for(var i = 0; i < $scope.dDirSelect[$scope.dDirSelect.length-1].children.length; i++){
							$scope.dDirSelect[$scope.dDirSelect.length-1].children[i].folder = "../img/checkbox.png";
							$scope.dDirSelect[$scope.dDirSelect.length-1].children[i].select = false;
						}

						return;
					}
				}
			}
		}

		if($scope.dDirSelect.length > 0){

			for(var i = 0; i < $scope.dDirSelect[$scope.dDirSelect.length-1].children.length; i++){
				$scope.dDirSelect[$scope.dDirSelect.length-1].children[i].folder = "../img/checkbox.png";
				$scope.dDirSelect[$scope.dDirSelect.length-1].children[i].select = false;
			}
	
			$scope.dDirSelect.pop();

			if($scope.dDirSelect.length === 0 || ($scope.checkLvlDB && $scope.levelDB === 0)){
				$scope.folderSelectionDropbox();
				angular.element(document.getElementById("dropbox-select").disabled = false);
				angular.element(document.getElementById("dropbox-unselect").disabled = false);
			}
		
			console.log("DIR-SELECT", $scope.dDirSelect);

		}
	}


	//---Box---//
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



	//-----------BUTTON TOOGLE----------//

	//---Create or Pick---//
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

	//---Rename---//
	$scope.renameHoverIn = function(){
		angular.element(document.getElementById("google-rename").innerHTML = "Rename");
		angular.element(document.getElementById("dropbox-rename").innerHTML = "Rename");
		angular.element(document.getElementById("box-rename").innerHTML = "Rename");
	}

	$scope.renameHoverOut = function(){
		angular.element(document.getElementById("google-rename").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-pencil'></span>");
		angular.element(document.getElementById("dropbox-rename").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-pencil'></span>");
		angular.element(document.getElementById("box-rename").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-pencil'></span>");
	}

	//---Copy---//
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

	//---Move---//
	$scope.moveHoverIn = function(){
		angular.element(document.getElementById("google-move").innerHTML = "Move");
		angular.element(document.getElementById("dropbox-move").innerHTML = "Move");
		angular.element(document.getElementById("box-move").innerHTML = "Move");
	}

	$scope.moveHoverOut = function(){
		angular.element(document.getElementById("google-move").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-transfer'></span>");
		angular.element(document.getElementById("dropbox-move").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-transfer'></span>");
		angular.element(document.getElementById("box-move").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-transfer'></span>");
	}

	//---Delete---//
	$scope.deleteHoverIn = function(){
		angular.element(document.getElementById("google-delete").innerHTML = "Delete");
		angular.element(document.getElementById("dropbox-delete").innerHTML = "Delete");
		angular.element(document.getElementById("box-delete").innerHTML = "Delete");
	}

	$scope.deleteHoverOut = function(){
		angular.element(document.getElementById("google-delete").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-trash'></span>");
		angular.element(document.getElementById("dropbox-delete").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-trash'></span>");
		angular.element(document.getElementById("box-delete").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-trash'></span>");
	}

	//---Select---//
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

	//---Unselect---//
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




	//////////////////-------TRACKING FOLDER SELECTION-------//////////////////

	$scope.folderSelectGoogle = 0;
	$scope.folderSelectDropbox = 0;
	$scope.folderSelectBox = 0;
	$scope.folderSelectLocal = 0;

	$scope.fileFlag = 0;
	$scope.folderFlag = 0;
	$scope.deleteFlag = 0;

	$scope.fileFlagDB = 0;
	$scope.folderFlagDB = 0;
	$scope.deleteFlagDB = 0;

	//---Folder Select Clear---//
	$scope.clearRecursive = function(f){
		if(f.children){
			for(var i = 0; i < f.children.length; i++){
				f.children[i].select = false;
				f.children[i].folder = "../img/checkbox.png";
				if(f.children[i].id in $scope.gFileUnselect)
					delete $scope.gFileUnselect[f.children[i].id];
				for(var j = 0; j < $scope.gDirUnselect.length; j++){
					if($scope.gDirUnselect[j].id === f.children[i].id)
						delete $scope.gDirUnselect[j].id;
				}

				$scope.clearRecursive(f.children[i]);
			}
		}
	};

	//---Check or Uncheck Folder---//
	$scope.toggleFolder = function(x, storage){
		
		if(x.folder === "../img/checkbox.png"){
			x.folder = "../img/checked_checkbox.png";

			if(storage === "g"){

				if(x.id in $scope.gFileUnselect){
					delete $scope.gFileUnselect[x.id];
					x.select = true;
					$scope.deleteFlag--;

					if(isEmpty($scope.gFileUnselect)){
						$scope.checkLvl = false;
						$scope.level = 0;
					}

					for(var i = 0; i < $scope.gDirUnselect.length; i++){
						if($scope.gDirUnselect[i] === x)
							$scope.gDirUnselect.splice(i, 1);

						console.log("DIR-UNSELECT", $scope.gDirUnselect);
					}

					return;
				}

				if(x.directory){
					for(var i = 0; i < x.children.length; i++){
						if(x.children[i].id in $scope.gFileSelect){
							delete $scope.gFileSelect[x.children[i].id];
							
							if($scope.folderSelectGoogle !== 0)
								$scope.folderSelectGoogle--;
						}

						if(x.children[i].directory){
							for(var j = 0; j < $scope.gDirSelect.length; j++){
								if(x.children[i] === $scope.gDirSelect[j])
									delete $scope.gDirSelect[j];
							}
						}
					}

					console.log(x.children);
					$scope.folderSelectionGoogle();
				}

				$scope.gFileSelect[x.id] = x;
				x.select = true;
				$scope.folderSelectGoogle++;

				if(x.directory)
					$scope.folderFlag++;

				else
					$scope.fileFlag++;

				$scope.renameSelect = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]].name;
				$scope.selectOne = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]];
				$scope.folderSelectionGoogle();
				return;
			}
				
			if(storage === "d"){

				if(x.id in $scope.dFileUnselect){
					delete $scope.dFileUnselect[x.id];
					x.select = true;
					$scope.deleteFlagDB--;

					if(isEmpty($scope.dFileUnselect)){
						$scope.checkLvlDB = false;
						$scope.levelDB = 0;
					}

					for(var i = 0; i < $scope.dDirUnselect.length; i++){
						if($scope.dDirUnselect[i] === x)
							$scope.dDirUnselect.splice(i, 1);

						console.log("DIR-UNSELECT-DB", $scope.dDirUnselect);
					}

					return;
				}

				$scope.dFileSelect[x.id] = x;
				x.select = true;
				$scope.folderSelectDropbox++;

				if(x.directory)
					$scope.folderFlagDB++;

				else
					$scope.fileFlagDB++;

				$scope.renameSelectDB = $scope.dFileSelect[Object.keys($scope.dFileSelect)[0]].name;
				$scope.selectOneDB = $scope.dFileSelect[Object.keys($scope.dFileSelect)[0]];
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
                $scope.lFileSelect[x.id] = x;
				return;
			}
		}

		else{
			x.folder = "../img/checkbox.png";
			
			if(storage === "g"){

				for(var i = 0; i < $scope.gDirSelect.length; i++){
					if(x.mother === $scope.gDirSelect[i]){
						if(x.directory)
							$scope.gDirUnselect.push(x);

						$scope.gFileUnselect[x.id] = x;
						x.select = false;
						$scope.deleteFlag++;

						$scope.checkLvl = true;

						var recurseLvl = function(obj){
							if("mother" in obj){
								$scope.level++;
								recurseLvl(obj.mother);
							}
						}

						$scope.level = 0;
						recurseLvl(x);

						console.log($scope.level);
						return;
					}
				}

				if($scope.gFileSelect[x.id].directory){
					$scope.clearRecursive(x);
					console.log(x);
				}
				
				delete $scope.gFileSelect[x.id];
				x.select = false;
				$scope.folderSelectGoogle--;

				if(x.directory)
					$scope.folderFlag--;

				else
					$scope.fileFlag--;

				if($scope.folderSelectGoogle === 0){
					$scope.selectOne = {folder_image: "../img/folder.png"};
   					$scope.renameSelect = "";
				}

				else{
					$scope.renameSelect = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]].name;
					$scope.selectOne = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]];
				}

				$scope.folderSelectionGoogle();
				return;
			}
				
			if(storage === "d"){

				for(var i = 0; i < $scope.dDirSelect.length; i++){
					if(x.mother === $scope.dDirSelect[i]){
						if(x.directory)
							$scope.dDirUnselect.push(x);

						$scope.dFileUnselect[x.id] = x;
						x.select = false;
						$scope.deleteFlagDB++;

						$scope.checkLvlDB = true;

						var recurseLvl = function(obj){
							if("mother" in obj){
								$scope.levelDB++;
								recurseLvl(obj.mother);
							}
						}

						$scope.levelDB = 0;
						recurseLvl(x);

						console.log($scope.levelDB);
						return;
					}
				}

				delete $scope.dFileSelect[x.id];
				x.select = false;
				$scope.folderSelectDropbox--;

				if(x.directory)
					$scope.folderFlagDB--;

				else
					$scope.fileFlagDB--;

				if($scope.folderSelectDropbox === 0){
					$scope.selectOneDB = {folder_image: "../img/folder.png"};
   					$scope.renameSelectDB = "";
				}

				else{
					$scope.renameSelectDB = $scope.dFileSelect[Object.keys($scope.dFileSelect)[0]].name;
					$scope.selectOneDB = $scope.dFileSelect[Object.keys($scope.dFileSelect)[0]];
				}

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
                if(x.id in $scope.lFileSelect)
                    delete $scope.lFileSelect[x.id];
				return;
			}
		}
	};


	//--------------SELECT ALL & UNSELECT ALL-----------//

	//---Google---//
	$scope.selectAllGoogle = function(){
		$scope.folderSelectGoogle = 0;
		$scope.fileFlag = 0;
		$scope.folderFlag = 0;

		for(var i = 0; i < $scope.googleFile.length; i++){
			$scope.googleFile[i].folder = "../img/checked_checkbox.png";
			$scope.googleFile[i].select = true;
			$scope.gFileSelect[$scope.googleFile[i].id] = $scope.googleFile[i];
			$scope.folderSelectGoogle++;

			if($scope.googleFile[i].directory)
				$scope.folderFlag++;

			else
				$scope.fileFlag++;
		}

		$scope.renameSelect = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]].name;
		$scope.selectOne = $scope.gFileSelect[Object.keys($scope.gFileSelect)[0]];
		$scope.folderSelectionGoogle();
	};

	$scope.selectNoneGoogle = function(){
		for(var i = 0; i < $scope.googleFile.length; i++){
			$scope.googleFile[i].folder = "../img/checkbox.png";
			$scope.googleFile[i].select = false;
			delete $scope.gFileSelect[$scope.googleFile[i].id];
		}

		$scope.renameSelect = "";
		$scope.selectOne = {folder_image: "../img/folder.png"};
		$scope.folderSelectGoogle = 0;
		$scope.fileFlag = 0;
		$scope.folderFlag = 0;
		$scope.folderSelectionGoogle();
	};


	//---Dropbox--//
	$scope.selectAllDropbox = function(){
		$scope.folderSelectDropbox = 0;
		$scope.fileFlagDB = 0;
		$scope.folderFlagDB = 0;

		for(var i = 0; i < $scope.dropboxFile.length; i++){
			$scope.dropboxFile[i].folder = "../img/checked_checkbox.png";
			$scope.dropboxFile[i].select = true;
			$scope.dFileSelect[$scope.dropboxFile[i].id] = $scope.dropboxFile[i];
			$scope.folderSelectDropbox++;

			if($scope.dropboxFile[i].directory)
				$scope.folderFlagDB++;

			else
				$scope.fileFlagDB++;
		}

		$scope.renameSelectDB = $scope.dFileSelect[Object.keys($scope.dFileSelect)[0]].name;
		$scope.selectOneDB = $scope.dFileSelect[Object.keys($scope.dFileSelect)[0]];
		$scope.folderSelectionDropbox();
	};

	$scope.selectNoneDropbox = function(){
		for(var i = 0; i < $scope.dropboxFile.length; i++){
			$scope.dropboxFile[i].folder = "../img/checkbox.png";
			$scope.dropboxFile[i].select = false;
			delete $scope.dFileSelect[$scope.dropboxFile[i].id];
		}

		$scope.renameSelectDB = "";
		$scope.selectOneDB = {folder_image: "../img/folder.png"};
		$scope.folderSelectDropbox = 0;
		$scope.fileFlagDB = 0;
		$scope.folderFlagDB = 0;
		$scope.folderSelectionDropbox();
	};


	//---Box---//
	$scope.selectllBox = function(){
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


	//---Local---//
	$scope.selectAllLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++){
			$scope.localFile[i].folder = "../img/checked_checkbox.png";
			$scope.folderSelectLocal++;
            $scope.lFileSelect[$scope.localFile[i].id] = $scope.localFile[i];
		}

		$scope.folderSelectionLocal();
	};

	$scope.selectNoneLocal = function(){
		for(var i = 0; i < $scope.localFile.length; i++){
			$scope.localFile[i].folder = "../img/checkbox.png";
            if($scope.localFile[i].id in $scope.lFileSelect)
                delete $scope.lFileSelect[$scope.localFile[i].id];
        }

		$scope.folderSelectLocal = 0;
		$scope.folderSelectionLocal();
	};


	//--------------BUTTON DISABLING-----------//

	//---Google---//
	$scope.folderSelectionGoogle = function(){
		if($scope.folderSelectGoogle === 0){
			angular.element(document.getElementById("google-create").disabled = false);
			angular.element(document.getElementById("google-copy").disabled = true);
			angular.element(document.getElementById("google-move").disabled = true);
			angular.element(document.getElementById("google-rename").disabled = true);
			angular.element(document.getElementById("google-delete").disabled = true);
		}

		else if($scope.folderSelectGoogle === 1){
			angular.element(document.getElementById("google-create").disabled = true);
			angular.element(document.getElementById("google-copy").disabled = false);
			angular.element(document.getElementById("google-move").disabled = false);
			angular.element(document.getElementById("google-rename").disabled = false);
			angular.element(document.getElementById("google-delete").disabled = false);
		}

		else{
			angular.element(document.getElementById("google-create").disabled = true);
			angular.element(document.getElementById("google-copy").disabled = true);
			angular.element(document.getElementById("google-move").disabled = true);
			angular.element(document.getElementById("google-rename").disabled = true);
			angular.element(document.getElementById("google-delete").disabled = false);
		}
	};

	//---Dropbox---//
	$scope.folderSelectionDropbox = function(){
		if($scope.folderSelectDropbox === 0){
			angular.element(document.getElementById("dropbox-create").disabled = false);
			angular.element(document.getElementById("dropbox-copy").disabled = true);
			angular.element(document.getElementById("dropbox-move").disabled = true);
			angular.element(document.getElementById("dropbox-rename").disabled = true);
			angular.element(document.getElementById("dropbox-delete").disabled = true);
		}

		else if($scope.folderSelectDropbox === 1){
			angular.element(document.getElementById("dropbox-create").disabled = true);
			angular.element(document.getElementById("dropbox-copy").disabled = false);
			angular.element(document.getElementById("dropbox-move").disabled = false);
			angular.element(document.getElementById("dropbox-rename").disabled = false);
			angular.element(document.getElementById("dropbox-delete").disabled = false);
		}

		else{
			angular.element(document.getElementById("dropbox-create").disabled = true);
			angular.element(document.getElementById("dropbox-copy").disabled = true);
			angular.element(document.getElementById("dropbox-move").disabled = true);
			angular.element(document.getElementById("dropbox-rename").disabled = true);
			angular.element(document.getElementById("dropbox-delete").disabled = false);
		}
	};

	//---Box---//
	$scope.folderSelectionBox = function(){
		if($scope.folderSelectBox === 0){
			angular.element(document.getElementById("box-create").disabled = false);
			angular.element(document.getElementById("box-copy").disabled = true);
			angular.element(document.getElementById("box-move").disabled = true);
			angular.element(document.getElementById("box-rename").disabled = true);
			angular.element(document.getElementById("box-delete").disabled = true);
		}

		else if($scope.folderSelectBox === 1){
			angular.element(document.getElementById("box-create").disabled = true);
			angular.element(document.getElementById("box-copy").disabled = false);
			angular.element(document.getElementById("box-move").disabled = false);
			angular.element(document.getElementById("box-rename").disabled = false);
			angular.element(document.getElementById("box-delete").disabled = false);
		}

		else{
			angular.element(document.getElementById("box-create").disabled = true);
			angular.element(document.getElementById("box-copy").disabled = true);
			angular.element(document.getElementById("box-move").disabled = true);
			angular.element(document.getElementById("box-rename").disabled = true);
			angular.element(document.getElementById("box-delete").disabled = false);
		}
	};

	//---Local---//
	$scope.folderSelectionLocal = function(){
		if($scope.folderSelectLocal === 0)
			angular.element(document.getElementById("local-copy").disabled = true);

		else if($scope.folderSelectLocal === 1)
			angular.element(document.getElementById("local-copy").disabled = false);

		else
			angular.element(document.getElementById("local-copy").disabled = false);
	};

	


	///////////////////////////////////////////////////////////////////////////
	////////////////////////---------DESTINATION----------/////////////////////
	///////////////////////////////////////////////////////////////////////////

	$scope.uploadLocalToGoogle = function(){
        var count = Object.keys($scope.lFileSelect).length;
		for(var i in $scope.lFileSelect){
			gdClient.upload(rootCreateDest[rootCreateDest.length-1], $scope.lFileSelect[i].original,function(response){
				console.log(response);
                count--;
				if(count === 0){
					$scope.toggleModal();
                    setCookie(0, 5);
                    window.location = window.location.href;
                }
			});
		}
	};

	//GD: function(destFolderId, datablob,callback)

	//Dropbox: function(destination,data,options,callback){

	//Matthew
	$scope.uploadLocalToDropbox = function() {
		var filePath = "/"
		if($scope.curDestDirDropbox !== "/")
			filePath = $scope.curDestDirDropbox + "/";

        var count = Object.keys($scope.lFileSelect).length;
		for(var i in $scope.lFileSelect) {
			dbClient.upload(filePath + $scope.lFileSelect[i].name, $scope.lFileSelect[i].original, null, function(response) {
				console.log(response);
                count--;
				if(count === 0){
					$scope.toggleModal();
                    setCookie(1, 5);
                    window.location = window.location.href;
                }
			});
		}
	}
	//Matthew


	$scope.temp_parentDest = [];
    $scope.temp_parentDBDest = [];

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
            rootCreateDest.push(f.id);
			return;
		}
		
		for(var x = 0; x < f.children.length; x++){
			if(f.children[x].directory && f.children[x].children.length === 0){
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
                        var extension = "";
                        if(!files[i].fileExtension){
                            var exportLinks = files[i].exportLinks;
                            for (var property in exportLinks) {             
                                if (exportLinks.hasOwnProperty(property)) {
                                    switch (property){
                                    case "application/pdf":
                                        extension = ".pdf";
                                        break;
                                    case "application/rtf":
                                        extension = ".rtf";
                                        break;
                                    case "application/vnd.oasis.opendocument.text":
                                        extension = ".txt";
                                        break;
                                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                        extension = ".doc";
                                        break;
                                    case "text/html":
                                        extension = ".html";
                                        break;
                                    case "text/plain":
                                        extension = ".txt";
                                        break;
                                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                        extension = ".xlsx";
                                        break;
                                    case "application/x-vnd.oasis.opendocument.spreadsheet":
                                        extension = ".xlsx";
                                        break;
                                    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                                        extension = ".ppt";
                                        break;
                                    case "image/png":
                                        extension = ".png";
                                        break;
                                    case "image/jpeg":
                                        extension = ".jpeg";
                                        break;
                                    case "image/svg+xml":
                                        extension = ".xml";
                                        break;
                                    }
                                }
                            }
                        }

						if(files[i].mimeType === "application/vnd.google-apps.folder"){
							f.children[cur].children.push({id: files[i].id, name: files[i].title + extension, size: Math.ceil(files[i].fileSize /= 1000000) || "N/A", folder: "../img/checkbox.png", folder_image: "../img/folder.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: true, children: [], parent: f.children, sibling: f.children[cur].children, mother: f.children[cur]});
						
							if(files[i].fileSize)
								f.children[cur].children[f.children[cur].children.length-1].size += " MB";
						}
							
						else{
							f.children[cur].children.push({id: files[i].id, name: files[i].title + extension, size: Math.ceil(files[i].fileSize /= 1000000) || "N/A", folder: "../img/checkbox.png", folder_image: "../img/file.png", folderDest: "../img/checkbox.png", select: false, selectDest: false, directory: false, parent: f.children, mother: f.children[cur]});
							if(files[i].fileSize)
								f.children[cur].children[f.children[cur].children.length-1].size += " MB";
						}
					}

                   f.children[cur].children.sort(alphabeticizedSort);
                   // f.children[cur].children.sort(chronologicalSort);
                    // f.children[cur].children.sort(fileSizeSort);

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
        rootCreateDest.push(f.id);
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

        rootCreateDest.pop();

		if($scope.curDestDirGoogle === "")
			$scope.curDestDirGoogle = "/";
	}

	$scope.curDestDirDropbox = "/";

	$scope.intoDropboxDestFolder = function(f){
        if(!f.directory) 
            return;

        if(f.children.length === 0) {
            $scope.temp_parentDBDest = f.sibling;

            if($scope.curDestDirDropbox === "/")
                $scope.curDestDirDropbox += f.name;

            else
                $scope.curDestDirDropbox += "/" + f.name;

            $scope.dropboxDestFile = empty;
            return;
        }

		if($scope.curDestDirDropbox === "/")
			$scope.curDestDirDropbox += f.name;

		else
			$scope.curDestDirDropbox += "/" + f.name;

		$scope.dropboxDestFile = f.children;;
	}

	$scope.outofDropboxDestFolder = function(){
		if($scope.curDestDirDropbox !== "/"){
			while($scope.curDestDirDropbox[$scope.curDestDirDropbox.length-1] !== '/')
				$scope.curDestDirDropbox = $scope.curDestDirDropbox.slice(0, -1);

			$scope.curDestDirDropbox = $scope.curDestDirDropbox.slice(0, -1);
			
            if($scope.dropboxDestFile === empty){
                $scope.dropboxDestFile = $scope.temp_parentDBDest;
                $scope.temp_parentDBDest = [];
            }

            else
                $scope.dropboxDestFile = $scope.dropboxDestFile[0].parent;
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


    //Matt
    $scope.downloadFlag = "";
    $scope.saveIt = false;

    $scope.localSave = function(){
        $scope.saveIt = true;
    }

    $scope.localOpen = function(){
        $scope.saveIt = false;
    }

    $scope.gdDownloadIt = function(){
        $scope.downloadFlag = "Google";
    }

    $scope.dbDownloadIt = function(){
        $scope.downloadFlag = "Dropbox";
    }

    $scope.toLocalDownload = function(){
        if($scope.downloadFlag === "Google")
            $scope.gdToLocalDownload();

        else
            $scope.dropboxToLocalDownload();
    }

    var downloadFile = function(url, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = url;
        link.click();
    }


    $scope.gdToLocalDownload = function() {
        console.log("Google to local download");

        var a;

        for(var x in $scope.gFileSelect) {
            a = x;
        }

        gdClient.getItemMeta($scope.gFileSelect[a].id, function(response){
            console.log(response);
            

            if($scope.saveIt){

              if(response.webContentLink) {   //TODO: Do something with response.webContentLink
                    downloadFile(response.webContentLink, $scope.gFileSelect[a].name);
                }
            

                else{
                    var downloadUrl = "";
                    var exportLinks = response.exportLinks || {};
                    for (var property in exportLinks) {             
                        if (exportLinks.hasOwnProperty(property)) {
                            switch (property){
                            case "application/pdf":
                                downloadUrl = exportLinks[property]
                                break;
                            case "application/rtf":
                                downloadUrl = exportLinks[property]
                                break;
                            case "application/vnd.oasis.opendocument.text":
                                downloadUrl = exportLinks[property]
                                break;
                            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                downloadUrl = exportLinks[property]
                                break;
                            case "text/html":
                                downloadUrl = exportLinks[property]
                                break;
                            case "text/plain":
                                downloadUrl = exportLinks[property]
                                break;
                            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                downloadUrl = exportLinks[property]
                                break;
                            case "application/x-vnd.oasis.opendocument.spreadsheet":
                                downloadUrl = exportLinks[property]
                                break;
                            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                                downloadUrl = exportLinks[property]
                                break;
                            case "image/png":
                                downloadUrl = exportLinks[property]
                                break;
                            case "image/jpeg":
                                downloadUrl = exportLinks[property]
                                break;
                            case "image/svg+xml":
                                downloadUrl = exportLinks[property]
                                break;
                            }
                        }
                    }

                    downloadFile(downloadUrl, $scope.gFileSelect[a].name);
                }
            }
        //USEFUL
        });
    }

    //
    $scope.dropboxToLocalDownload = function() {
        console.log("Dropbox to local download");

        var filePath;

        var a;

        for(var x in $scope.dFileSelect) {
            a = x;
        }
        
        if($scope.curDestDirLocal === "/") {
            filePath = $scope.curDestDirLocal + $scope.dFileSelect[a].name;
            console.log(filePath);
        }

        else {
            filePath = $scope.curDestDirLocal + "/" + $scope.dFileSelect[a].name;
            console.log(filePath);
        } 

        console.log("My filePath is " + filePath);

        options = {download:true} // download link instead of preview

        dbClient.getDownloadLink(filePath, options, function(response) {
            console.log(response);


            if($scope.saveIt){
                downloadFile(response.url, $scope.dFileSelect[a].name);
            }

            else{
                
            }

            //TODO: FIgure out how to downlaod it
            //response.url do something wiith this

        });
        //USEFUL
    };


    //
// dbp.getDownloadLink = function(filePath, options, callback){
//     this.api.makeUrl(filePath, options, function(error, url) {
//           if (error) {
//             return (error);  // Something went wrong.
//           }

//           callback && callback(url,error);
//         });
// }
    //

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


	$scope.confirmHoverIn = function(){
		angular.element(document.getElementById("google-confirm").innerHTML = "Confirm");
		angular.element(document.getElementById("dropbox-confirm").innerHTML = "Confirm");
		angular.element(document.getElementById("box-confirm").innerHTML = "Confirm");
		
	}

	$scope.confirmHoverOut = function(){
		angular.element(document.getElementById("google-confirm").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-up'></span>");
		angular.element(document.getElementById("dropbox-confirm").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-up'></span>");
		angular.element(document.getElementById("box-confirm").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-up'></span>");
		
	}

	$scope.cancelHoverIn = function(){
		angular.element(document.getElementById("google-cancel").innerHTML = "Cancel");
		angular.element(document.getElementById("dropbox-cancel").innerHTML = "Cancel");
		angular.element(document.getElementById("box-cancel").innerHTML = "Cancel");
		
	}

	$scope.cancelHoverOut = function(){
		angular.element(document.getElementById("google-cancel").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-down'></span>");
		angular.element(document.getElementById("dropbox-cancel").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-down'></span>");
		angular.element(document.getElementById("box-cancel").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-thumbs-down'></span>");
		
	}

	$scope.selectDestHoverIn = function(){
		angular.element(document.getElementById("google-selectDest").innerHTML = "<span>Select<br>All</span>");
		angular.element(document.getElementById("dropbox-selectDest").innerHTML = "<span>Select<br>All</span>");
		angular.element(document.getElementById("box-selectDest").innerHTML = "<span>Select<br>All</span>");
		
	}

	$scope.selectDestHoverOut = function(){
		angular.element(document.getElementById("google-selectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		angular.element(document.getElementById("dropbox-selectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		angular.element(document.getElementById("box-selectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-check'></span>");
		
	}

	$scope.unselectDestHoverIn = function(){
		angular.element(document.getElementById("google-unselectDest").innerHTML = "<span>Unselect<br>All</span>");
		angular.element(document.getElementById("dropbox-unselectDest").innerHTML = "<span>Unselect<br>All</span>");
		angular.element(document.getElementById("box-unselectDest").innerHTML = "<span>Unselect<br>All</span>");
		
	}

	$scope.unselectDestHoverOut = function(){
		angular.element(document.getElementById("google-unselectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		angular.element(document.getElementById("dropbox-unselectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		angular.element(document.getElementById("box-unselectDest").innerHTML = "<span class='glyphicon glyphicon-size glyphicon-unchecked'></span>");
		
	}



	//--------------------JOHNNY: for APIs testing--------------------//
																	  //
	$scope.testGDrive = function(){									  //
		gDriveTests()												  //
	};																  //
																	  //
	$scope.testDropbox = function(){								  //
		dropboxTests()												  //
	};																  //
																	  //
	//--------------------JOHNNY: for APIs testing--------------------//
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