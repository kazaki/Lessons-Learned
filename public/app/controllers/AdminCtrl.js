(function(){
	 var  AdminCtrl = function($scope, $routeParams, $window, adminServices) {

		 console.log('Page loaded.');
         
         $scope.addUser = function(user){
             adminServices.registerUser(user)
                .then(function (res) {
                    alert(res);
                   // $scope.itemsLogin.pop();
                    //$scope.itemsLogin.push();
                })
                .catch(function (err) {
                    alert(err.data.message);
                    //$scope.itemsLogin.pop();
                    //$scope.itemsLogin.push(err.data.message);
                });
         };
	    

	 };
	 // Injecting modules used for better minifing later on
    AdminCtrl.$inject = ['$scope', '$routeParams', '$window','adminServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('AdminCtrl', AdminCtrl);
}());