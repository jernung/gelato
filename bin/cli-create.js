#!/usr/bin/env node

var gelato = require('../gelato.js');
var fs = require('fs');
var program = require('commander');
var shell = require('shelljs');

program.parse(process.argv);

if (program.args.length) {
    process.env.projectPath = gelato.project.path + '/' + program.args[0];
    if (fs.existsSync(gelato.project.path + '/' + program.args[0])) {
        console.log('Project directory already exists.');
        process.exit(1);
    } else {
        shell.exec('grunt create-project --name=' + program.args[0]);
    }
} else {
    program.help();
    process.exit(1);
}