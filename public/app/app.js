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
        'isteven-multi-select',
        'angular.filter',
        'ui.checkbox',
        'ngTagsInput'
    ]);

    /**
     * Configure the Routes */

    app.config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when("/", {
				templateUrl: "app/views/login.html",
                controller: "LoginCtrl",
				css: "styles/home.css"
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

            .when("/mylistll", {
                templateUrl: "app/views/mylist_ll.html",
                controller: "mylistllCtrl"
            })

            .when("/create_ll", {
                templateUrl: "app/views/create_ll.html",
                controller: "CreateLLCtrl"
            })

			.when("/view_ll/:id/", {
                templateUrl: "app/views/view_ll.html",
                controller: "ViewLLCtrl"
            })

            .when("/edit_ll/:id/", {
                templateUrl: "app/views/edit_ll.html",
                controller: "EditLLCtrl"
            })

            .when("/list_audit/:id/", {
                templateUrl: "app/views/list_audit.html",
                controller: "AuditListCtrl"
            })

            .when("/view_audit/:id/", {
                templateUrl: "app/views/view_audit.html",
                controller: "AuditCtrl"
            })

            .when("/list_projects", {
                templateUrl: "app/views/list_project.html",
                controller: "ProjectListCtrl"
            })

			.when("/settings",{
                templateUrl: "app/views/settings.html",
                controller: "SetCtrl"
            })
            .when("/statistics",{
                templateUrl: "app/views/statistics.html",
                controller: "StatCtrl"
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
                PROJECTS: 'Projects',

                LANGUAGE: 'Language',

                EXPORT: 'Export',
                EXPORT_TO_PDF: 'Export to PDF file',
                EXPORT_TO_CSV: 'Export to CSV file',
                ADD_USER: 'Add user',

                SELECT: 'Select...',
                SEARCH: 'Search',
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
                ADD_PROJECT: 'Add Project',
                DELIVERING_MODEL: 'Delivering Model',
                STARTING_DATE: 'Start Date',
                EXPECTED_DATE: 'End Date Foreseen',
                CONCLUSION_DATE: 'End Date',
                CREATE_PROJECT: 'Creating Project',

                //Lista LL
                ACTIVE: 'Active',
                INACTIVE: 'Inactive',
                SUBMITTED: 'Pending approval',
                NO_PROJECT: 'No Project',

                //Lista Users
                USER_MANAGEMENT: 'User Management',
                EDITING_USER: 'Edit User information',
                USER_NAME: 'Name',
                PASSWORD: 'Password',
                AGAIN: 'Password again',
                HAS_PERMISSIONS: 'Current permission level',
                CHANGE_TO: 'Change to',
                CONFIRM_CHANGE: 'Change password',
                MODIFY_DATA: 'Modify main data',
                MODIFY_PERMISSIONS: 'Change permissions',
                MODIFY_PASSWORD: 'Change password',
                MODIFY_PROJECTS: 'Add projects',
                MODIFY_CONFIRM: 'Confirm changes',
                TYPE_PASS: 'Type your password',

                //LISTA AUDIT
                CREATION_DATE: 'Creation Date',
                CHANGE_DATE: 'Date of Change',
                CREATOR: 'Creator',
                APPROVER: 'Approver',
                EDITOR: 'Editor',
                TYPE_OF_CHANGE: 'Operation'
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
                PROJECTS: 'Projetos',

                LANGUAGE: 'Dialeto',

                EXPORT: 'Exportar',
                EXPORT_TO_PDF: 'Exportar para ficheiro PDF',
                EXPORT_TO_CSV: 'Exportar para ficheiro CSV',
                ADD_USER: 'Adicionar utilizador',

                SELECT: 'Selecionar...',
                SEARCH: 'Pesquisar',
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
                ADD_PROJECT: 'Adicionar Projeto',
                DELIVERING_MODEL: 'Modelo de Entrega',
                STARTING_DATE: 'Data de Início',
                EXPECTED_DATE: 'Data de Fim previsto',
                CONCLUSION_DATE: 'Data de Conclusão',
                CREATE_PROJECT: 'Criar Projecto',

                //Lista LL
                ACTIVE: 'Ativas',
                INACTIVE: 'Inativas',
                SUBMITTED: 'Aprovação pendente',
                NO_PROJECT: 'Sem Projecto',

                //Lista Users
                USER_MANAGEMENT: 'Gestão de utilizadores',
                EDITING_USER: 'Editar utilizador',
                USER_NAME: 'Nome',
                PASSWORD: 'Password',
                AGAIN: 'Repetir password',
                HAS_PERMISSIONS: 'Nível de permissão atual',
                CHANGE_TO: 'Mudar para',
                CONFIRM_CHANGE: 'Alterar password',
                MODIFY_DATA: 'Modificar dados principais',
                MODIFY_PERMISSIONS: 'Alterar permissões',
                MODIFY_PASSWORD: 'Alterar a password',
                MODIFY_PROJECTS: 'Associar projetos',
                MODIFY_CONFIRM: 'Confirmar alterações',
                TYPE_PASS: 'Digite a sua password',

                //LISTA AUDIT
                CREATION_DATE: 'Data de Criação',
                CHANGE_DATE: 'Data de edição',
                CREATOR: 'Criador',
                APPROVER: 'Approver',
                EDITOR: 'Editor',
                TYPE_OF_CHANGE: 'Operação'

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
                PROJECTS: 'Projects',

                LANGUAGE: 'Dialeto',

                EXPORT: 'Exportation',
                EXPORT_TO_PDF: 'Exporter vers un fichier PDF',
                EXPORT_TO_CSV: 'Exporter vers un fichier CSV',
                ADD_USER: 'Ajouter l´utilisateur',

                SELECT: 'Selecionar...',
                SEARCH: 'Pesquisar',
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
                ADD_PROJECT: 'Adicionar Projeto',
                DELIVERING_MODEL: 'Delivering Model',
                STARTING_DATE: 'Date de début',
                EXPECTED_DATE: 'Date de fin prévue',
                CONCLUSION_DATE: 'Date de fin',
                CREATE_PROJECT: 'Créer un projet',

                //Lista LL
                ACTIVE: 'Actif',
                INACTIVE: 'Négligé',
                SUBMITTED: 'Validation en attente',
                NO_PROJECT: 'No Project',

                //Lista Users
                USER_MANAGEMENT: 'Gestion des utilisateurs',
                EDITING_USER: 'Modifier l\'utilisateur',
                USER_NAME: 'Nom',
                PASSWORD: 'Mot de pass',
                AGAIN: 'Mot de pass à nouveau',
                HAS_PERMISSIONS: 'Niveau d\'autorisation actuel',
                CHANGE_TO: 'Confirmer le changement',
                CONFIRM_CHANGE: 'Modifier le mot de passe',
                MODIFY_DATA: 'Modifier les données clés',
                MODIFY_PERMISSIONS: 'Modifier les autorisationss',
                MODIFY_PASSWORD: 'Modifier mot de passe',
                MODIFY_PROJECTS: 'Ajouter des projets',
                MODIFY_CONFIRM: 'Confirmer les modifications',
                TYPE_PASS: 'Tapez votre mot de passe',

                //LISTA AUDIT
                CREATION_DATE: 'Creation Date',
                CHANGE_DATE: 'Date of Change',
                CREATOR: 'Creator',
                APPROVER: 'Approver',
                EDITOR: 'Editor',
                TYPE_OF_CHANGE: 'Operation'
            })
        $translateProvider.preferredLanguage('pt');
    }]);


	app.directive('head', ['$rootScope','$compile',
		function($rootScope, $compile){
			return {
				restrict: 'E',
				link: function(scope, elem){
					var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
					elem.append($compile(html)(scope));
					scope.routeStyles = {};
					$rootScope.$on('$routeChangeStart', function (e, next, current) {
						if(current && current.$$route && current.$$route.css){
							if(!angular.isArray(current.$$route.css)){
								current.$$route.css = [current.$$route.css];
							}
							angular.forEach(current.$$route.css, function(sheet){
								delete scope.routeStyles[sheet];
							});
						}
						if(next && next.$$route && next.$$route.css){
							if(!angular.isArray(next.$$route.css)){
								next.$$route.css = [next.$$route.css];
							}
							angular.forEach(next.$$route.css, function(sheet){
								scope.routeStyles[sheet] = sheet;
							});
						}
					});
				}
			};
		}
	]);

}());
