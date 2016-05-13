(function(){
	 var  Create_projCtrl = function($scope, genServices) {

		 console.log('Page loaded.');

        $scope.managers = [];

        console.log('Page loaded.');

         genServices.getManagers()
            .then(function (men) {
                alert(men);
                $scope.managers = men.data;

            })
            .catch(function (err) {
                alert(err.data.message);

            });
            console.log('Page loaded.');
         $scope.addProject = function(project){
            console.log('Page loaded.');
             genServices.createProject(project)
                .then(function (res) {
                    console.log('loool');
                    alert('troool' + res);

                })
                .catch(function (err) {
                    console.log('loool');
                    alert('troool' + err.data.message);

                });
         };
            

	 };
	 // Injecting modules used for better minifing later on
    Create_projCtrl.$inject = ['$scope','genServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('Create_projCtrl', Create_projCtrl);
}());