(function(){
	 var  EditLLCtrl = function($scope, $location, genServices, llServices, lessonServices, userServices) {

        var manager = null;
        var managerid = null;
        var lessonid = null;
        var techs = [];
        $scope.items = [];
        var data;

        var loadTechnologies = function() {
            genServices.getTechnologies()
            .then(function (mytechs) {
                var alltechs = mytechs.data;
                var lessontechs = data.technologies.split(",");
                var checkedtechs = [];
                //checking technologies that this lesson has already
                for(i = 0; i < alltechs.length; i++) {
                    checkedtechs[i] = alltechs[i];
                    checkedtechs[i].ticked = (lessontechs.indexOf(alltechs[i].technology) < 0)? false : true;
                    /*console.log("Lesson techs:" + JSON.stringify(lessontechs[i]));
                    console.log("All tech:" + JSON.stringify(alltechs[i]));
                    console.log("Checked:" + JSON.stringify(checkedtechs[i]));*/
                }
                $scope.lesson = { 
                    technologies: checkedtechs, 
                    situation: data.situation, 
                    actionTaken: data.action, 
                    result: data.result 
                };

            })
            .catch(function (err) {
                $scope.items.push("Field technologies: "+ err.data);
            });
        }

        var getLesson = function() {
            lessonServices.getLesson()
                .then(function (res) {
                data = res.data[0];
                lessonid = data.idLessonsLearned;
                if (data == null) {
                    $location.path('/forbidden');
                }

                confirmAuth(); 

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
                //check if this manager has this lesson
                genServices.getManagerLesson(managerid,lessonid)
                    .then(function (ll) {
                        console.log("HEY"+managerid + lessonid + JSON.stringify(ll.data));
                        if(ll.data.length <= 0) {
                            $location.path('/forbidden');
                        }
                        else {
                            $scope.llstatus = ll.data.status;
                            loadTechnologies();
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
            getLesson();
        }
        
        $scope.loadLL();

        $scope.localLang = {
            selectAll       : "Tick all",
            selectNone      : "Tick none",
            reset           : "Undo all",
            search          : "Type here to search...",
            nothingSelected : "Nothing is selected"
        }

        $scope.pop = function () {
            $scope.items.pop();
        };          

	 };
	 // Injecting modules used for better minifing later on
    EditLLCtrl.$inject = ['$scope', '$location', 'genServices', 'llServices', 'lessonServices', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('EditLLCtrl', EditLLCtrl);
}());