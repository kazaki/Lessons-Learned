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
				
				if (data == null) {
					console.log("Invalid LL id.")
					return;
				} 

				console.log(data);
				$("#vll_title").val(data["name"]);

			})
			.catch(function (err) {
				alert(err.data.message);
			});
			
		}
		
		$scope.loadLL = function() {
			var parameters = location.search.substring(1).split("&");
			var args = [];
			for (var i=0; i < parameters.length; i++) {
				 var temp = parameters[i].split("=");
				 args[temp[0]] = temp[1];
			}
			if (args["id"] != null) {
				$scope.getLesson(args["id"]);
			}
		}
		
		$scope.loadLL();

	 };
	 // Injecting modules used for better minifing later on
    ViewLLCtrl.$inject = ['$scope', 'lessonServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('ViewLLCtrl', ViewLLCtrl);
}());
