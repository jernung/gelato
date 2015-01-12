#!/usr/bin/env node

var gelato = require('../gelato.js');
var fs = require('fs');
var program = require('commander');
var shell = require('shelljs');
var settings = gelato.load().getSettings();

program.parse(process.argv);

if (program.args.length) {
    var projectName = program.args[0];
    if (fs.existsSync(settings.project.path + '/' + projectName)) {
        console.log('Project directory already exists.');
        process.exit(1);
    } else {
        shell.exec('grunt create-project --name=' + projectName);
    }
} else {
    program.help();
    process.exit(1);
}