
/**
* Create the controller for the user list page
*/
(function(){

	var  UserListCtrl = function($scope, $uibModal, $log, services, filterFilter) {

		$scope.itemsPerPage = 3;
        $scope.currentPage = 1;
        $scope.items = [];
        
		services.getUsers()
            .then(function (result) {
                $scope.users = result.data;
                $scope.items.pop();
                $scope.items.push();
                $scope.$watch('search.filter', function (term) {
                    var obj = { name: term }

                    $scope.filteredUsers = filterFilter($scope.users, obj);
                    $scope.currentPage = 1;
                });
            })
            .catch(function (err) {
                $scope.items.pop();
               	$scope.items.push(err.data);
        	});

        $scope.pop = function () {
            $scope.items.pop();
        };

		$scope.editUser = function(user) {
			console.log("Modal opened.");
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'usersTpl',
				controller: 'DialogController',
				resolve: {
					selectedItem: function () {
						return user;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selectedItem = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	};

	//Modal Controller
	var DialogController = function ($scope, $uibModalInstance, $window, services, selectedItem) {
			
		$scope.selectedItem = selectedItem;

		$scope.submit = function(mydata) {
			mydata.email = selectedItem.email;
			console.log("MYDATA:" + mydata);
			console.log("JSON:" + JSON.stringify(mydata));
			console.log(mydata.name);
			$uibModalInstance.dismiss('ok');
			services.edition(mydata)
                .then(function (res) {
                    alert(res);
            })
	            .catch(function (err) {
	                alert(err.data.message);
            });
	        $window.location.reload();
	  	};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};

	 // Injecting modules used for better minifing later on
    UserListCtrl.$inject = ['$scope', '$uibModal', '$log', 'adminServices', 'filterFilter'];
    DialogController.$inject = ['$scope', '$uibModalInstance','$window', 'adminServices', 'selectedItem'];

    // Enabling the controllers in the app
    angular.module('lessonslearned')
    	.controller('UserListCtrl', UserListCtrl)
    	.controller('DialogController', DialogController);
}());