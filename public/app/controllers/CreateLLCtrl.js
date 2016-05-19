(function(){
	 var  CreateLLCtrl = function($scope, $window, genServices, llServices, userServices) {

        $scope.technologies = [];
        $scope.projects = [];
        var manager = null;

        $scope.localLang = {
            selectAll       : "Tick all",
            selectNone      : "Tick none",
            reset           : "Undo all",
            search          : "Type here to search...",
            nothingSelected : "Nothing is selected"
        }

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

        $scope.createLesson = function(lesson, draft) {
            /*alert(lesson.technologies[0].technology + ' ' + lesson.technologies[0].idtechnologies);
            alert(lesson.actionTaken);
            alert(lesson.situation);
            alert(lesson.result);*/

            var status = draft? 'draft' : 'active';

            var ll = 
             {
                 "project": lesson.project,
                 "technologies": lesson.technologies,
                 "actionTaken": lesson.actionTaken,
                 "situation": lesson.situation,
                 "result": lesson.result,
                 "maker": manager,
                 "status": status
             };

            llServices.createLL(ll)
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    alert("Inserted "+status);                   
                })
                .catch(function (err) {
                    alert("Erro "+err.data);
                });
        }            

	 };
	 // Injecting modules used for better minifing later on
    CreateLLCtrl.$inject = ['$scope', '$window', 'genServices', 'llServices', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('CreateLLCtrl', CreateLLCtrl);
}());