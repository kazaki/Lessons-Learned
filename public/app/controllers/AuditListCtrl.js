/**
 * Create the controller
 */
(function() {
    var AuditListCtrl = function($scope, listllServices, userServices, filterFilter, $filter) {
        
    };


    // Injecting modules used for better minifing later on
    AuditListCtrl.$inject = ['$scope', 'listllServices', 'userServices', 'filterFilter', '$filter'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('AuditListCtrl', AuditListCtrl);
}());
