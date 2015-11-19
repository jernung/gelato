var application = require('./package.json');

exports.config = {
    files: {
        javascripts: {
            joinTo: {
                'js/application.js': /^app[\\/]/,
                'js/gelato.js': /^(bower_components|gelato)[\\/]/,
                'js/libraries.js': /^vendor[\\/]/,
                '../dist/gelato.js': /^(bower_components|gelato)[\\/]/
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
                '../dist/gelato.css': /^(bower_components|gelato)[\\/]/
            },
            order: {
                before: [
                    'vendor/bootstrap/bootstrap.css'
                ]
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
        'watched': [
            'app',
            'gelato',
            'vendor'
        ]
    },
    sourceMaps: false
};
