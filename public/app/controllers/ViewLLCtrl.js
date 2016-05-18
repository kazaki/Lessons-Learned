/**
* Create the controller for the Admin Home Page
*/
(function(){
	var  ViewLLCtrl = function($scope, lessonServices) {

		console.log('ViewLLCtrl loaded.');
		 
		$scope.getLesson = function(lessonid) {
			lessonServices.getLesson(lessonid)
				.then(function (res) {
				
				var data = res.data[0];

				console.log(data);
				$("#vll_title").val(data["name"]);

			})
			.catch(function (err) {
				alert(err.data.message);
			});
			
		}

	 };
	 // Injecting modules used for better minifing later on
    ViewLLCtrl.$inject = ['$scope', 'lessonServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('ViewLLCtrl', ViewLLCtrl);
}());
