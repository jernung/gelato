#!/usr/bin/env node

var globals = require('../globals.js');
var program = require('commander');

program
    .version(globals.gelato.pkg.version)
    .command('build', 'build current project')
    .command('create [project]', 'create a new project')
    .command('run [platform]', 'run a project')
    .command('update', 'update core gelato cache')
    .command('watch', 'watch project for build changes')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
    process.exit(0);
}