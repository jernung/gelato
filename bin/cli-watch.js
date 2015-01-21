#!/usr/bin/env node

var globals = require('../globals.js');
var program = require('commander');
var shell = require('shelljs');

program.parse(process.argv);

if (globals.project.pkg.type === 'gelato') {
    shell.exec('grunt watch-project');
} else {
    console.log('Not a valid gelato project directory.');
    process.exit(1);
}