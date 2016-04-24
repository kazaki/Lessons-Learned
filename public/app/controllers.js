
/**
* Create the module and call the requires
*/
angular.module('lessonslearned.controllers', ['lessonslearned.services'])

/**
 * Controls the Blog
 */
.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
})

/**
 * Controls all other Pages
 */
.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});