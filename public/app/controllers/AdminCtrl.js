(function(){
	 var  AdminCtrl = function($scope, $routeParams, $window, adminServices) {


		 console.log('Page loaded.');
         $scope.image="images/avatar.png";
         $scope.addUser = function(user){
console.log("file");
console.dir($scope.myFile);
/*
             alert(user.image);
             if(user.permission==null)
                user.permission="0";
             adminServices.registerUser(user)
                .then(function (res) {
                    alert(res);
                })
                .catch(function (err) {
                    alert(err.data.message);
                });
                */
         };
	    

	 };
	 // Injecting modules used for better minifing later on
    AdminCtrl.$inject = ['$scope', '$routeParams', '$window','adminServices'];

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