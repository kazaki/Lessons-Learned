/**
 * Create the controller
 */
(function() {
    var listllCtrl = function($scope, listllServices, userServices, genServices) {

        console.log('Page loaded.');

        listllServices.getAllLessons()
            .then(function(result) {
                console.log('Lessons List loaded.');
                $scope.lessons = result.data;
            })
            .catch(function(err) {
                console.log('Lessons List error.');
                alert(err.data.message);
            });



        $scope.availableSearchParams = [{
            key: "sector",
            name: "Sector",
            placeholder: "Setor..."
        }, {
            key: "client",
            name: "Client",
            placeholder: "Sonae"
        }, {
            key: "budget",
            name: "Budget",
            placeholder: "100+"
        }, {
            key: "manager",
            name: "Project Manager",
            placeholder: "Vania"
        }, {
            key: "model",
            name: "Delivery Model",
            placeholder: "Model..."
        }];

        $scope.$watch('searchParams', function() {
            console.log("mudou");

        });

        $scope.$on('advanced-searchbox:modelUpdated', function(event, searchParameter) {
          console.log($scope.searchParams.sector);

          //TODO: send search post and update scope.lessons
        });
        $scope.predicate = 'title';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };





    };
    // Injecting modules used for better minifing later on
    listllCtrl.$inject = ['$scope', 'listllServices', 'userServices', 'genServices'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('listllCtrl', listllCtrl);
}());
