(function() {

    'use strict';
    /**
     * Create the module and call the requires
     */
    var app = angular.module('lessonslearned', [
        'ngRoute',
        'ngCookies',
        'pascalprecht.translate'
    ]);

    /**
     * Configure the Routes */

    app.config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "app/views/home.html",
                controller: "PageCtrl"
            })

        .when("/user_management", {
                templateUrl: "app/views/admin/user_management.html",
                controller: "PageCtrl"
            })
            .when("/listll", {
                templateUrl: "app/views/list_ll.html",
                controller: "PageCtrl"
            })

        .otherwise({
            redirectTo: '404'
        });

        // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        $locationProvider.html5Mode(true);

    });

    app.config(['$translateProvider', function($translateProvider) {
        $translateProvider
            .useSanitizeValueStrategy('escape')
            .translations('en', { //TODO: Translations from each language on different files
                HOME: 'Home',
                EXPORT: 'Export',
                EXPORT_TO_PDF: 'Export to PDF file',
                EXPORT_TO_CSV: 'Export to CSV file'
            })
            .translations('pt', {
                HOME: 'Começar',
                EXPORT: 'Exportar',
                EXPORT_TO_PDF: 'Exportar para ficheiro PDF',
                EXPORT_TO_CSV: 'Exportar para ficheiro CSV'
            })
        $translateProvider.preferredLanguage('pt');
    }]);

}());
