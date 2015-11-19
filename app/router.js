var GelatoRouter = require('gelato/router');

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
        '': 'navigateHome',
        'page1': 'navigatePage1',
        'page2': 'navigatePage2',
        '*route': 'navigateHome'
    },
    /**
     * @method navigateHome
     */
    navigateHome: function() {
        this.go('views/home');
    },
    /**
     * @method navigatePage1
     */
    navigatePage1: function() {
        this.go('views/page1');
    },
    /**
     * @method navigatePage2
     */
    navigatePage2: function() {
        this.go('views/page2');
    }
});
