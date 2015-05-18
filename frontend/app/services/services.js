"use strict";

var services = require('angular').module('blogular.services', []);

require('./messaging-service');
require('./post-service');
require('./login-service');

module.exports = services;
