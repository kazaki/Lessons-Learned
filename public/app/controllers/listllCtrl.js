/**
 * Create the controller
 */
(function() {
    var listllCtrl = function($scope, listllServices, userServices, filterFilter, $filter) {
        $scope.isAdmin = 0;
        $scope.sortType = 'title';
        $scope.statusSel = false;
        $scope.statusString = "Draft";
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
                        status: "Active"
                    }, true);
                }

            })
            .catch(function(err) {
                console.log('Lessons List error.');
                alert(err);
            });

        $scope.clickStatus = function() {
            $scope.sortType = 'status';
            $scope.StatusSel = !$scope.StatusSel
            console.log($scope.StatusSel);
            if ($scope.StatusSel == true) {
                $scope.statusString = "Online";
            } else {
                $scope.statusString = "Offline";
            }
            console.log($scope.statusString);
        }

        $scope.OnlineOrOffline = function(status) {
            return function(lesson) {
                console.log("NO SERV:" + $scope.statusString);
                if ($scope.statusString == "Offline") {
                    return lesson.status == 'Draft' || lesson.status == 'Inactive';
                } else {
                    return lesson.status == 'Active';
                }
            }

        };




    };

    /*
    app.filter('filterStatus', function() {
        return function(lessons, StatusSel) {
            if (StatusSel == 1) {
                lessons = $filter('filter')(result.data, {
                    status: "Active"
                }, true);
            }
            else{
              lessons = $filter('filter')(result.data, {
                  status: "Inactive"
              }, true);
            }
        };

    });

    */
    // Injecting modules used for better minifing later on
    listllCtrl.$inject = ['$scope', 'listllServices', 'userServices', 'filterFilter', '$filter'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('listllCtrl', listllCtrl);
}());
