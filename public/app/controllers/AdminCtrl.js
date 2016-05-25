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

             alert(user.image);
             if(user.permission==null)
                user.permission="0";

                
                
             var fd = new FormData();   
             fd.append("image", image);
             fd.append("email", user.email);
             fd.append("password", user.password);
             fd.append("permission", user.permission);

             adminServices.registerUser(fd)
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
    angular.module('lessonslearned').directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
}());