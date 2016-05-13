
/**
* Create the controller
*/
(function(){
	 var  GlobalCtrl = function($scope, $routeParams, $window, userServices) {

		 console.log('Page loaded11.');
		 
		 $scope.hasSession="";
         $scope.logged = function(){
            userServices.logged()
                .then(function(res){
                    $scope.hasSession=res;
                    $scope.hasSession.logged=true;
                })
                .catch( function (err){
                    $scope.hasSession.logged=false;
                });
        };
		
		$scope.logged();
	 };
	 // Injecting modules used for better minifing later on
    GlobalCtrl.$inject = ['$scope', '$routeParams', '$window','userServices'];
	
	

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('GlobalCtrl', GlobalCtrl);
}());
