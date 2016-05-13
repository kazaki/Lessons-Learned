(function(){
	 var  CreateLLCtrl = function($scope, llServices) {

		 console.log('Page loaded.');

         llServices.getTechnologies()
            .then(function (techs) {
                $scope.technologies = techs.data;
            })
            .catch(function (err) {
                alert(err.data);
            });

         llServices.getManagers()
            .then(function (mans) {
                $scope.managers = mans.data;
            })
            .catch(function (err) {
                alert(err.data);
            });

        llServices.getProjects()
            .then(function (projects) {
                $scope.projects = projects.data;
            })
            .catch(function (err) {
                alert(err.data);
            });

        $scope.addLesson = function(lesson) {
            alert(lesson.technologies[0].technology + ' ' + lesson.technologies[0].idtechnologies);
            alert(lesson.actionTaken);
            alert(lesson.description);
            alert(lesson.results);
        }
            

	 };
	 // Injecting modules used for better minifing later on
    CreateLLCtrl.$inject = ['$scope','llServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('CreateLLCtrl', CreateLLCtrl);
}());