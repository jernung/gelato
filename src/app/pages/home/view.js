var GelatoPage = require('gelato/modules/page');

/**
 * @class Home
 * @extends {GelatoPage}
 */
module.exports = GelatoPage.extend({
    /**
     * @method initialize
     * @constructor
     */
    initialize: function() {},
    /**
     * @property title
     * @type {String}
     */
    title: app.get('name'),
    /**
     * @property template
     * @type {Function}
     */
    template: require('pages/home/template'),
    /**
     * @method render
     * @returns {Home}
     */
    render: function() {
        this.renderTemplate();
        return this;
    }
});
