(function () {
/**
* Create the module and call the requires
*/
var llServices = function ($q, $http) {
    var deferred = $q.defer();


};

// Injecting modules used for better minifing later on
    llServices.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('listllServices', llServices);

}());
