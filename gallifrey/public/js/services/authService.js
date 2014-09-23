/**
 * Created by Andres Monroy (HyveMynd) on 9/22/14.
 */
angular.module('gallifrey'). factory('AuthService',
    ['$http', 'ToasterService', '$location', '$window', function ($http, ToasterService, $location, $window) {
        var currentUser = null;

        function login(user){
            $http.post('/auth/login', user).
                success(function (data) {
                    currentUser = data;
                    $window.sessionStorage['currentUser'] = JSON.stringify(data);
                    ToasterService.notify('Welcome!');
                }).
                error(function (data) {
                    ToasterService.error(data.message);
                });
        }

        function logout() {
            $window.sessionStorage['currentUser'] = null;
        }

        function register(user) {
            $http.post('/auth/register', user).
                success(function (data) {
                    currentUser = data;
                    $window.sessionStorage['currentUser'] = JSON.stringify(data);
                    ToasterService.notify('Welcome!');
                    $location.path('/');
                }).
                error(function (data) {
                    ToasterService.error(data.message);
                });
        }

        function getCurrentUser(){
            return currentUser;
        }

        function init() {
            if ($window.sessionStorage["currentUser"]) {
                currentUser = JSON.parse($window.sessionStorage["currentUser"]);
            }
        }
        init();

        return {
            login: login,
            logout: logout,
            register: register,
            isLoggedIn: function () { return currentUser !== null; },
            currentUser: getCurrentUser
        }
    }]);