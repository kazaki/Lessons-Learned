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
                controller: "PageCtrl"
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
                ADD_USER: 'Add user',

                SELECT: 'Select...',
                CLIENT: 'Client',
                SELECT_CLIENT: 'Project\'s Client',
                NONE: 'None',

                //Create LL
                SELECT_TECHS: 'Select Technologies',
                SELECT_MANAGER: 'Select Project Manager',
                SELECT_PROJECT: 'Select Project',
                DESCRIPTION: 'Description of the situation',
                ACTION_TAKEN: 'Action taken',
                RESULT_DESCRIPTION: 'Results observed',
                CHARS_LEFT: 'characters left'
            })
            .translations('pt', {
                HOME: 'Começar',
                EXPORT: 'Exportar',
                EXPORT_TO_PDF: 'Exportar para ficheiro PDF',
                EXPORT_TO_CSV: 'Exportar para ficheiro CSV',
                ADD_USER: 'Adicionar utilizador',

                SELECT: 'Selecionar...',
                CLIENT: 'Cliente',
                SELECT_CLIENT: 'Cliente',
                NONE: 'Nenhum',

                //Create LL
                SELECT_TECHS: 'Selecionar Tecnologias',
                SELECT_MANAGER: 'Selecionar Gestor de Projeto',
                SELECT_PROJECT: 'Selecionar Projeto',
                DESCRIPTION: 'Descrição da situação',
                ACTION_TAKEN: 'Descrição da ação tomada',
                RESULT_DESCRIPTION: 'Descrição do resultado',
                CHARS_LEFT: 'caracteres restantes'
            })
        $translateProvider.preferredLanguage('pt');
    }]);

}());
