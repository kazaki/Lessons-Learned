
/**
* Create the controller for the user list page
*/
(function(){

	var  UserListCtrl = function($scope, $uibModal, $log, services, filterFilter) {

		$scope.itemsPerPage = 3;
        $scope.currentPage = 1;

		services.getUsers()
            .then(function (result) {
                console.log('User List loaded.');
                $scope.users = result.data;
                $scope.$watch('search.filter', function (term) {
                    var obj = { name: term }

                    $scope.filteredUsers = filterFilter($scope.users, obj);
                    $scope.currentPage = 1;
                });
                /*$scope.$watch("currentPage + itemsPerPage", function() {
		            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		            var end = begin + $scope.itemsPerPage;

		            $scope.filteredUsers = $scope.users.slice(begin, end);
		        });*/
            })
            .catch(function (err) {
                console.log('User List error.');
                alert(err.data.message);
        	});


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
    UserListCtrl.$inject = ['$scope', '$uibModal', '$log', 'adminServices', 'filterFilter'];
    DialogController.$inject = ['$scope', '$uibModalInstance', 'selectedItem'];

    // Enabling the controllers in the app
    angular.module('lessonslearned')
    	.controller('UserListCtrl', UserListCtrl)
    	.controller('DialogController', DialogController);
}());