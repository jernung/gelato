var gelato, gelatoPath, gelatoPkg, projectPkg, projectPath;
var fs = require('fs');
var shell = require('shelljs');

function getSettings() {
    return {
        crosswalk: {
            isPacked: function() {
                var path = gelato.crosswalk.path;
                var version = gelato.crosswalk.version;
                if (!fs.existsSync(path + '/crosswalk-cordova-' + version + '-arm/VERSION')) {
                    return true;
                }
                if (!fs.existsSync(path + '/crosswalk-cordova-' + version + '-x86/VERSION')) {
                    return true;
                }
                return false;
            },
            path: gelatoPath + '/cordova/crosswalk',
            version: '10.39.235.16'
        },
        framework: {
            path: gelatoPath + '/framework'
        },
        path: gelatoPath,
        project: {
            cordova: {
                android: {
                    isInstalled: function() {
                        var path = gelato.project.path;
                        if (!fs.existsSync(path + '/cordova/platforms/android/VERSION')) {
                            return false;
                        }
                        return true;
                    }
                },
                isInstalled: function() {
                    var path = gelato.project.path;
                    if (!fs.existsSync(path + '/cordova/config.xml')) {
                        return false;
                    }
                    return true;
                }
            },
            description: projectPkg.description,
            name: projectPkg.name,
            packageName: projectPkg['package-name'],
            path: projectPath,
            title: projectPkg.title,
            type: projectPkg.type,
            version: projectPkg.version
        },
        structure: {
            path: gelatoPath + '/structure'
        },
        version: gelatoPkg.version
    }
}

function load() {
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
    return this;
}

module.exports = {
    getSettings: getSettings,
    load: load
};