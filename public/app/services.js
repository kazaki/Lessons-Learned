
/**
* Create the module and call the requires
*/
angular.module('lessonslearned.services', [])

/**
* API service
*/
.service('API', function ($rootScope, $http, $q) {
  var BASE_URL = 'http://localhost:......';

  this.login = function(username, password) {
    return $http.get(BASE_URL+"");
  }

});