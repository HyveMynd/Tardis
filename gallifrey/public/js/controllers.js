/**
 * Created by Andres Monroy (HyveMynd) on 9/21/14.
 */

var app = angular.module('gallifrey');

app.controller('AppCtrl', ['Session', '$scope', function (Session, $scope) {

    if (Session.user){
        $scope.currentUser = Session.user;
    } else {
        $scope.currentUser = null;
    }

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

}]);

app.controller('LoginCtrl',
    ['$scope', 'AuthService', '$location', function ($scope, AuthService, $location) {
        $scope.login = function () {
            AuthService.login($scope.loginUser).then(function (user) {
                $scope.setCurrentUser(user);
                $location.path('/');
            })
        };
}]);

app.controller('RegistrationCtrl',
    ['$scope', 'AuthService', '$location', function ($scope, AuthService, $location) {
        $scope.reset = function () {
            $scope.newUser = {};
            $scope.newUser.email = "";
        };
        $scope.register = function () {
            AuthService.register($scope.newUser).then(function (user) {
                $scope.setCurrentUser(user);
                $location.path('/');
            })
        }
}]);

app.controller('NavbarCtrl',
['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.logout = function () {
        AuthService.logout().then(function () {
            $scope.setCurrentUser(null);
        });
    };
}]);
