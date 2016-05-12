(function(){
	 var  HomeCtrl = function($scope, $routeParams, $window, services) {

		 console.log('Page loaded.');

	

	 };
	 // Injecting modules used for better minifing later on
    HomeCtrl.$inject = ['$scope', 'services'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('HomeCtrl', HomeCtrl);
}());