(function (){
/**
* Create the module and call the requires
*/
var app = angular.module('lessonslearned', ['ngRoute', 'ngCookies', 'ngAnimate', 'ui.bootstrap']);

/**
 * Configure the Routes */

app.config( function ($routeProvider,$locationProvider) {
  
  $routeProvider
    // Home
    .when("/", {
      templateUrl: "app/views/home.html",
      controller: "PageCtrl"})
 

    // else 404
    .otherwise({
     redirectTo: '/'});
      
   // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        $locationProvider.html5Mode(true);

});

}());