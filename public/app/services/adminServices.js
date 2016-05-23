(function () {

'use strict';
var adminServices = function ($q, $http, $cookies, $window) {
    var deferred = $q.defer();
    
      // Function to create a user
        this.registerUser = function(user) {

            return $http.post('/api/createuser', user)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        // Function to get all users
        this.getUsers = function() {

            return $http.get('/api/users')
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        this.edition = function(user) {
            console.log('HELLOOOOOOasdasd:' + user.data);
            return $http.put('/api/updateuseremail',user)
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