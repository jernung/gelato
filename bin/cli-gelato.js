#!/usr/bin/env node

var path = require(process.env.framework + '/bin/cli-path');
var shell = require('shelljs');

module.exports = {
    brunch: function(commands) {
        commands.unshift(path.brunch);
        shell.exec(commands.join(' '));
    },
    framework: {
        build: function () {
            shell.cd(path.framework);
            shell.exec([path.brunch, 'build'].join(' '));
        },
        update: function() {
            shell.cd(path.framework);
            shell.mkdir('-p', path.project + '/vendor/gelato');
            shell.rm('-rf', path.project + '/vendor/gelato/*');
            shell.cp('-rf', path.framework + '/public/*', path.project + '/vendor/gelato');
        }
    },
    path: path
};
