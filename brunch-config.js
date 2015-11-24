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
    paths: {
        'public': 'public',
        'watched': ['app', 'gelato', 'vendor']
    },
    plugins: {
        replace: {
            mappings: {
                'application-description': application.description,
                'application-title': application.title,
                'application-version': application.version,
                'gelato-version': application.version
            },
            paths: [
                'gelato.css',
                'gelato.js',
                'public/js/application.js',
                'public/js/gelato.js',
                'public/style/application.css',
                'public/style/gelato.css'
            ]
        }
    },
    sourceMaps: false
};
