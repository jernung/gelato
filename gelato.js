var gelatoPath = process.env.gelatoPath = process.env.gelatoPath || __dirname.toString();
var projectPath = process.env.projectPath = process.env.projectPath || process.cwd().toString();
var fs = require('fs');
var shell = require('shelljs');
var gelato, gelatoPkg, projectPkg = {};

try {
    gelatoPkg = require(gelatoPath + '/package.json');
} catch (error) {
    console.log('Unable to load gelato package file.', error.code);
    process.exit(1);
}

if (fs.existsSync(projectPath + '/package.json')) {
    projectPkg = require(projectPath + '/package.json');
}

shell.cd(gelatoPath);

var gelato = {
    crosswalk: {
        isPacked: function() {
            var path = gelato.crosswalk.path;
            var version = gelato.crosswalk.version;
            console.log('crosswalk', path, version);
            if (!fs.existsSync(path + '/crosswalk-cordova-' + version + '-arm/VERSION')) {
                return true;
            }
            if (!fs.existsSync(path + '/crosswalk-cordova-' + version + '-x86/VERSION')) {
                return true;
            }
            return false;
        },
        path: gelatoPath + '/cordova/crosswalk',
        version: '10.39.235.15'
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
    structures: {
        path: gelatoPath + '/structures'
    },
    version: gelatoPkg.version
};

module.exports = gelato;