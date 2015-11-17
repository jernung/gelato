#!/usr/bin/env node

var global = require(process.env.framework + '/bin/cli-global');
var shell = require('shelljs');

module.exports = {
    /**
     * @property pkg
     * @type {Object}
     */
    pkg: require(global.project + '/package.json'),
    /**
     * @method build
     * @param {Array} [arguments]
     */
    build: function(arguments) {
        var commands = ['build'];
        if (arguments.production) {
            commands.push('--production');
        }
        this.exec(commands);
    },
    /**
     * @method exec
     * @param {Array} [commands]
     */
    exec: function(commands) {
        commands = commands || [];
        commands.unshift(global.brunch);
        shell.cd(global.project);
        shell.exec(commands.join(' '));
    },
    /**
     * @method watch
     * @param {Array} [arguments]
     */
    watch: function(arguments) {
        var commands = ['watch'];
        if (arguments.server) {
            commands.push('--server');
        }
        this.exec(commands);
    }
};
