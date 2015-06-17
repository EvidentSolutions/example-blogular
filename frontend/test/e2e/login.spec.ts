/// <reference path="e2e.d.ts" />

class FrontPage {
    loginLink = element(by.css('.account .login'));
    currentUserName = element(by.binding('currentUser.name'));

    get() {
        browser.get('/');
    }

    openLoginDialog() {
        this.loginLink.click();
    }
}

class LoginDialog {
    usernameInput = element(by.model('loginModalCtrl.form.username'));
    passwordInput = element(by.model('loginModalCtrl.form.password'));
    loginButton = element(by.css('.modal-dialog .btn-primary'));
    alert = element(by.css('.alert-warning'));

    setCredentials(username: string, password: string) {
        this.usernameInput.sendKeys(username);
        this.passwordInput.sendKeys(password);
    }

    login() {
        this.loginButton.click();
    }
}

describe('login', () => {
    let frontPage = new FrontPage();
    let loginDialog = new LoginDialog();

    beforeEach(() => {
        frontPage.get();
        frontPage.openLoginDialog();
    });

    it('bad credentials', () => {
        loginDialog.setCredentials('user', 'invalid');
        loginDialog.login();

        expect(loginDialog.alert.isPresent()).toEqual(true);
        expect(loginDialog.alert.getText()).toEqual('Invalid username or password.');
    });


    it('successful login', () => {
        loginDialog.setCredentials('user', 'password');
        loginDialog.login();

        expect(loginDialog.alert.isPresent()).toEqual(false);
        expect(frontPage.currentUserName.getText()).toEqual('user');
    });
});
