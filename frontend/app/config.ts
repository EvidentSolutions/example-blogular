interface Config {
    debugLogging: boolean
}

var config: Config = require('./config-internal');
export = config;

