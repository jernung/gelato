project = require('./package.json')

exports.config =
  conventions:
    ignored: [
      'app/styles/variables.scss'
    ]
  files:
    javascripts:
      joinTo:
        'js/application.js': /^app/
        'js/libraries.js': /^(bower_components|vendor)/
      order:
        before: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/lodash/lodash.js',
          'bower_components/backbone/backbone.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'vendor/backbone/backbone.routefilter-0.2.0.js',
          'vendor/jquery/jquery.mobile.events-1.4.5.js',
          'vendor/jquery/jquery.ui.events-1.11.4.js'
        ]
    stylesheets:
      joinTo:
        'styles/application.css': /^(app)/
        'styles/libraries.css': /^(bower_components|vendor)/
    templates:
      joinTo:
        'js/application.js': /^app/
  keyword:
    filePattern: /\.(js|css|html)$/
    map:
      "application-description": project.description
      "application-language": project.language
      "application-name": project.name
      "application-version": project.version
