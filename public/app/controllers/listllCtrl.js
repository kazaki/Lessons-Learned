/**
 * Create the controller
 */
(function() {
    var listllCtrl = function($scope, listllServices, userServices, filterFilter, $filter) {
        $scope.isAdmin = 0;
        $scope.sortType = 'title';
        $scope.statusString = "active";
        console.log('Page loaded.');

        userServices.logged()
            .then(function(result) {
                console.log('User data loaded.');
                $scope.user = result.data;
                console.log(JSON.stringify(result.data));
                if (result.data.permission == 2) {
                    $scope.isAdmin = 1;
                    console.log("sou admin");
                }

            })
            .catch(function(err) {
                console.log('Lessons List error.');
                alert(err);
            });

        listllServices.getAllLessons()
            .then(function(result) {
                if ($scope.isAdmin == 1) {
                    $scope.lessons = result.data;
                    //console.log(JSON.stringify(result.data));
                    console.log('HIII: ' + result.data[0].title);
                    console.log('HIII: ' + result.data[0].name);
                    console.log('HIII: ' + result.data[0].status);
                    console.log('HIII: ' + result.data[0].technology);

                } else {
                    $scope.lessons = $filter('filter')(result.data, {
                        status: "active"
                    }, true);
                }

            })
            .catch(function(err) {
                console.log('Lessons List error.');
                alert(err);
            });


        $scope.Status = function(status) {
            return function(lesson) {
                console.log("estado clicado:" + $scope.statusString);

                if ($scope.statusString == "active" || $scope.isAdmin==0) {
                    return lesson.status == 'active';
                } else if ($scope.statusString == "submitted") {
                    return lesson.status == 'submitted';
                } else if ($scope.statusString == "inactive") {
                    return lesson.status == 'inactive';
                }
            }

        };

        $scope.fieldTable = [{
            field: "active",
            title: "Active"
        }, {
            field: "inactive",
            title: "Inactive"
        }, {
            field: "submitted",
            title: "Pending approval"

        }];

        $scope.selected = $scope.fieldTable[0];

        $scope.hasChanged = function() {
            $scope.statusString=$scope.selected.field;
        };




    };


    // Injecting modules used for better minifing later on
    listllCtrl.$inject = ['$scope', 'listllServices', 'userServices', 'filterFilter', '$filter'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('listllCtrl', listllCtrl);
}());
