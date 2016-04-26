#!/usr/bin/env node

var shell = require('shelljs');

shell.rm('-rf', './public');
shell.exec('node ./node_modules/brunch/bin/brunch build');
shell.exec('node ./node_modules/mocha-phantomjs/bin/mocha-phantomjs ./test/index.html');
shell.exit(0);
