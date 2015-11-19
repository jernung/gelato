var application = require('./package.json');

exports.config = {
    files: {
        javascripts: {
            joinTo: {
                'js/application.js': /^app[\\/]/,
                'js/gelato.js': /^(bower_components|gelato)[\\/]/,
                'js/libraries.js': /^vendor[\\/]/,
                '../gelato.js': /^gelato[\\/]/
            },
            order: {
                before: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/lodash/lodash.js',
                    'bower_components/backbone/backbone.js',
                    'vendor/bootstrap/bootstrap.js'
                ]
            }
        },
        stylesheets: {
            joinTo: {
                'styles/application.css': /^app[\\/]/,
                'styles/gelato.css': /^(bower_components|gelato)[\\/]/,
                'styles/libraries.css': /^vendor[\\/]/,
                '../gelato.css': /^gelato[\\/]/
            },
            order: {
                before: ['vendor/bootstrap/bootstrap.css']
            }
        },
        templates: {
            joinTo: {
                'js/application.js': /^app[\\/]/,
                'js/libraries.js': /^vendor[\\/]/
            }
        }
    },
    keyword: {
        extraFiles: ['gelato.css', 'gelato.js'],
        filePattern: /\.(js|css|html)$/,
        map: {
            'application-description': application.description,
            'application-title': application.title,
            'application-version': application.version,
            'gelato-version': application.version
        }
    },
    paths: {
        'public': 'public',
        'watched': ['app', 'gelato', 'vendor']
    },
    sourceMaps: false
};
