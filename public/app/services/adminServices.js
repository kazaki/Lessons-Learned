(function () {

'use strict';
var adminServices = function ($q, $http, $cookies, $window) {
    var deferred = $q.defer();
    
      // Function to login a user
        this.registerUser = function(user) {

            return $http.post('/api/createuser', user)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
   
};

// Injecting modules used for better minifing later on
    adminServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('adminServices', adminServices);

}());