#!/usr/bin/env node

var gelato = require('../gelato.js');
var program = require('commander');
var shell = require('shelljs');
var settings = gelato.load().getSettings();

program.parse(process.argv);

if (settings.project.type === 'gelato') {
    shell.exec('grunt build-project');
} else {
    console.log('Not a valid gelato project directory.');
    process.exit(1);
}