
/**
* Create the controller for the user list page
*/
(function(){

	var  UserListCtrl = function($scope, $uibModal, $log, services) {

		console.log('User List loaded.');
		$scope.editUser = function(ID) {
			console.log("Modal opened.");
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'usersTpl',
				controller: 'DialogController',
				resolve: {
					selectedItem: function () {
						return ID;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
			//$scope.selectedItem = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	};

	//Modal Controller
	var DialogController = function ($scope, $uibModalInstance, selectedItem) {

		$scope.selectedItem = selectedItem;
		$scope.ok = function () {
			$uibModalInstance.close('ok');
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};

	 // Injecting modules used for better minifing later on
    UserListCtrl.$inject = ['$scope', '$uibModal', '$log', 'services'];
    DialogController.$inject = ['$scope', '$uibModalInstance', 'selectedItem'];

    // Enabling the controllers in the app
    angular.module('lessonslearned')
    	.controller('UserListCtrl', UserListCtrl)
    	.controller('DialogController', DialogController);
}());