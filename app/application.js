var GelatoApplication = require('gelato/application');
var Router = require('./router');

/**
 * @class Application
 * @extends {GelatoApplication}
 */
module.exports = GelatoApplication.extend({
	/**
	 * @method initialize
	 * @constructor
	 */
	initialize: function () {
		this.router = new Router();
	},
	/**
	 * @property defaults
	 * @type {Object}
	 */
	defaults: {
		description: '{!application-description!}',
		title: '{!application-name!}',
		version: '{!application-version!}'
	},
	/**
	 * @method start
	 */
	start: function () {
		this.router.start();
	}
});
