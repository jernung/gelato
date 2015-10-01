#!/usr/bin/env node

process.env.framework = __dirname.toString().slice(0, -4);
process.env.project = process.cwd().toString();

var lodash = require('lodash');
var minimist = require('minimist');

var cordova = require(process.env.framework + '/bin/cli-cordova');
var cordovaAndroid = require(process.env.framework + '/bin/cli-cordova-android');
var cordovaIos = require(process.env.framework + '/bin/cli-cordova-ios');
var framework = require(process.env.framework + '/bin/cli-framework');
var project = require(process.env.framework + '/bin/cli-project');

var arguments = lodash.omit(minimist(process.argv.slice(2)), '_') || {};
var commands = minimist(process.argv.slice(2))['_'] || [];

if (arguments.version) {
    console.log(framework.pkg.version);
    process.exit(1);
}

if (!project.pkg) {
    console.log("Package.json is missing.");
    process.exit(0);
}

if (project.pkg.framework !== 'gelato') {
    console.log("Package.json not a gelato project.");
    process.exit(0);
}

if (['android'].indexOf(commands[0]) > -1) {
    if (!cordova.isInstalled()) {
        console.log("Cordova is not installed.");
        process.exit(0);
    }
    switch (commands[1]) {
        case 'build':
            framework.update(arguments);
            project.build(arguments);
            cordovaAndroid.build();
            process.exit(1);
            break;
        case 'install':
            cordovaAndroid.install();
            process.exit(1);
            break;
        case 'run':
            framework.update(arguments);
            project.build(arguments);
            cordovaAndroid.run();
            process.exit(1);
            break;
        default:
            console.log("gelato cordova android (build|install|run) [--production]");
            process.exit(0);
    }
}

if (['cordova'].indexOf(commands[0]) > -1) {
    switch (commands[1]) {
        case 'install':
            cordova.install();
            process.exit(1);
            break;
        case 'uninstall':
            cordova.uninstall();
            process.exit(1);
            break;
        default:
            console.log("gelato cordova (install|uninstall)");
            process.exit(0);
    }
}

if (['ios'].indexOf(commands[0]) > -1) {
    if (!cordova.isInstalled()) {
        console.log("Cordova is not installed.");
        process.exit(0);
    }
    switch (commands[1]) {
        case 'build':
            framework.update(arguments);
            project.build(arguments);
            cordovaIos.build();
            process.exit(1);
            break;
        case 'install':
            cordovaIos.install();
            process.exit(1);
            break;
        case 'run':
            framework.update(arguments);
            project.build(arguments);
            cordovaIos.run();
            process.exit(1);
            break;
        default:
            console.log("gelato cordova ios (build|install|run) [--production]");
            process.exit(0);
    }
}

if (['web'].indexOf(commands[0]) > -1) {
    switch (commands[1]) {
        case 'build':
            framework.update(arguments);
            project.build(arguments);
            process.exit(1);
            break;
        case 'run':
            framework.update(arguments);
            project.run(arguments);
            process.exit(1);
            break;
        default:
            console.log("gelato web (build|run) [--production,--server]");
            process.exit(0);
    }
}

console.log(this);
console.log("If you don't eat your meat, you can't have any pudding!");
process.exit(0);
