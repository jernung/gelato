/**
 * @module Framework
 */
define(['core/GelatoRouter', 'pages/Default'], function(GelatoRouter, DefaultPage) {
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
            this.active = new DefaultPage();
            this.active.render();
        }
    });

    return Router;

});