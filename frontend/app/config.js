"use strict";

// This file contains all the things that can be configured using build time.
// We use envify to replace values of form 'process.env.FOO' by constants.
module.exports = {
    apiBase: process.env.API_BASE,
    useTemplateCache: process.env.staticBundle,
    debugLogging: !process.env.staticBundle
};
