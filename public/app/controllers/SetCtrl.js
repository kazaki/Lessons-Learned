(function() {
    var SetCtrl = function($scope, $routeParams, $window, adminServices, genServices) {

        console.log('Settings page loaded.');
        $scope.techValues = [];
        $scope.typeValues = [];
        $scope.sectorValues = [];
        genServices.getTechnologies()
            .then(function(result) {

                $scope.technologies = result.data;
                console.log(JSON.stringify($scope.technologies));

                angular.forEach($scope.technologies, function(technology) {
                    $scope.techValues.push(technology.technology);
                });

                $scope.techValues.push(',');
                console.log($scope.techValues);

                configTech = {
                    // Tags joiner of the output value
                    values: $scope.techValues // pre-defined tags data

                };
                var foo = new Tags(document.querySelector('input[name="tags3"]'), configTech);
                foo.beautify();



            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        genServices.getProjectTypes()
            .then(function(result) {

                $scope.types = result.data;
                console.log(JSON.stringify($scope.types));

                angular.forEach($scope.types, function(type) {
                    $scope.typeValues.push(type.name);
                });

                $scope.typeValues.push(',');
                console.log($scope.typeValues);

                configTypes = {
                    // Tags joiner of the output value
                    values: $scope.typeValues // pre-defined tags data

                };
                var foo = new Tags(document.querySelector('input[name="tags2"]'), configTypes);
                foo.beautify();



            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        genServices.getBusinessSectors()
            .then(function(result) {

                $scope.sectors = result.data;
                console.log(JSON.stringify($scope.sectors));

                angular.forEach($scope.sectors, function(sector) {
                    $scope.sectorValues.push(sector.name);
                });

                $scope.sectorValues.push(',');
                console.log($scope.sectorValues);

                configSectors = {
                    // Tags joiner of the output value
                    values: $scope.sectorValues // pre-defined tags data

                };
                var foo = new Tags(document.querySelector('input[name="tags"]'), configSectors);
                foo.beautify();



            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        $scope.addTech = function() {

						console.log($scope.newTech);

            genServices.getTechnologies()
                .then(function(result) {
                    $scope.technologies = result.data;
                    angular.forEach($scope.technologies, function(technology) {
                        if(technology.technology==$scope.newTech){
                          alert("oi la");
                        }

                        //insert tech
                    });
                })
                .catch(function(err) {
                    console.log('Fetch technologies error.');
                    alert(err);
                });

        };





    };
    // Injecting modules used for better minifing later on
    SetCtrl.$inject = ['$scope', '$routeParams', '$window', 'adminServices', 'genServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('SetCtrl', SetCtrl);
}());
