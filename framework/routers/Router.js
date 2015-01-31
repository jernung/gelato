/**
 * @module Framework
 */
define(['gelato/GelatoRouter', 'pages/Default'], function(GelatoRouter, DefaultPage) {
    /**
     * @class Router
     * @extends GelatoRouter
     */
    var Router = GelatoRouter.extend({
        /**
         * @property routes
         * @type Object
         */
        routes: {
            '*route': 'showDefault'
        },
        /**
         * @method showDefault
         */
        showDefault: function() {
            this.activePage = new DefaultPage();
            this.activePage.render();
        }
    });

    return Router;

});