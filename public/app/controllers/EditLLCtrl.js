(function(){
	 var  EditLLCtrl = function($scope, $location, genServices, llServices, lessonServices, userServices) {

        var manager = null;
        var managerid = null;
        var lessonid = null;
        var data;

        $scope.getLesson = function() {
            lessonServices.getLesson()
                .then(function (res) {
                
                data = res.data[0];
                lessonid = data.idLessonsLearned;
                if (data == null) {
                    $location.path('/forbidden');
                } 

                console.log(data);

            })
            .catch(function (err) {
                alert(err.data);
            });
        }

        var confirmAuth = function() {
            userServices.logged()
            .then(function (result) {
                manager = result.data.name;
                managerid = result.data.idusers;
                genServices.getManagerLesson(managerid,lessonid)//check if this manager has this lesson
                    .then(function (ll) {
                        if(ll.data.length <= 0 || ll.data.status == 'inactive') {
                            $location.path('/forbidden');
                        }
                    })
                    .catch(function (err) {
                        $scope.items.push(err.data);
                    });
            })
            .catch(function (err) {
                while ($scope.items.length > 0) {
                    $scope.items.pop();
                }
                $scope.items.push(err.data);
            });
        }

        $scope.loadLL = function() {
            $scope.getLesson();
            confirmAuth();
        }
        
        $scope.loadLL();

        $scope.technologies = [];
        $scope.projects = [];
        $scope.items = [];

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
                $scope.items.push("Field technologies: "+ err.data);
            });

        $scope.pop = function () {
            $scope.items.pop();
        };

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
                    $scope.items.pop();
                    $scope.items.push();
                    alert("Inserted "+status);                   
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data);
                });
        }            

	 };
	 // Injecting modules used for better minifing later on
    EditLLCtrl.$inject = ['$scope', '$location', 'genServices', 'llServices', 'lessonServices', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('EditLLCtrl', EditLLCtrl);
}());