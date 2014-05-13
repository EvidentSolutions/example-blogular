"use strict";

var FrontPage = function() {
    this.loginLink = element(by.css('.account .login'));
    this.currentUserName = element(by.binding('currentUser.name'));

    this.get = function() {
        browser.get('/');
    };

    this.openLoginDialog = function() {
        this.loginLink.click();
    };
};

var LoginDialog = function() {
    this.usernameInput = element(by.model('form.username'));
    this.passwordInput = element(by.model('form.password'));
    this.loginButton = element(by.css('.modal-dialog .btn-primary'));
    this.alert = element(by.css('.alert-warning'));

    this.setCredentials = function(username, password) {
        this.usernameInput.sendKeys(username);
        this.passwordInput.sendKeys(password);
    };

    this.login = function() {
        this.loginButton.click();
    };
};

describe('login', function () {
    var frontPage = new FrontPage();
    var loginDialog = new LoginDialog();

    beforeEach(function () {
        frontPage.get();
        frontPage.openLoginDialog();
    });

    it('bad credentials', function () {
        loginDialog.setCredentials('user', 'invalid');
        loginDialog.login();

        expect(loginDialog.alert.isPresent()).toEqual(true);
        expect(loginDialog.alert.getText()).toEqual('Invalid username or password.');
    });


    it('successful login', function () {
        loginDialog.setCredentials('user', 'password');
        loginDialog.login();

        expect(loginDialog.alert.isPresent()).toEqual(false);
        expect(frontPage.currentUserName.getText()).toEqual('user');
    });
});
