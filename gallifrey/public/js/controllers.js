/**
 * Created by Andres Monroy (HyveMynd) on 9/21/14.
 */

angular.module('gallifrey').

    controller('homeCtrl', ['$scope', function ($scope) {
        $scope.aVar = "WORKING!"
    }]).

    controller('loginCtrl',
        ['$scope', 'AuthService', function ($scope, AuthService) {
            $scope.login = function () {
                AuthService.login($scope.loginUser);
            }
            $scope.currentUser = AuthService.currentUser();
    }]).

    controller('registrationCtrl',
        ['$scope', 'AuthService', function ($scope, AuthService) {
            $scope.reset = function () {
                $scope.newUser = {};
                $scope.newUser.email = "";
            };
            $scope.register = function () {
                var user = $scope.newUser;
                AuthService.register(user);
            }
    }])
