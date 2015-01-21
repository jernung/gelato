#!/usr/bin/env node

var globals = require('../globals.js');
var program = require('commander');
var shell = require('shelljs');

program
    .option('--appname [value]', 'specify web browser to open')
    .option('--hostname [value]', 'set server hostname [localhost]', 'localhost')
    .option('--port [value]', 'set server port number [8080]', '8080')
    .option('--protocol [value]', 'set server protocol type [http]', 'http')
    .parse(process.argv);

if (globals.project.pkg.type === 'gelato') {
    var cmd = [];
    switch (program.args[0]) {
        case 'android':
            cmd.push('grunt run-android');
            break;
        case 'web':
            cmd.push('grunt run-web');
            break;
        default:
            cmd.push('grunt run-web');
    }
    if (program.appname) {
        cmd.push('--appname=' + program.appname);
    }
    if (program.hostname) {
        cmd.push('--hostname=' + program.hostname);
    }
    if (program.port) {
        cmd.push('--port=' + program.port);
    }
    if (program.protocol) {
        cmd.push('--protocol=' + program.protocol);
    }
    shell.exec(cmd.join(' '));
} else {
    console.log('Not a valid gelato project directory.');
    process.exit(1);
}