"use strict";

// This file contains all the things that can be configured using build time.
// We use envify to replace values of form 'process.env.FOO' by constants.
module.exports = {
    debugLogging: !process.env.staticBundle
};
