(function(){
	 var  CreateLLCtrl = function($scope, $routeParams, $window, services) {

		 console.log('Page loaded.');

        $scope.technologies = [];
        $scope.managers = [];

	    $scope.getTechnologies = function(){
             services.getTechnologies()
                .then(function (techs) {
                    console.log('Page loaded.');
                    alert(res);
                    $scope.technologies = techs.data;
                })
                .catch(function (err) {
                    console.log('Page loaded.');
                    alert(err.data.message);
                });
            
        };

        $scope.getManagers = function(){
             services.getManagers()
                .then(function (mans) {
                    alert(res);
                    $scope.managers = mans.data;

                })
                .catch(function (err) {
                    alert(err.data.message);

                });
            
        };

	 };
	 // Injecting modules used for better minifing later on
    CreateLLCtrl.$inject = ['$scope', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('CreateLLCtrl', CreateLLCtrl);
}());