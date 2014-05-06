"use strict";

var process = require('process');

// This will be replaced at build time by envify
var apiBase = process.env.API_BASE;

module.exports = {
    apiBase: apiBase
};
