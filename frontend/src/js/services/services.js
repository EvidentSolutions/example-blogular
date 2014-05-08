"use strict";

var services = require('angular').module('blogular.services', []);

require('./messaging-service');
require('./post-service');

module.exports = services;
