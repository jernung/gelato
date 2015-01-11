/**
 * @module Framework
 */
define(['core/GelatoRouter', 'views/Default'], function(GelatoRouter, DefaultView) {
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
            this.active = new DefaultView();
            this.active.render();
        }
    });

    return Router;

});