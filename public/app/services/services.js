(function () {
/**
* Create the module and call the requires
*/
var services = function ($q, $http) {
    var deferred = $q.defer();
    /* exemplo
    this.getChallenges = function () {
            return $http.get('/api/challenges/open')
                .success(function (res) {
                    deferred.resolve(res);
                })
                .error(function (err) {
                    deferred.reject(err);
                });
        };
        */
};

// Injecting modules used for better minifing later on
    services.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('services', services);

}());