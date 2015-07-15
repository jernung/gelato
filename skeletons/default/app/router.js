var GelatoRouter = require('gelato/modules/router');

/**
 * @class Router
 * @extends {GelatoRouter}
 */
module.exports = GelatoRouter.extend({
    /**
     * @method initialize
     * @constructor
     */
    initialize: function() {},
    /**
     * @property routes
     * @type {Object}
     */
    routes: {
        '*route': 'navigateHome'
    },
    /**
     * @method navigateHome
     */
    navigateHome: function() {
        this.page = new (require('pages/home/view'));
        this.page.render();
    }
});
