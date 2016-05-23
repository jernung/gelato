#!/usr/bin/env node

var shell = require('shelljs');

shell.exec('node ./node_modules/gulp-cli/bin/gulp build');
shell.exec('node ./node_modules/gulp-cli/bin/gulp watch');
shell.exit(0);
