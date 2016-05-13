
/**
* Create the controller
*/
(function(){
	 var  HeaderCtrl = function($scope, $routeParams, $window, services) {

		 console.log('Page loaded.');
		 
		 $scope.loggedIn = function() {
			return true;
		}

	 };
	 // Injecting modules used for better minifing later on
    HeaderCtrl.$inject = ['$scope', 'services'];
	
	

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('HeaderCtrl', HeaderCtrl);
}());
