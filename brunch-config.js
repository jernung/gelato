var application = require('./package.json');

exports.config = {
    files: {
        javascripts: {
            joinTo: {
                'js/application.js': /^app[\\/]/,
                'js/gelato.js': /^(bower_components|gelato)[\\/]/,
                '../dist/gelato.js': /^(bower_components|gelato)[\\/]/
            },
            order: {
                before: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/lodash/lodash.js',
                    'bower_components/backbone/backbone.js'
                ]
            }
        },
        stylesheets: {
            joinTo: {
                'styles/application.css': /^app[\\/]/,
                'styles/gelato.css': /^(bower_components|gelato)[\\/]/,
                '../dist/gelato.css': /^(bower_components|gelato)[\\/]/
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
