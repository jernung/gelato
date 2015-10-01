#!/usr/bin/env node

var global = require(process.env.framework + '/bin/cli-global');
var shell = require('shelljs');

module.exports = {
    /**
     * @property pkg
     * @type {Object}
     */
    pkg: require(global.framework + '/package.json'),
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
     * @method copy
     */
    copy: function() {
        shell.mkdir('-p', global.project + '/vendor/gelato');
        shell.rm('-rf', global.project + '/vendor/gelato/*');
        shell.cp('-rf', global.framework + '/public/*', global.project + '/vendor/gelato');
    },
    /**
     * @method exec
     * @param {Array} [commands]
     */
    exec: function(commands) {
        commands = commands || [];
        commands.unshift(global.brunch);
        shell.cd(global.framework);
        shell.exec(commands.join(' '));
    },
    /**
     * @method update
     * @param {Array} [arguments]
     */
    update: function(arguments) {
        this.build(arguments);
        this.copy();
    }
};
