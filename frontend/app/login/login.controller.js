"use strict";

var controllers = require('angular').module('blogular.login');

controllers.controller('LoginController', ['$modal', '$location', 'loginService', function ($modal, $location, loginService) {

    var self = this;

    self.login = () => {
        $modal.open({
            templateUrl: '/login/login-modal.html',
            controllerAs: 'loginModalCtrl',
            controller: ['$modalInstance', function ($modalInstance) {
                var modalCtrl = this;

                modalCtrl.loggingIn = false;
                modalCtrl.loginFailed = false;
                modalCtrl.form = {
                    username: '',
                    password: ''
                };

                modalCtrl.login = () => {
                    modalCtrl.loggingIn = true;
                    modalCtrl.loginFailed = false;
                    loginService.login(modalCtrl.form.username, modalCtrl.form.password).then(() => {
                        $modalInstance.close();
                    }).catch(() => {
                        modalCtrl.loggingIn = false;
                        modalCtrl.loginFailed = true;
                    });
                };
            }]
        });
    };

    self.logout = () => {
        loginService.logout().then(() => {
            $location.path('/');
        });
    };
}]);
