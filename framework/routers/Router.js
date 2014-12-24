/**
 * @module Framework
 */
define(['core/BaseRouter', 'views/Default'], function(BaseRouter, DefaultView) {
    /**
     * @class Router
     * @extends BaseRouter
     */
    var Router = BaseRouter.extend({
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