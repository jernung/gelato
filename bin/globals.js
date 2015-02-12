var crosswalkVersion, gelato, gelatoPath, gelatoPkg, projectPkg, projectPath;
var fs = require('fs');
var shell = require('shelljs');

crosswalkVersion = '11.40.277.6';
gelatoPath = process.env.gelatoPath = process.env.gelatoPath || __dirname.toString().slice(0, -4);
projectPath = process.env.projectPath = process.env.projectPath || process.cwd().toString();

if (fs.existsSync(gelatoPath + '/package.json')) {
    gelatoPkg = require(gelatoPath + '/package.json');
} else {
    console.log('Unable to load framework package file.');
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
        framework: {
            path: gelatoPath + '/framework'
        },
        includes: {
            crosswalk: {
                arm: {
                    path: gelatoPath + '/includes/crosswalk/crosswalk-cordova-' + crosswalkVersion + '-arm'
                },
                base: {
                    path: gelatoPath + '/includes/crosswalk/crosswalk-cordova-' + crosswalkVersion
                },
                path: gelatoPath + '/includes/crosswalk',
                version: crosswalkVersion,
                x86: {
                    path: gelatoPath + '/includes/crosswalk/crosswalk-cordova-' + crosswalkVersion + '-x86'
                }
            },
            path: gelatoPath + '/includes',
            plugins: {
                path: gelatoPath + '/includes/plugins'
            },
            structure: {
                path: gelatoPath + '/includes/structure'
            }
        },
        path: gelatoPath,
        pkg: gelatoPkg
    },
    project: {
        cordova: {
            docs: {
                path: projectPath + '/docs'
            },
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