(function(){
	 var  SetCtrl = function($scope, $routeParams, $window, adminServices) {

		 console.log('Page loaded.');

	 };
	 // Injecting modules used for better minifing later on
    SetCtrl.$inject = ['$scope', '$routeParams', '$window','adminServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('SetCtrl', SetCtrl);
}());