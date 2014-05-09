"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('LoginController', ['$scope', '$modal', '$location', 'loginService', ($scope, $modal, $location, loginService) => {

    $scope.login = () => {
        $modal.open({
            templateUrl: '/templates/dialogs/login.html',
            controller: ['$scope', '$modalInstance', ($scope, $modalInstance) => {
                $scope.loggingIn = false;
                $scope.loginFailed = false;
                var form = $scope.form = {
                    username: '',
                    password: ''
                };

                $scope.login = () => {
                    $scope.loggingIn = true;
                    $scope.loginFailed = false;
                    loginService.login(form.username, form.password).then(() => {
                        $modalInstance.close();
                    }).catch(() => {
                        $scope.loggingIn = false;
                        $scope.loginFailed = true;
                    });
                };
            }]
        });
    };

    $scope.logout = () => {
        loginService.logout().then(() => {
            $location.path('/');
        });
    };
}]);
