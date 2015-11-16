// #########################################
// This is the super class for all the drive clients
// #########################################

// Super class constructor
var CloudClient = function(api){
	this.api = api
}

var ccp = CloudClient.prototype

//dummy function for debug OO programming
ccp.sayHello = function(){
	console.log('Hello, this is CloudClient API')
}














