
/**
* Create the controller
*/
(function(){
	 var  listllCtrl = function($scope, $routeParams, $window, llServices) {

		 console.log('Page loaded.');



     $scope.availableSearchParams = [
            { key: "sector", name: "Sector", placeholder: "Setor..." },
            { key: "client", name: "Client", placeholder: "Sonae" },
            { key: "budget", name: "Budget", placeholder: "100+" },
            { key: "manager", name: "Project Manager", placeholder: "Vania" },
            { key: "model", name: "Delivery Model", placeholder: "Model..." }
          ];

	 };
	 // Injecting modules used for better minifing later on
   listllCtrl.$inject = ['$scope', 'llServices'];



    // Enabling the controller in the app
    angular.module('lessonslearned').controller('listllCtrl', listllCtrl);
}());
