window.$ = window.jQuery = require('jquery');
window._ = require('lodash');
window.Backbone = require('backbone');

module.exports = {
	BUILD: '{!gelato-version!}',
	VERSION: '{!gelato-version!}',
	Application: require('./application'),
	Collection: require('./collection'),
	Component: require('./component'),
	Dialog: require('./dialog'),
	Model: require('./model'),
	Page: require('./page'),
	Router: require('./router'),
	View: require('./view')
};
