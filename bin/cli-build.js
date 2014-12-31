#!/usr/bin/env node

var gelato = require('../gelato.js');
var program = require('commander');
var shell = require('shelljs');

program.parse(process.argv);

if (gelato.project.type === 'gelato') {
    shell.exec('grunt build-project');
} else {
    console.log('Not a valid gelato project directory.');
    process.exit(1);
}