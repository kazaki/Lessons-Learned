(function(){
	 var  LoginCtrl = function($scope, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
         $scope.hasSession="";
         $scope.items = [];
         
	    $scope.login = function(user,remember){
             userServices.login(user, remember)
                .then(function (res) {
                    $scope.items.pop();
                    $scope.items.push();
                    if($scope.hasSession.data.permission=="2")
                        $window.location.href = '/home';
                    else
                        $window.location.href = '/listll';
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data.message);
                    
                });
            
        };

        
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
		
         $scope.pop = function () {
            $scope.items.pop();
        };
        
		$scope.logged();
       
	 };
	 // Injecting modules used for better minifing later on
    LoginCtrl.$inject = ['$scope', '$routeParams', '$window', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('LoginCtrl', LoginCtrl);
}());