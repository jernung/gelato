var crosswalkVersion, frameworkPath, frameworkPkg, projectPkg, projectPath;
var fs = require('fs');
var shell = require('shelljs');

crosswalkVersion = '12.41.296.9';
frameworkPath = process.env.frameworkPath = process.env.frameworkPath || __dirname.toString().slice(0, -4);
projectPath = process.env.projectPath = process.env.projectPath || process.cwd().toString();

if (fs.existsSync(frameworkPath + '/package.json')) {
    frameworkPkg = require(frameworkPath + '/package.json');
    require(frameworkPath + '/src/core/config/gelato.js');
} else {
    console.log('Unable to load framework package file.');
    process.exit(1);
}

if (fs.existsSync(projectPath + '/package.json')) {
    projectPkg = require(projectPath + '/package.json');
} else {
    projectPkg = {}
}

if (fs.existsSync(projectPath + '/src/config.js')) {
    require(projectPath + '/src/config.js');
}

shell.cd(frameworkPath);

module.exports = {
    framework: {
        includes: {
            crosswalk: {
                arm: {
                    path: frameworkPath + '/includes/crosswalk/crosswalk-cordova-' + crosswalkVersion + '-arm'
                },
                base: {
                    path: frameworkPath + '/includes/crosswalk/crosswalk-cordova-' + crosswalkVersion
                },
                path: frameworkPath + '/includes/crosswalk',
                version: crosswalkVersion,
                x86: {
                    path: frameworkPath + '/includes/crosswalk/crosswalk-cordova-' + crosswalkVersion + '-x86'
                }
            },
            path: frameworkPath + '/includes',
            plugins: {
                path: frameworkPath + '/includes/plugins'
            },
            structure: {
                path: frameworkPath + '/includes/structure'
            }
        },
        path: frameworkPath,
        pkg: frameworkPkg,
        src: {
            path: frameworkPath + '/src'
        }
    },
    project: {
        build: {
            path: projectPath + '/build'
        },
        config: gelato.getConfig(),
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