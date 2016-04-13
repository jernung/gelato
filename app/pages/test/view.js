var GelatoPage = require('gelato/page');

var Navbar = require('components/navbars/primary/view');


/**
 * @class Test
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
	 * @property events
	 * @type {Object}
	 */
	events: {},
	/**
	 * @property title
	 * @type {String}
	 */
	title: 'Test | ' + app.get('title'),
	/**
	 * @property template
	 * @type {Function}
	 */
	template: require('./template'),
	/**
	 * @method render
	 * @returns {Test}
	 */
	render: function () {
		this.renderTemplate();
		this.navbar.setElement('#navbar-container').render();
		$.ajax({
			url: 'js/test.js',
			context: this,
			dataType: "script",
			success: this.load
		});
		return this;
	},
	/**
	 * @method load
	 */
	load: function () {
		mocha.setup('bdd');
		require('test/index');
		mocha.checkLeaks();
		mocha.run();
	},
	/**
	 * @method remove
	 * @returns {Test}
	 */
	remove: function () {
		this.navbar.remove();
		return GelatoPage.prototype.remove.call(this);
	}
});
