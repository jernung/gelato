#!/usr/bin/env node

var file = (require('fs'));
var framework = require(process.env.framework + '/package.json');
var project = require(process.env.project + '/package.json');
var path = require(process.env.framework + '/bin/cli-path');
var shell = require('shelljs');

module.exports = {
    brunch: {
        build: function() {
            this.exec(['build']);
        },
        exec: function(commands) {
            commands.unshift(path.brunch);
            shell.cd(path.project);
            shell.exec(commands.join(' '));
        }
    },
    cordova: {
        addAndroid: function() {
            this.exec(['platform', 'remove', 'android']);
            this.exec(['plugin', 'remove', 'cordova-plugin-crosswalk-webview']);
            this.exec(['platform', 'add', 'android']);
            this.exec(['plugin', 'add', 'cordova-plugin-crosswalk-webview']);
        },
        addIos: function() {
            this.exec(['platform', 'remove', 'ios']);
            this.exec(['platform', 'add', 'ios']);
        },
        copy: function() {
            shell.mkdir('-p', path.project + '/cordova/www');
            shell.rm('-rf', path.project + '/cordova/www/*');
            shell.cp('-rf', path.project + '/public/*', path.project + '/cordova/www');
        },
        exec: function(commands) {
            commands.unshift(path.cordova);
            shell.cd(path.project + '/cordova');
            shell.exec(commands.join(' '));
        },
        hasAndroid: function() {
            return file.existsSync(path.project + '/cordova/platforms/android/cordova');
        },
        hasIos: function() {
            return file.existsSync(path.project + '/cordova/platforms/ios/cordova');
        },
        install: function() {
            shell.mkdir('-p', path.project + '/cordova');
            shell.rm('-rf', path.project + '/cordova/*');
            this.exec(['create', '.', project.cordova.id, '"' + project.cordova.name + '"']);
        },
        isInstalled: function() {
            return file.existsSync(path.project + '/cordova/config.xml');
        }
    },
    framework: {
        build: function () {
            shell.cd(path.framework);
            shell.exec([path.brunch, 'build'].join(' '));
        },
        copy: function() {
            shell.mkdir('-p', path.project + '/vendor/gelato');
            shell.rm('-rf', path.project + '/vendor/gelato/*');
            shell.cp('-rf', path.framework + '/public/*', path.project + '/vendor/gelato');
        },
        update: function() {
            this.build();
            this.copy();
        },
        version: framework.version
    },
    mocha: {
        exec: function(commands) {
            commands.unshift(path.mocha);
            shell.cd(path.project);
            shell.exec(commands.join(' '));
        },
        test: function() {
            this.exec(['$(find test -name "**/*.js")']);
        }
    },
    path: path
};
