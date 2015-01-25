#!/usr/bin/env node

console.log('starting cli');

var argv = require('minimist')(process.argv.slice(2));
var globals = require('./globals.js');
var fs = require('fs');
var shell = require('shelljs');

/**
 * BUILD
 */
if (argv['_'][0] === 'build') {
    if (globals.project.pkg.type === 'gelato') {
        shell.exec('grunt build-project');
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}

/**
 * CREATE
 */
if (argv['_'][0] === 'create') {
    if (argv['_'][1]) {
        if (fs.existsSync(globals.project.path + '/' + argv['_'][1])) {
            console.log('Project directory already exists.');
            process.exit(1);
        } else {
            shell.exec('grunt create-project --name=' + argv['_'][1]);
        }
    } else {
        console.log('Project name is required.');
        process.exit(1);
    }
}

/**
 * RUN
 */
if (argv['_'][0] === 'run') {
    if (globals.project.pkg.type === 'gelato') {
        var cmd = [];
        switch (argv['_'][0]) {
            case 'android':
                cmd.push('grunt run-android');
                break;
            case 'web':
                cmd.push('grunt run-web');
                break;
            default:
                cmd.push('grunt run-web');
        }
        if (argv.appname) {
            cmd.push('--appname=' + argv.appname);
        }
        if (argv.hostname) {
            cmd.push('--hostname=' + argv.hostname);
        }
        if (argv.port) {
            cmd.push('--port=' + argv.port);
        }
        if (argv.protocol) {
            cmd.push('--protocol=' + argv.protocol);
        }
        shell.exec(cmd.join(' '));
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}

/**
 * UPDATE
 */
if (argv['_'][0] === 'update') {
    if (globals.project.pkg.type === 'gelato') {
        shell.exec('grunt install-gelato');
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}

/**
 * WATCH
 */
if (argv['_'][0] === 'watch') {
    if (globals.project.pkg.type === 'gelato') {
        shell.exec('grunt watch-project');
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}