(function(){
	 var  Create_llCtrl = function($scope, genServices) {

		 console.log('Page loaded.');

        $scope.technologies = [];

        console.log('Page loaded.');

        genServices.getTechnologies()
            .then(function (techs) {
                console.log('Page sdasda.');
                alert(techs);
                $scope.technologies = techs.data;
            })
            .catch(function (err) {
                console.log('Page asdas.');
                alert(err.data.message);
            });
            

	 };
	 // Injecting modules used for better minifing later on
    Create_llCtrl.$inject = ['$scope','genServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('Create_llCtrl', Create_llCtrl);
}());