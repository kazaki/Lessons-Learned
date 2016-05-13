(function() {

    'use strict';
    /**
     * Create the module and call the requires
     */
    var app = angular.module('lessonslearned', [
        'ngRoute',
        'ngCookies',
        'pascalprecht.translate',
        'ui.bootstrap',
        'angular-advanced-searchbox'
    ]);

    /**
     * Configure the Routes */

    app.config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "app/views/login.html",
                controller: "LoginCtrl"
            })
             .when("/home", {
                templateUrl: "app/views/home.html",
                controller: "HomeCtrl"
            })

            // Management side
            .when("/user_management", {
                templateUrl: "app/views/admin/user_management.html",
                controller: "AdminCtrl"
            })

            .when("/create_project", {
                templateUrl: "app/views/admin/create_project.html",
                controller: "AdminCtrl"
            })

            .when("/users", {
                templateUrl: "app/views/admin/user_list.html",
                controller: "UserListCtrl"
            })

            .when("/listll", {
                templateUrl: "app/views/list_ll.html",
                controller: "listllCtrl"
            })

            .when("/create_ll", {
                templateUrl: "app/views/create_ll.html",
                controller: "CreateLLCtrl"
            })

            .when("/forbidden",{
                templateUrl: "app/views/forbidden.html",
                controller: "HomeCtrl"
            })

            .otherwise({
                redirectTo: '/'
            });

        // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        //$locationProvider.html5Mode({ enabled: true, requireBase: false });
        $locationProvider.html5Mode(true);

    });

    app.config(['$translateProvider', function($translateProvider) {
        $translateProvider
            .useSanitizeValueStrategy('escape')
            .translations('en', { //TODO: Translations from each language on different files
                HOME: 'Home',
                EXPORT: 'Export',
                EXPORT_TO_PDF: 'Export to PDF file',
                EXPORT_TO_CSV: 'Export to CSV file',
                ADD_USER: 'Add user'
            })
            .translations('pt', {
                HOME: 'Começar',
                EXPORT: 'Exportar',
                EXPORT_TO_PDF: 'Exportar para ficheiro PDF',
                EXPORT_TO_CSV: 'Exportar para ficheiro CSV',
                ADD_USER: 'Adicionar utilizador'
            })
        $translateProvider.preferredLanguage('pt');
    }]);

}());
