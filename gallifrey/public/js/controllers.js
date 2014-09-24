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
                $location.path('/hours');
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
                $location.path('/hours');
            })
        }
}]);

app.controller('NavbarCtrl',
['$scope', 'AuthService', '$location', function ($scope, AuthService, $location) {
    $scope.logout = function () {
        AuthService.logout().then(function () {
            $scope.setCurrentUser(null);
            $location.path('/');
        });
    };

    $scope.homeClick = function () {
        if (AuthService.isAuthenticated()){
            $location.path('/hours')
        } else {
            $location.path('/');
        }
    };
}]);

app.controller('ProfileCtrl', [function () {

}]);
