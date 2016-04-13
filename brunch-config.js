var application = require('./package.json');

exports.config = {
	files: {
		javascripts: {
			joinTo: {
				'js/application.js': /^app[\\/]/,
				'js/gelato.js': /^(bower_components|gelato)[\\/]/,
				'js/libraries.js': /^vendor[\\/]/,
				'js/test.js': /^test[\\/]/,
				'../gelato.js': /^gelato[\\/]/
			},
			order: {
				before: [
					'gelato/vendor/jquery-2.2.2.js',
					'gelato/vendor/lodash-4.9.0.js',
					'gelato/vendor/backbone-1.3.3.js',
					'vendor/bootstrap-3.3.6.js',
					'vendor/chai-3.5.0.js',
					'vendor/mocha-2.4.5.js',
					'vendor/sinon-1.17.3.js'
				]
			}
		},
		stylesheets: {
			joinTo: {
				'styles/application.css': /^app[\\/]/,
				'styles/gelato.css': /^(bower_components|gelato)[\\/]/,
				'styles/libraries.css': /^vendor[\\/]/,
				'styles/test.css': /^test[\\/]/,
				'../gelato.css': /^gelato[\\/]/
			},
			order: {
				before: [
					'vendor/bootstrap-3.3.6.css',
					'vendor/mocha-2.3.4.css'
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
	paths: {
		'public': 'public',
		'watched': ['app', 'gelato', 'test', 'vendor']
	},
	plugins: {
		replace: {
			mappings: {
				'application-description': application.description,
				'application-name': application.name,
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
