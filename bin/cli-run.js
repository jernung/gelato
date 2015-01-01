#!/usr/bin/env node

var gelato = require('../gelato.js');
var program = require('commander');
var shell = require('shelljs');

program
    .option('--appname [value]', 'specify web browser [open]', 'open')
    .option('--hostname [value]', 'set server hostname [localhost]', 'localhost')
    .option('--port [value]', 'set server port number [8080]', '8080')
    .option('--protocol [value]', 'set server protocol type [http]', 'http')
    .parse(process.argv);

if (gelato.project.type === 'gelato') {
    shell.exec([
        'grunt run-project',
        '--appname=' + program.appname,
        '--hostname=' + program.hostname,
        '--port=' + program.port,
        '--protocol=' + program.protocol
    ].join(' '));
} else {
    console.log('Not a valid gelato project directory.');
    process.exit(1);
}