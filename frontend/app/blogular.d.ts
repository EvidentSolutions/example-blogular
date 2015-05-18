/// <reference path="../typings/tsd.d.ts" />

declare function require(name: string): any;

interface Window {
    jQuery: JQueryStatic;
    _: _.LoDashStatic;
}

declare module Blogular {

    interface IBlogularRootScope extends ng.IRootScopeService {
        currentUser: any
    }
}
