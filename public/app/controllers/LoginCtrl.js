(function(){
	 var  LoginCtrl = function($scope, $routeParams, $window, userServices) {

		 console.log('Page loaded.');

	    $scope.login = function(user,remember){
             userServices.login(user, remember)
                .then(function (res) {
                    alert(JSON.stringify(res));
                    
                   // $scope.itemsLogin.pop();
                    //$scope.itemsLogin.push();
                })
                .catch(function (err) {
                    alert(JSON.stringify(err.data.message));
                    //$scope.itemsLogin.pop();
                    //$scope.itemsLogin.push(err.data.message);
                });
            
        };
        
        $scope.hasSession;
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
$scope.logged();
	 };
	 // Injecting modules used for better minifing later on
    LoginCtrl.$inject = ['$scope', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('LoginCtrl', LoginCtrl);
}());