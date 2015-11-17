gelato = require('./package.json')

exports.config =
  conventions:
    ignored: false
  files:
    javascripts:
      joinTo:
        'js/gelato.js': /^(app|bower_components|vendor)/
      order:
        before: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/lodash/lodash.js',
          'bower_components/backbone/backbone.js',
          'vendor/backbone/backbone.routefilter-0.2.0.js'
        ]
    stylesheets:
      joinTo:
        'styles/gelato.css': /^(app|bower_components|vendor)/
  keyword:
    filePattern: /\.(js|css|html)$/
    map:
      'gelato-version': gelato.version
