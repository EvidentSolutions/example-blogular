// Adds a HTTP interceptor that adds auth-token to every request
function AuthTokenInterceptor($httpProvider: ng.IHttpProvider) {
    $httpProvider.interceptors.push(['$rootScope', ($rootScope: Blogular.IBlogularRootScope) => {
        return {
            request(config: ng.IHttpProviderDefaults) {
                if ($rootScope.currentUser)
                    config.headers['Authorization'] = $rootScope.currentUser.authToken;
                return config;
            }
        };
    }]);
}

AuthTokenInterceptor.$inject = ['$httpProvider'];

export = AuthTokenInterceptor;
