/// <reference path="../typings/tsd.d.ts" />

declare function require(name: string): any;

interface Window {
    jQuery: JQueryStatic;
    _: _.LoDashStatic;
}

declare module Blogular {

    interface IUserInfo {
        name: string
        authToken: string
    }

    interface IPostInfo {
        slug?: string
        title: string
        body: string
    }

    interface IBlogularRootScope extends ng.IRootScopeService {
        currentUser: IUserInfo
    }
}
