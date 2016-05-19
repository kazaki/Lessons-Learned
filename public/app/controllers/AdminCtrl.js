(function(){
	 var  AdminCtrl = function($scope, $routeParams, $window, adminServices, userServices) {

		 console.log('Page loaded.');
         
         $scope.hasSession="";

         $scope.logged = function(){
            userServices.logged()
                .then(function(res){
                    $scope.hasSession=res;
                    $scope.hasSession.logged=true;
                })
                .catch( function (err){
                    $scope.hasSession.logged=false;
                });
        };

        $scope.logout = function(){
            userServices.logout();
        };

        $scope.logged();


         $scope.addUser = function(user){
             adminServices.registerUser(user)
                .then(function (res) {
                    alert(res);
                })
                .catch(function (err) {
                    alert(err.data.message);
                });
         };
	    

	 };
	 // Injecting modules used for better minifing later on
    AdminCtrl.$inject = ['$scope', '$routeParams', '$window','adminServices','userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('AdminCtrl', AdminCtrl);
}());