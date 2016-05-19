﻿(function() {

    'use strict';
    /**
     * Create the module and call the requires
     */
    var app = angular.module('lessonslearned', [
        'ngRoute',
        'ngCookies',
        'pascalprecht.translate',
        'ui.bootstrap',
        'angular-advanced-searchbox',
        'isteven-multi-select'
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
                controller: "Create_projCtrl"
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
			
			.when("/view_ll", {
                templateUrl: "app/views/view_ll.html",
                controller: "ViewLLCtrl"
            })

			.when("/settings",{
                templateUrl: "app/views/settings.html",
                controller: "HomeCtrl"
            })

            .when("/forbidden",{
                templateUrl: "app/views/404.html",
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
                ADMIN_PANEL: 'Administration',
                USERS: 'Users',
                LESSONS: 'Lessons Learned',
                STATS: 'Statistics',
                IN_WAIT: 'In Wait',
                AUDIT_TRAIL: 'Audit Trail',
                SETTINGS: 'Settings',

                LANGUAGE: 'Language',

                EXPORT: 'Export',
                EXPORT_TO_PDF: 'Export to PDF file',
                EXPORT_TO_CSV: 'Export to CSV file',
                ADD_USER: 'Add user',

                SELECT: 'Select...',
                CLIENT: 'Client',
                SELECT_CLIENT: 'Project\'s Client',
                NONE: 'None',

                //Pagination buttons
                FIRST: 'First',
                LAST: 'Last',
                NEXT: 'Next',
                PREVIOUS: 'Previous',

                //Create LL
                SELECT_TECHS: 'Select Technologies',
                SELECT_MANAGER: 'Select Project Manager',
                SELECT_PROJECT: 'Select Project',
                DESCRIPTION: 'Description of the situation',
                ACTION_TAKEN: 'Action taken',
                RESULT_DESCRIPTION: 'Results observed',
                CHARS_LEFT: 'characters left',
                SUBMIT: 'Submit',
                SAVE_DRAFT: 'Save as draft',
                CANCEL: 'Cancel',
                CREATE_LL: 'Creating Lesson Learned',

                //Create Project
                LL_TITLE: 'Lesson Learned title',
                PROJECT_NAME: 'Project Name',
                PROJECT_MANAGER: 'Project Manager',
                COLABORATORS: 'Colaborators',
                BUSINESS_SECTOR: 'Busines Sector',
                DAYS_LENGTH: 'Project Duration (days)',
                PROJECT_TYPE: 'Project Type',
                ADD_PROJECT: 'Add Project'
            })
            .translations('pt', {
                HOME: 'Começar',
                ADMIN_PANEL: 'Administração',
                USERS: 'Utilizadores',
                LESSONS: 'Lições Aprendidas',
                STATS: 'Estatísticas',
                IN_WAIT: 'À espera de aprovação',
                AUDIT_TRAIL: 'Histórico',
                SETTINGS: 'Configurações',

                LANGUAGE: 'Dialeto',

                EXPORT: 'Exportar',
                EXPORT_TO_PDF: 'Exportar para ficheiro PDF',
                EXPORT_TO_CSV: 'Exportar para ficheiro CSV',
                ADD_USER: 'Adicionar utilizador',

                SELECT: 'Selecionar...',
                CLIENT: 'Cliente',
                SELECT_CLIENT: 'Cliente',
                NONE: 'Nenhum',

                //Pagination buttons
                FIRST: 'Início',
                LAST: 'Fim',
                NEXT: 'Próximo',
                PREVIOUS: 'Anterior',

                //Create LL
                SELECT_TECHS: 'Selecionar Tecnologias',
                SELECT_MANAGER: 'Selecionar Gestor de Projeto',
                SELECT_PROJECT: 'Selecionar Projeto',
                DESCRIPTION: 'Descrição da situação',
                ACTION_TAKEN: 'Descrição da ação tomada',
                RESULT_DESCRIPTION: 'Descrição do resultado',
                CHARS_LEFT: 'caracteres restantes',
                SUBMIT: 'Submeter',
                SAVE_DRAFT: 'Guardar rascunho',
                CANCEL: 'Cancelar',
                CREATE_LL: 'Criação de Lição Aprendida',

                //Create Project
                LL_TITLE: 'Título da Lesson Learned',
                PROJECT_NAME: 'Nome do Projeto',
                PROJECT_MANAGER: 'Project Manager',
                COLABORATORS: 'Colaboradores',
                BUSINESS_SECTOR: 'Setor de Negócio',
                DAYS_LENGTH: 'Duração Projeto',
                PROJECT_TYPE: 'Tipo de Projeto',
                ADD_PROJECT: 'Adicionar Projeto'

            })
            .translations('fr', {
                HOME: 'Début',
                ADMIN_PANEL: 'Administration',
                USERS: 'Utilisateurs',
                LESSONS: 'Les Leçons Apprises',
                STATS: 'Statistiques',
                IN_WAIT: 'En attente d´approbation',
                AUDIT_TRAIL: 'Histoire',
                SETTINGS: 'Réglages',

                LANGUAGE: 'Dialeto',

                EXPORT: 'Exportation',
                EXPORT_TO_PDF: 'Exporter vers un fichier PDF',
                EXPORT_TO_CSV: 'Exporter vers un fichier CSV',
                ADD_USER: 'Ajouter l´utilisateur',

                SELECT: 'Selecionar...',
                CLIENT: 'Cliente',
                SELECT_CLIENT: 'Cliente',
                NONE: 'Nenhum',

                //Pagination buttons
                FIRST: 'Início',
                LAST: 'Fim',
                NEXT: 'Próximo',
                PREVIOUS: 'Anterior',

                //Create LL
                SELECT_TECHS: 'Selecionar Tecnologias',
                SELECT_MANAGER: 'Selecionar Gestor de Projeto',
                SELECT_PROJECT: 'Selecionar Projeto',
                DESCRIPTION: 'Descrição da situação',
                ACTION_TAKEN: 'Descrição da ação tomada',
                RESULT_DESCRIPTION: 'Descrição do resultado',
                CHARS_LEFT: 'caracteres restantes',
                SUBMIT: 'Submeter',
                SAVE_DRAFT: 'Guardar rascunho',
                CANCEL: 'Cancelar',
                CREATE_LL: 'Criação de Lição Aprendida',

                //Create Project
                LL_TITLE: 'Título da Lesson Learned',
                PROJECT_NAME: 'Nome do Projeto',
                PROJECT_MANAGER: 'Project Manager',
                COLABORATORS: 'Colaboradores',
                BUSINESS_SECTOR: 'Setor de Negócio',
                DAYS_LENGTH: 'Duração Projeto',
                PROJECT_TYPE: 'Tipo de Projeto',
                ADD_PROJECT: 'Adicionar Projeto'

            })
        $translateProvider.preferredLanguage('pt');
    }]);

}());
