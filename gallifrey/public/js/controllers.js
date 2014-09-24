/**
 * Created by Andres Monroy (HyveMynd) on 9/21/14.
 */

var app = angular.module('gallifrey');

app.controller('homeCtrl', ['$scope', function ($scope) {
    $scope.aVar = "WORKING!"
}]);

app.controller('loginCtrl',
    ['$scope', 'AuthService', function ($scope, AuthService) {
        $scope.login = function () {
            AuthService.login($scope.loginUser);
        }
        $scope.currentUser = AuthService.currentUser();
}]);

app.controller('registrationCtrl',
    ['$scope', 'AuthService', function ($scope, AuthService) {
        $scope.reset = function () {
            $scope.newUser = {};
            $scope.newUser.email = "";
        };
        $scope.register = function () {
            var user = $scope.newUser;
            AuthService.register(user);
        }
}]);

app.controller('navbarCtrl',
['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.currentUser = AuthService.currentUser;
}]);
