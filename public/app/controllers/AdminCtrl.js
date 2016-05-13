(function(){
	 var  AdminCtrl = function($scope, $routeParams, $window, adminServices) {

		 console.log('Page loaded.');
         
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
    AdminCtrl.$inject = ['$scope', '$routeParams', '$window','adminServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('AdminCtrl', AdminCtrl);
}());