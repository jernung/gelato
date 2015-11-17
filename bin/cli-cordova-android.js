#!/usr/bin/env node

var cordova = require(process.env.framework + '/bin/cli-cordova');
var global = require(process.env.framework + '/bin/cli-global');
var shell = require('shelljs');

module.exports = {
    /**
     * @method build
     */
    build: function() {
        if (this.isInstalled()) {
            cordova.copy();
            cordova.exec(['build', 'android']);
        } else {
            console.log('Cordova platform Android is not installed.');
            process.exit(0);
        }
    },
    /**
     * @method copy
     */
    copy: function() {
        shell.cp('-rf', global.project + '/app/cordova/config.xml', global.project + '/cordova');
    },
    /**
     * @method install
     */
    install: function() {
        cordova.exec(['platform', 'remove', 'android']);
        cordova.exec(['platform', 'add', 'android']);
        cordova.exec(['plugin', 'remove', 'cordova-plugin-crosswalk-webview']);
        cordova.exec(['plugin', 'add', 'cordova-plugin-crosswalk-webview']);
        this.build();
    },
    /**
     * @method isInstalled
     * @returns {Boolean}
     */
    isInstalled: function() {
        return shell.test('-d', global.project + '/cordova/platforms/android/cordova');
    },
    /**
     * @method run
     */
    run: function() {
        if (this.isInstalled()) {
            this.copy();
            cordova.copy();
            cordova.exec(['run', 'android']);
        } else {
            console.log('Cordova platform Android is not installed.');
            process.exit(0);
        }
    }
};
