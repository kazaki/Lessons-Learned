/**
 * Create the controller
 */
(function() {
    var listllCtrl = function($scope, listllServices, userServices, filterFilter, $filter) {
        $scope.isAdmin = 0;
        $scope.sortType = 'title';
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
                alert(err.data.message);
            });

        listllServices.getAllLessons()
            .then(function(result) {
                if ($scope.isAdmin == 1) {
                    $scope.lessons = result.data;

                } else {
                    $scope.lessons = $filter('filter')(result.data, {
                        status: "Active"
                    }, true);
                }

            })
            .catch(function(err) {
                console.log('Lessons List error.');
                alert(err.data.message);
            });




    };
    // Injecting modules used for better minifing later on
    listllCtrl.$inject = ['$scope', 'listllServices', 'userServices', 'filterFilter', '$filter'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('listllCtrl', listllCtrl);
}());
