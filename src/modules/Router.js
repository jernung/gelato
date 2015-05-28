/**
 * @module Application
 * @submodule Routers
 */
define([
    'core/modules/GelatoRouter',
    'modules/pages/default/DefaultPage'
], function(GelatoRouter, DefaultPage) {

    /**
     * @class Router
     * @extends GelatoRouter
     */
    var Router = GelatoRouter.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {},
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
            this.page = new DefaultPage();
            this.page.render();
        }
    });

    return Router;

});