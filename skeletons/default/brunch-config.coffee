project = require('./package.json')

exports.config =
  conventions:
    ignored: [
      'app/styles/variables.scss'
    ]
  files:
    javascripts:
      joinTo:
        'js/application.js': /^(app)/
        'js/libraries.js': /^(bower_components|vendor)/
      order:
        before: [
          'vendor/gelato/js/gelato.js'
        ]
    stylesheets:
      joinTo:
        'styles/application.css': /^(app)/
        'styles/libraries.css': /^(bower_components|vendor)/
      order:
        before: [
          'vendor/gelato/styles/gelato.css'
        ]
    templates:
      joinTo:
        'js/application.js': /^(app)/
  keyword:
    filePattern: /\.(js|css|html)$/
    map:
      "application-description": project.description
      "application-language": project.language
      "application-name": project.name
      "application-version": project.version
