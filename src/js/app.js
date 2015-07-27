/* App Module */
angular.module('thalamusApp', [
	'ngAnimate',
	'ngRoute'
]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/calendar', {
        templateUrl: 'tmpl/calendar.html'
      }).
      when('/', {
        templateUrl: 'tmpl/main.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
