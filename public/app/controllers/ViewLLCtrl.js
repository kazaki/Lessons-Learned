/**
* Create the controller for the Admin Home Page
*/
(function(){
	var  ViewLLCtrl = function($scope, $location, lessonServices) {

		console.log('ViewLLCtrl loaded.');
		 
		$scope.getLesson = function() {
			lessonServices.getLesson()
				.then(function (res) {
				
				var data = res.data[0];
				
				if (data == null) {
					console.log("Invalid LL id.")
					return;
				} 

				console.log(data);
				$("#lltitle").text(data["name"]);
				$("#llclient").text(data["client"]);
				$("#llsituation").text(data["situation"]);
				$("#llaction").text(data["action"]);
				$("#llresults").text(data["result"]);
				$("#llmanager").text(data["manager"]);
				$("#lldimension").text(data["numberConsultants"]);
				$("#llstart").text(data["dateBeginning"]);
				$("#llexpected").text(data["dateEndExpected"]);
				$("#llfinish").text(data["dateEnd"]);
				$("#lltech").text(data["technology"]);
				$("#lldesc").text(data["name"]);
				
				if (data["status"] == "approved")
					$('#llstatus').bootstrapToggle('on');
				else if (data["status"] == "submited" || (data["status"] == "inactive"))
					$('#llstatus').bootstrapToggle('off');
				
				
				

			})
			.catch(function (err) {
				alert(err.data);
			});
			
		}
		
		$scope.loadLL = function() {
				$scope.getLesson();
		}
		
		$scope.loadLL();

	 };
	 // Injecting modules used for better minifing later on
    ViewLLCtrl.$inject = ['$scope', '$location', 'lessonServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('ViewLLCtrl', ViewLLCtrl);
}());
