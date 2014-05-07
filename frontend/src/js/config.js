"use strict";

var process = require('process');

// The environment references here will be replaced at build time by envify.
module.exports = {
    apiBase: process.env.API_BASE,
    useTemplateCache: process.env.USE_TEMPLATE_CACHE
};
