var project = require('./package.json');

exports.config = {
	files: {
		javascripts: {
			joinTo: {
				'js/gelato.js': /^(app|node_modules|gelato)/,
				'js/test.js': /^test/
			}
		},
		stylesheets: {
			joinTo: {
				'styles/gelato.css': /^(app|gelato|node_modules)/,
				'styles/test.css': /^test/
			}
		},
		templates: {
			joinTo: {
				'js/gelato.js': /^app/
			}
		}
	},
	paths: {
		'public': 'public',
		'watched': ['app', 'gelato', 'test']
	},
	plugins: {
		replace: {
			mappings: {
				'application-description': project.description,
				'application-name': project.name,
				'application-version': project.version
			},
			paths: [
				'public/js/gelato.js',
				'public/styles/gelato.css'
			]
		}
	},
	sourceMaps: false
};
