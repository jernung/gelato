#!/usr/bin/env node

var shell = require('shelljs');

shell.rm('-rf', './public');
shell.exec('node ./node_modules/brunch/bin/brunch build');
shell.cp('./public/js/gelato.js', './gelato.js');
shell.cp('./public/styles/gelato.css', './gelato.css');
shell.exit(0);
