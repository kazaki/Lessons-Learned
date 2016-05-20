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
			} else
				console.log("No LL id was given.");
		}
		
		$scope.loadLL();

	 };
	 // Injecting modules used for better minifing later on
    ViewLLCtrl.$inject = ['$scope', 'lessonServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('ViewLLCtrl', ViewLLCtrl);
}());
