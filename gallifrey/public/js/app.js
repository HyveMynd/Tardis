$.backstretch([
    "images/moon.png",
    "images/earth.png",
    "images/galaxy.png",
    "images/shuttle.png",
    "images/moon_walk.png"
], {fade: "slow"});

angular.module('gallifrey', ['ngResource', 'ngRoute', 'mgcrea.ngStrap'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home',
                controller: 'LoginCtrl'
            }).
            when('/about', {
                templateUrl: 'partials/about'
            }).
            when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            }).
            when('/register', {
                templateUrl: 'partials/register',
                controller: 'RegistrationCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
}]);