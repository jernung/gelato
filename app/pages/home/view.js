var GelatoPage = require('gelato/page');

var Navbar = require('components/navbars/primary/view');

/**
 * @class Home
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
	title: 'Home | ' + app.get('title'),
	/**
	 * @method render
	 * @returns {Home}
	 */
	render: function () {
		this.renderTemplate();
		this.navbar.setElement('#navbar-container').render();
		return this;
	},
	/**
	 * @method remove
	 * @returns {Home}
	 */
	remove: function () {
		this.navbar.remove();
		return GelatoPage.prototype.remove.call(this);
	}
});
