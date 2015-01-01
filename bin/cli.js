#!/usr/bin/env node

var gelato = require('../gelato.js');
var program = require('commander');

program
    .version(gelato.version)
    .command('build', 'build current project')
    .command('create [name]', 'create a new project')
    .command('run [platform]', 'run a project')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
    process.exit(0);
}