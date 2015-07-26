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
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'vendor/backbone/backbone.routefilter-0.2.0.js',
          'vendor/bootstrap/bootstrap.jasny-3.1.3.js',
          'vendor/bootstrap/bootstrap.notify-3.1.3.js',
          'vendor/bootstrap/bootstrap.switch-3.3.2.js',
          'vendor/jquery/jquery.mobile.events-1.4.5.js',
          'vendor/jquery/jquery.ui.events-1.11.4.js'
        ]
    stylesheets:
      joinTo:
        'styles/gelato.css': /^(app|bower_components|vendor)/
  keyword:
    filePattern: /\.(js|css|html)$/
    map:
      'gelato-version': gelato.version
