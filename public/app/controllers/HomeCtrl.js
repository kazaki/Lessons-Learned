(function(){
	 var  HomeCtrl = function($scope, $routeParams, $window, userServices) {

		 console.log('Page loaded.');

	

	 };
	 // Injecting modules used for better minifing later on
    HomeCtrl.$inject = ['$scope', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('HomeCtrl', HomeCtrl);
}());