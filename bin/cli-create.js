#!/usr/bin/env node

var globals = require('../globals.js');
var fs = require('fs');
var program = require('commander');
var shell = require('shelljs');

program.parse(process.argv);

if (program.args.length) {
    var projectName = program.args[0];
    if (fs.existsSync(globals.project.path + '/' + projectName)) {
        console.log('Project directory already exists.');
        process.exit(1);
    } else {
        shell.exec('grunt create-project --name=' + projectName);
    }
} else {
    program.help();
    process.exit(1);
}