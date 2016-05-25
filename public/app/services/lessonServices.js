(function () {

'use strict';
var lessonServices = function ($q, $http, $cookies, $window) {
    var deferred = $q.defer();

	this.getLesson = function() {
		 return $http.get('/api/lesson')
                .success(function(res) {
				
					console.log(res);
				
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

	};
	
	this.setLessonState = function(id, state) {
		 return $http.put('/api/updatelessonstate', {
			'state' : state,
			'idlesson' : id
		 })
                .success(function(res) {
				
					console.log(res);
				
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

	};
	

   
};

// Injecting modules used for better minifing later on
    lessonServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('lessonServices', lessonServices);

}());