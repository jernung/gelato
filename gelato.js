var gelatoPath = process.env.gelatoPath = process.env.gelatoPath || __dirname.toString();
var projectPath = process.env.projectPath = process.env.projectPath || process.cwd().toString();
var fs = require('fs');
var shell = require('shelljs');
var gelato, project = {};

try {
    gelato = require(gelatoPath + '/package.json');
} catch (error) {
    console.log('Unable to load gelato package file.', error.code);
    process.exit(1);
}

if (fs.existsSync(projectPath + '/package.json')) {
    project = require(projectPath + '/package.json');
}

shell.cd(gelatoPath);

module.exports = {
    crosswalk: {
        path: gelatoPath + '/cordova/crosswalk',
        version: '10.39.235.15'
    },
    framework: {
        path: gelatoPath + '/framework'
    },
    path: gelatoPath,
    project: {
        description: project.description,
        name: project.name,
        path: projectPath,
        title: project.title,
        type: project.type,
        version: project.version
    },
    structures: {
        path: gelatoPath + '/structures'
    },
    version: gelato.version
};