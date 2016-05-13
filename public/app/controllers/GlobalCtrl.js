
/**
* Create the controller
*/
(function(){
	 var  GlobalCtrl = function($scope, $routeParams, $window, services) {

		 console.log('Page loaded.');
		 
		 $scope.getUser = function() {
			return true;
		}

	 };
	 // Injecting modules used for better minifing later on
    GlobalCtrl.$inject = ['$scope', 'services'];
	
	

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('GlobalCtrl', GlobalCtrl);
}());
