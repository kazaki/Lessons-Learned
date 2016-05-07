(function (){

  'use strict';
/**
* Create the module and call the requires
*/
var app = angular.module('lessonslearned', ['ngRoute', 'ngCookies']);

/**
 * Configure the Routes */

app.config(function ($routeProvider,$locationProvider) {
  
  $routeProvider
    .when("/", {
      templateUrl: "app/views/home.html",
      controller: "PageCtrl"})
      
    .when("/user_management", {
      templateUrl: "app/views/user_management.html",
      controller: "PageCtrl"})
      
    .otherwise({
     redirectTo: '404'});
      
   // Enabling HTML5 mode so that the URL doesn't show up with hashtags
    $locationProvider.html5Mode(true);

});

}());