
/**
* Create the controller
*/
(function(){
	 var  PageCtrl = function($scope, $routeParams, $window, services) {

		 console.log('Page loaded.');

	 };
	 // Injecting modules used for better minifing later on
    PageCtrl.$inject = ['$scope', 'services'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('PageCtrl', PageCtrl);
}());
