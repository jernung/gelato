#!/usr/bin/env node

process.env.framework = __dirname.toString().slice(0, -4);
process.env.project = process.cwd().toString();

var gelato = require(process.env.framework + '/bin/cli-gelato');
var minimist = require('minimist');
var arguments = minimist(process.argv.slice(2));
var commands = arguments['_'];

if (['n', 'new'].indexOf(commands[0]) > -1) {
    var createCommand = ['new'];
    if (commands[1]) {
        createCommand.push(commands[1]);
    } else {
        createCommand.push('gh:jernung/gelato-default');
    }
    if (commands[2]) {
        createCommand.push(commands[1]);
    } else {
        createCommand.push('gelato-default');
    }
    gelato.brunch(createCommand);
    gelato.framework.update();
    process.exit(1);
}

try {
    var project = require(gelato.path.project + '/package.json');
} catch (error) {
    switch (error.code) {
        case 'MODULE_NOT_FOUND':
            console.log("Directory package.json not found.");
            break;
    }
    process.exit(0);
}

if (project.framework !== 'gelato') {
    console.log("Directory is not gelato project.");
    process.exit(0);
}

if (['b', 'build'].indexOf(commands[0]) > -1) {
    var buildCommand = ['build'];
    if (arguments['e'] || arguments['env']) {
        buildCommand.push('--env ' + arguments['e'] || arguments['env']);
    }
    if (arguments['P'] || arguments['production']) {
        buildCommand.push('--production');
    }
    gelato.framework.update();
    gelato.brunch(buildCommand);
    process.exit(1);
}

if (['u', 'update'].indexOf(commands[0]) > -1) {
    gelato.framework.update();
    process.exit(1);
}

if (['w', 'watch'].indexOf(commands[0]) > -1) {
    var watchCommand = ['watch'];
    if (arguments['p'] || arguments['port']) {
        watchCommand.push('--port ' + arguments['p'] || arguments['port']);
    }
    if (arguments['s'] || arguments['server']) {
        watchCommand.push('--server');
    }
    gelato.framework.update();
    gelato.brunch(watchCommand);
    process.exit(1);
}

console.log("If you don't eat your meat, you can't have any pudding!");
process.exit(0);
