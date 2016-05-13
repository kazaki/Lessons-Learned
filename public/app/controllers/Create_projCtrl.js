(function(){
	 var  Create_projCtrl = function($scope, $filter, genServices) {

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

         $scope.addProject = function(project, filter){
            project.dateBeginning = $filter('date')(project.dateBeginning, "yyyy-MM-dd"); // for conversion to string
            project.dateEndExpected = $filter('date')(project.dateEndExpected, "yyyy-MM-dd"); // for conversion to string
            project.dateEnd = $filter('date')(project.dateEnd, "yyyy-MM-dd"); // for conversion to string
            
             genServices.createProject(project)
                .then(function (res) {
                    console.log('loool');
                    alert(res);

                })
                .catch(function (err) {
                    console.log('loool');
                    alert(err.data.message);

                });
         };
            

	 };
	 // Injecting modules used for better minifing later on
    Create_projCtrl.$inject = ['$scope', '$filter', 'genServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('Create_projCtrl', Create_projCtrl);
}());