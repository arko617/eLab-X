// #############################
// This contains common functions that do not belong any of the object
// #############################

/*
* To add formatting to String
*/
String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

/**
 * Check if an object is empty, i.e. {}
 * @param o
 * @returns {Boolean}
 */
function isEmptyObject(object){
    for(var i in object){
        if(object.hasOwnProperty(i)){
            return false;
        }
    }
    return true;
}

