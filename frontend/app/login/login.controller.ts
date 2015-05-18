import LoginService = require('./login.service');

class LoginController {

    //noinspection JSUnusedGlobalSymbols
    static $inject = ['$modal', '$location', 'loginService'];

    constructor(private $modal: ng.ui.bootstrap.IModalService,
                private $location: ng.ILocationService,
                private loginService: LoginService) {
    }

    login() {
        var loginService = this.loginService;

        this.$modal.open({
            templateUrl: '/login/login-modal.html',
            controllerAs: 'loginModalCtrl',
            controller: ['$modalInstance', function ($modalInstance:ng.ui.bootstrap.IModalServiceInstance) {
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
    }

    logout() {
        this.loginService.logout().then(() => {
            this.$location.path('/');
        })
    }
}

export = LoginController;
