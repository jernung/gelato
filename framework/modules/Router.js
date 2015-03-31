/**
 * @module Application
 * @submodule Routers
 */
define([
    '../core/modules/GelatoRouter',
    'modules/pages/Home'
], function(GelatoRouter, PageHome) {

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
            this.activePage = new PageHome();
            this.activePage.render();
        }
    });

    return Router;

});