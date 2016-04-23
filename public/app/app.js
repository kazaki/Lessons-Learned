

var app = angular.module('lessonslearned', ['ngRoute', 'ngCookies', 'ngAnimate', 'ui.bootstrap']);

/**
 * Configure the Routes
 */

app.config(['$routeProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    // Home
    .when("/", {
      templateUrl: "views/home.html",
      controller: "PageCtrl"})
    // Pages
    .when("/about", {
      templateUrl: "views/about.html", 
      controller: "PageCtrl"})

    .when("/faq", {
      templateUrl: "views/faq.html",
      controller: "PageCtrl"})

    .when("/pricing", {
      templateUrl: "views/pricing.html",
      controller: "PageCtrl"})

    .when("/services", {
      templateUrl: "views/services.html", 
      controller: "PageCtrl"})

    .when("/contact", {
      templateUrl: "views/contact.html", 
      controller: "PageCtrl"})
    // Blog
    .when("/blog", {
      templateUrl: "views/blog.html", 
      controller: "BlogCtrl"})

    .when("/blog/post", {
      templateUrl: "views/blog_item.html", 
      controller: "BlogCtrl"})

    // else 404
    .otherwise("/404", {
      templateUrl: "views/404.html", 
      controller: "PageCtrl"});

     $locationProvider.html5Mode(true);

}]);