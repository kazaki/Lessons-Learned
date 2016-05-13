(function () {
/**
* Create the module and call the requires
*/
var llServices = function ($q, $http) {
    var deferred = $q.defer();
     // Function to retrieve technologies
        this.getTechnologies = function() {
            return $http.get('/api/technologies')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to retrieve people who can be project managers
        this.getManagers = function() {
            return $http.get('/api/managers')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to retrieve the list of existing projects
        this.getProjects = function() {
            return $http.get('/api/projects')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to create a LL
        this.createLL = function(lesson) {

            return $http.post('/api/createlesson', lesson)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };
};

// Injecting modules used for better minifing later on
    llServices.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('llServices', llServices);

}());