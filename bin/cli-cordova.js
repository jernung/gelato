#!/usr/bin/env node

var global = require(process.env.framework + '/bin/cli-global');
var project = require(process.env.framework + '/bin/cli-project');
var shell = require('shelljs');

module.exports = {
    /**
     * @method copy
     */
    copy: function() {
        shell.mkdir('-p', global.project + '/cordova/www');
        shell.rm('-rf', global.project + '/cordova/www/*');
        shell.cp('-rf', global.project + '/public/*', global.project + '/cordova/www');
    },
    /**
     * @method exec
     * @param {Array} [commands]
     */
    exec: function(commands) {
        commands = commands || [];
        commands.unshift(global.cordova);
        shell.cd(global.project + '/cordova');
        console.log(commands.join(' '));
        shell.exec(commands.join(' '));
    },
    /**
     * @method install
     */
    install: function() {
        if (!project.pkg.cordova) {
            console.log('Package.json missing cordova object.');
            process.exit(0);
        }
        if (!project.pkg.cordova.id) {
            console.log('Package.json cordova object missing id attribute.');
            process.exit(0);
        }
        if (!project.pkg.cordova.name) {
            console.log('Package.json cordova object missing id attribute.');
            process.exit(0);
        }
        this.uninstall();
        this.exec([
            'create',
            global.project + '/cordova',
            project.pkg.cordova.id,
            '"' + project.pkg.cordova.name + '"'
        ]);
    },
    /**
     * @method isInstalled
     * @returns {Boolean}
     */
    isInstalled: function() {
        return shell.test('-f', global.project + '/cordova/config.xml');
    },
    /**
     * @method uninstall
     */
    uninstall: function() {
        shell.rm('-rf', global.project + '/cordova');
        shell.mkdir('-p', global.project + '/cordova');
    }
};
