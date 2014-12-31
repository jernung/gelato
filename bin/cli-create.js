#!/usr/bin/env node

var gelato = require('../gelato.js');
var program = require('commander');
var shell = require('shelljs');

program.parse(process.argv);

if (program.args.length) {
    process.env.projectPath = gelato.project.path + '/' + program.args[0];
    shell.exec('grunt create-project --name=' + program.args[0]);
} else {
    program.help();
    process.exit(1);
}