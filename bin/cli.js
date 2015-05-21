#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var globals = require('./globals.js');
var fs = require('fs');
var shell = require('shelljs');

/**
 * OPTION: VERSION
 */
if (argv.version) {
    console.log(globals.framework.pkg.version);
    process.exit(0);
}

/**
 * CHECK REQUIREMENT: GRUNT
 */
if (shell.exec('grunt --version', {silent: true}).code !== 0) {
    console.log('Grunt must be installed (http://gruntjs.com).');
    process.exit(1);
}

/**
 * CHECK REQUIREMENT: SASS
 */
if (shell.exec('sass --version', {silent: true}).code !== 0) {
    console.log('Sass must be installed (http://sass-lang.com).');
    process.exit(1);
}

/**
 * CHECK REQUIREMENT: CORDOVA
 */
if (shell.exec('cordova --version', {silent: true}).code !== 0) {
    console.log('Cordova must be installed (https://cordova.apache.org).');
    process.exit(1);
}

/**
 * BUILD
 */
if (argv['_'][0] === 'build') {
    if (globals.project.pkg.type === 'gelato') {
        var cmd = [];
        switch (argv['_'][1]) {
            case 'android':
                cmd.push('grunt build-android');
                break;
            default:
                cmd.push('grunt build-www');
        }
        if (argv.noclean) {
            cmd.push('--noclean=true');
        }
        if (argv.novalidate) {
            cmd.push('--novalidate=true');
        }
        shell.exec(cmd.join(' '));
        process.exit(0);
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
            process.exit(0);
        }
    } else {
        console.log('Project name is required.');
        process.exit(1);
    }
}

/**
 * DOCS
 */
if (argv['_'][0] === 'docs') {
    if (globals.project.pkg.type === 'gelato') {
        shell.exec('grunt docs');
        process.exit(0);
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}

/**
 * INSTALL
 */
if (argv['_'][0] === 'install') {
    if (globals.project.pkg.type === 'gelato') {
        var cmd = [];
        switch (argv['_'][1]) {
            case 'cordova':
                cmd.push('grunt install-cordova');
                break;
            default:
                console.log('Select installation target (cordova).');
                process.exit(1);
                break;
        }
        shell.exec(cmd.join(' '));
        process.exit(0);
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}

/**
 * RELEASE
 */
if (argv['_'][0] === 'release') {
    if (globals.project.pkg.type === 'gelato') {
        var cmd = [];
        switch (argv['_'][1]) {
            case 'android':
                cmd.push('grunt release-android');
                break;
            default:
                console.log('Select release platform (android).');
                process.exit(1);
                break;
        }
        shell.exec(cmd.join(' '));
        process.exit(0);
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}

/**
 * RUN
 */
if (argv['_'][0] === 'run') {
    if (globals.project.pkg.type === 'gelato') {
        var cmd = [];
        switch (argv['_'][1]) {
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
        process.exit(0);
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
        process.exit(0);
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}

/**
 * VALIDATE
 */
if (argv['_'][0] === 'validate') {
    if (globals.project.pkg.type === 'gelato') {
        shell.exec('grunt validate-www');
        process.exit(0);
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
        var cmd = ['grunt watch-project'];
        cmd.push('--noclean=true');
        cmd.push('--novalidate=true');
        shell.exec(cmd.join(' '));
    } else {
        console.log('Not a valid gelato project directory.');
        process.exit(1);
    }
}

console.log("If you don't eat your meat, you can't have any pudding!");
process.exit(0);