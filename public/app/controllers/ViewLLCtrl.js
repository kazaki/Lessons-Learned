/**
* Create the controller for the Admin Home Page
*/
(function(){
	var  ViewLLCtrl = function($scope, $location, lessonServices, userServices) {

		console.log('ViewLLCtrl loaded.');
		
		$scope.permission = -1;
		$scope.llstatus = "unknown";
		
		 userServices.logged()
		.then(function(res){
			$scope.permission=res.data.permission;
		})
		.catch( function (err){
			console.log(err);
		});

		
		lessonServices.getLesson()
			.then(function (res) {
			
			$scope.lldata = res.data[0];

			if ($scope.lldata == null) {
				console.log("Invalid LL id.")
				return;
			} 

			console.log($scope.lldata);
			$("#lltitle").text($scope.lldata["name"]);
			$("#llclient").text($scope.lldata["client"]);
			$("#llsituation").text($scope.lldata["situation"]);
			$("#llaction").text($scope.lldata["action"]);
			$("#llresults").text($scope.lldata["result"]);
			$("#llmanager").text($scope.lldata["manager"]);
			$("#lldimension").text($scope.lldata["numberConsultants"]);
			$("#llstart").text($scope.lldata["dateBeginning"].substring(0,10));
			$("#llexpected").text($scope.lldata["dateEndExpected"].substring(0,10));
			$("#llfinish").text($scope.lldata["dateEnd"].substring(0,10));
			$("#lltech").text($scope.lldata["technologies"]);
			$("#llfeed").text($scope.lldata["name"]);
			
			
			
			
			$scope.llstatus = $scope.lldata["status"];
			
			// TODO
			//$scope.llstatus = "submitted";
			
			if ($scope.llstatus == "draft") {
				$('#llstatus').css("background-color", "#f0ad4e");
				$('#llstatus').text("Draft");
			} else if ($scope.llstatus == "submitted") {
				$('#llstatus').css("background-color", "#5bc0de");
				$('#llstatus').text("Submitted");
			} else if ($scope.llstatus == "approved") {
				$('#llstatus').css("background-color", "#f0ad4e");
				$('#llstatus').text("Approved");
			} else if ($scope.llstatus == "inactive") {
				$('#llstatus').css("background-color", "#5cb85c");
				$('#llstatus').text("Inactive");
			}
		
		})
		.catch(function (err) {
			console.log(err.data);
		});
		
		$scope.adminApprove() {
			
		}	
		
		$scope.loadLL = function() {
			$scope.getLesson();
		}
		
		$scope.isDnS = function() {
			return $scope.isDraft() && $scope.isSubmitter();
		}

		$scope.isAdmin = function() {
			return $scope.permission == 2;
		}
		
		$scope.isSubmitter = function() {
			return $scope.permission == 1;
		}
		
		$scope.isDraft = function() {
			return $scope.llstatus == "draft";
		}
		
		$scope.isSubmitted = function() {
			return $scope.llstatus == "submitted";
		}
		
		$scope.isAdminAndSubmitted = function() {
			return $scope.isAdmin() && $scope.isSubmitted();
		}	
		
		$scope.isDnS = function() {
			return $scope.isDraft() && $scope.isSubmitter();
		}
		
	
		

	 };
	 // Injecting modules used for better minifing later on
    ViewLLCtrl.$inject = ['$scope', '$location', 'lessonServices' , 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('ViewLLCtrl', ViewLLCtrl);
}());

