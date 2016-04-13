var GelatoPage = require('gelato/page');

var Navbar = require('components/navbars/primary/view');

/**
 * @class Page2
 * @extends {GelatoPage}
 */
module.exports = GelatoPage.extend({
	/**
	 * @method initialize
	 * @constructor
	 */
	initialize: function () {
		this.navbar = new Navbar();
	},
	/**
	 * @property template
	 * @type {Function}
	 */
	template: require('./template'),
	/**
	 * @property title
	 * @type {String}
	 */
	title: 'Page 2 | ' + app.get('title'),
	/**
	 * @method render
	 * @returns {Page2}
	 */
	render: function () {
		this.renderTemplate();
		this.navbar.setElement('#navbar-container').render();
		return this;
	},
	/**
	 * @method remove
	 * @returns {Page2}
	 */
	remove: function () {
		this.navbar.remove();
		return GelatoPage.prototype.remove.call(this);
	}
});
