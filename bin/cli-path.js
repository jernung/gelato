#!/usr/bin/env node

var FRAMEWORK_PATH = process.env.framework.toString();
var PROJECT_PATH = process.env.project.toString();
var BRUNCH_PATH = FRAMEWORK_PATH + '/node_modules/.bin/brunch';
var CORDOVA_PATH = FRAMEWORK_PATH + '/node_modules/.bin/cordova';
var MOCHA_PATH = FRAMEWORK_PATH + '/node_modules/.bin/mocha';

module.exports = {
    brunch: BRUNCH_PATH,
    cordova: CORDOVA_PATH,
    framework: FRAMEWORK_PATH,
    mocha: MOCHA_PATH,
    project: PROJECT_PATH
};
