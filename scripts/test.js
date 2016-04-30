#!/usr/bin/env node

var shell = require('shelljs');

shell.exec('node ./node_modules/gulp-cli/bin/gulp build');
shell.exec('node ./node_modules/mocha-phantomjs/bin/mocha-phantomjs ./test/index.html');
shell.exit(0);
