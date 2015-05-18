"use strict";

// Hack needed for https://github.com/thlorenz/browserify-shim/issues/49
window.__browserify_shim_require__ = require;

require('angular');
require('angular-mocks');
require('../../app/nav');

describe('controllers', () => {
    describe('SidebarController', () => {
        it("is ignored at the moment", () => {

        });
        /*
        beforeEach(angular.mock.module('blogular.nav', $provide => {
            // Set up a mock postService which just returns locals posts
            $provide.service('postService', $q => {
                var self = {
                    posts: [],
                    loadPosts() {
                        var deferred = $q.defer();
                        deferred.resolve(self.posts);
                        return deferred.promise;
                    }
                };
                return self;
            });
        }));

        it("loads posts on startup", inject(($controller, $rootScope, postService) => {
            var posts = [{title: 'foo'}, {title: 'bar'}];

            var scope = $rootScope.$new();
            postService.posts = posts;
            $controller('SidebarController', { $scope: scope });
            $rootScope.$apply();

            expect(scope.sidebar.posts).toEqual(posts);
        }));

        it("listens for changes in posts", inject(($controller, $rootScope, postService) => {
            var posts = [{title: 'foo'}, {title: 'bar'}];

            var scope = $rootScope.$new();

            $controller('SidebarController', { $scope: scope });
            $rootScope.$apply();

            expect(scope.sidebar.posts).toEqual([]);

            postService.posts = posts;
            scope.$broadcast('postsChanged');
            $rootScope.$apply();

            expect(scope.sidebar.posts).toEqual(posts);
        }));
        */
    });
});
