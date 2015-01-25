var crosswalkVersion, gelato, gelatoPath, gelatoPkg, projectPkg, projectPath;
var fs = require('fs');
var shell = require('shelljs');

crosswalkVersion = '10.39.235.16';
gelatoPath = process.env.gelatoPath = process.env.gelatoPath || __dirname.toString();
projectPath = process.env.projectPath = process.env.projectPath || process.cwd().toString();

if (fs.existsSync(gelatoPath + '/package.json')) {
    gelatoPkg = require(gelatoPath + '/package.json');
} else {
    console.log('Unable to load gelato package file.', error.code);
    process.exit(1);
}

if (fs.existsSync(projectPath + '/package.json')) {
    projectPkg = require(projectPath + '/package.json');
} else {
    projectPkg = {}
}

shell.cd(gelatoPath);

module.exports = {
    gelato: {
        copy: {
            path: gelatoPath + '/copy'
        },
        cordova: {
            crosswalk: {
                path: gelatoPath + '/cordova/crosswalk',
                version: crosswalkVersion
            },
            path: gelatoPath + '/cordova',
            plugins: {
                path: gelatoPath + '/cordova/plugins'
            }
        },
        framework: {
            path: gelatoPath + '/framework'
        },
        path: gelatoPath,
        pkg: gelatoPkg
    },
    project: {
        cordova: {
            path: projectPath + '/cordova',
            platforms: {
                android: {
                    cordovalib: {
                        path: projectPath + '/cordova/platforms/android/CordovaLib'
                    },
                    path: projectPath + '/cordova/platforms/android'
                },
                path: projectPath + '/cordova/platforms'
            },
            www: {
                path: projectPath + '/cordova/www'
            }
        },
        gelato: {
            path: projectPath + '/gelato'
        },
        path: projectPath,
        pkg: projectPkg,
        src: {
            path: projectPath + '/src'
        },
        www: {
            path: projectPath + '/www'
        }
    }
};