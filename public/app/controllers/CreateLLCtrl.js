(function(){
	 var  CreateLLCtrl = function($scope, genServices, llServices, userServices) {

        $scope.technologies = [];
        $scope.projects = [];
        var manager = null;

        genServices.getTechnologies()
            .then(function (techs) {
                $scope.technologies = techs.data;
            })
            .catch(function (err) {
                alert(err.data);
            });

        genServices.getProjects()
            .then(function (projects) {
                $scope.projects = projects.data;
            })
            .catch(function (err) {
                alert(err.data);
            });

        userServices.logged()
                .then(function (result) {
                    manager = result.data.name;
                })
                .catch(function (err) {
                    alert(err.data);
                });

        $scope.addLesson = function(lesson) {
            /*alert(lesson.technologies[0].technology + ' ' + lesson.technologies[0].idtechnologies);
            alert(lesson.actionTaken);
            alert(lesson.situation);
            alert(lesson.result);*/

            var ll = 
             {
                 "project": lesson.project,
                 "technologies": lesson.technologies,
                 "actionTaken": lesson.actionTaken,
                 "situation": lesson.situation,
                 "result": lesson.result,
                 "maker": manager
             };

            llServices.createLL(ll)
                .then(function (result) {
                    alert("Inserted!");
                    console.log(JSON.stringify(result));
                })
                .catch(function (err) {
                    alert(err.data);
                });
        }
            

	 };
	 // Injecting modules used for better minifing later on
    CreateLLCtrl.$inject = ['$scope', 'genServices', 'llServices', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('CreateLLCtrl', CreateLLCtrl);
}());