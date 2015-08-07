#!/usr/bin/env node

process.env.framework = __dirname.toString().slice(0, -4);
process.env.project = process.cwd().toString();

var lodash = require('lodash');
var minimist = require('minimist');
var gelato = require(process.env.framework + '/bin/cli-gelato');
var arguments = lodash.omit(minimist(process.argv.slice(2)), '_');
var commands = minimist(process.argv.slice(2))['_'];

//TODO: command for creating new projects

if (arguments.version) {
    console.log(gelato.framework.version);
    process.exit(1);
}

try {
    var project = require(gelato.path.project + '/package.json');
} catch (error) {
    switch (error.code) {
        case 'MODULE_NOT_FOUND':
            console.log("Directory package.json file not found.");
            break;
    }
    process.exit(0);
}

if (project.framework !== 'gelato') {
    console.log("Directory is not gelato project.");
    process.exit(0);
}

//TODO: command for updating framework bower dependencies

if (['install'].indexOf(commands[0]) > -1) {
    gelato.cordova.install();
    process.exit(1);
}

if (['android'].indexOf(commands[0]) > -1) {
    if (!gelato.cordova.isInstalled()) {
        gelato.cordova.install();
    }
    if (!gelato.cordova.hasAndroid()) {
        gelato.cordova.addAndroid();
    }
    switch (commands[1]) {
        case 'build':
            gelato.framework.update();
            gelato.brunch.build();
            gelato.cordova.copy();
            gelato.cordova.exec(['build', 'android']);
            process.exit(1);
            break;
        case 'install':
            gelato.cordova.addAndroid();
            process.exit(1);
            break;
        case 'run':
            gelato.framework.update();
            gelato.brunch.build();
            gelato.cordova.copy();
            gelato.cordova.exec(['run', 'android']);
            process.exit(1);
            break;
    }
}

if (['ios'].indexOf(commands[0]) > -1) {
    if (!gelato.cordova.isInstalled()) {
        gelato.cordova.install();
    }
    if (!gelato.cordova.hasIos()) {
        gelato.cordova.addIos();
    }
    switch (commands[1]) {
        case 'build':
            gelato.framework.update();
            gelato.brunch.build();
            gelato.cordova.copy();
            gelato.cordova.exec(['build', 'ios']);
            process.exit(1);
            break;
        case 'install':
            gelato.cordova.addIos();
            process.exit(1);
            break;
        case 'run':
            gelato.framework.update();
            gelato.brunch.build();
            gelato.cordova.copy();
            gelato.cordova.exec(['run', 'ios']);
            process.exit(1);
            break;
    }
}

if (['test'].indexOf(commands[0]) > -1) {
    gelato.mocha.test();
    process.exit(1);
}

if (['web'].indexOf(commands[0]) > -1) {
    switch (commands[1]) {
        case 'build':
            gelato.framework.update();
            gelato.brunch.build();
            process.exit(1);
            break;
        case 'run':
            gelato.framework.update();
            gelato.brunch.exec(['watch', '--server']);
            process.exit(1);
            break;
    }
}

console.log("If you don't eat your meat, you can't have any pudding!");
process.exit(0);
