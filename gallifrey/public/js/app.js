angular.module('gallifrey', ['ngResource', 'ngRoute', 'mgcrea.ngStrap'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home',
                controller: 'homeCtrl'
            }).
            when('/login', {
                templateUrl: 'partials/login',
                controller: 'loginCtrl'
            }).
            when('/register', {
                templateUrl: 'partials/register',
                controller: 'registrationCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
}]);