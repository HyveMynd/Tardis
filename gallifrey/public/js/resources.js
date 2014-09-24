/**
 * Created by Andres Monroy (HyveMynd) on 9/22/14.
 */


var app = angular.module('gallifrey');

app.value('Toastr', toastr);

app.factory('ToasterService', ['Toastr', function (Toastr) {
    var toastrOptions = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    return {
        notify: function (msg) {
            Toastr.options = toastrOptions;
            Toastr.success(msg);
        },
        error: function (msg) {
            Toastr.error(msg);
        }
    }
}]);

app.factory('AuthService',
    ['$http', 'ToasterService', '$location', '$window', '$q', function ($http, ToasterService, $location, $window, $q) {
        var currentUser = null;
        var userDefer = $q.defer();

        function login(user){
            $http.post('/auth/login', user).
                success(function (data) {
                    currentUser = data;
                    $window.sessionStorage['currentUser'] = JSON.stringify(data);
                    ToasterService.notify('Welcome!');
                    $location.path('/');
                    userDefer.resolve(currentUser);
                }).
                error(function (data) {
                    ToasterService.error(data.message);
                });
        }

        function logout() {
            $http.post('auth/logout').
                success(function () {
                    ToasterService.notify("Logged Out");
                    $window.sessionStorage['currentUser'] = null;
                    currentUser = null;
                    $location.path('/');
                }).
                error(function (data) {
                    ToasterService.error(data);
                });
        }

        function register(user) {
            $http.post('/auth/register', user).
                success(function (data) {
                    currentUser = data;
                    $window.sessionStorage['currentUser'] = JSON.stringify(data);
                    ToasterService.notify('Welcome!');
                    $location.path('/');
                    userDefer.resolve(data);
                }).
                error(function (data) {
                    ToasterService.error(data.message);
                });
        }

        function getCurrentUser(){
            return userDefer.promise;
        }

        function isLoggedIn(){
            return currentUser !== null;
        }

        function init() {
            if ($window.sessionStorage["currentUser"]) {
                currentUser = JSON.parse($window.sessionStorage["currentUser"]);
                if (currentUser !== null){
                    userDefer.resolve(currentUser);
                }
            }
        }
        init();

        return {
            login: login,
            logout: logout,
            register: register,
            isLoggedIn: isLoggedIn,
            getCurrentUser: getCurrentUser
        }
}]);