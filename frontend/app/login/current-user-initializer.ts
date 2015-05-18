function currentUserInitializer($rootScope) {
    // If we have already logged in, use the credentials from local-storage.
    if (localStorage['currentUser.name']) {
        $rootScope.currentUser = {
            name: localStorage['currentUser.name'],
            authToken: localStorage['currentUser.authToken']
        };
    } else {
        $rootScope.currentUser = null;
    }
}

currentUserInitializer.$inject = ['$rootScope'];

export = currentUserInitializer;
