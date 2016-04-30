#!/usr/bin/env node

var shell = require('shelljs');

shell.exec('node ./node_modules/gulp-cli/bin/gulp build');
shell.exit(0);
