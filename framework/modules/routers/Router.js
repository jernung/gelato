/**
 * @module Application
 * @submodule Routers
 */
define([
    'core/modules/GelatoRouter',
    'modules/pages/Examples',
    'modules/pages/Home'
], function(GelatoRouter, PageExample, PageHome) {

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
            'examples': 'showExamples',
            '*route': 'showHome'
        },
        /**
         * @method showDefault
         */
        showHome: function() {
            this.activePage = new PageHome();
            this.activePage.render();
        },
        /**
         * @method showExamples
         */
        showExamples: function() {
            this.activePage = new PageExample();
            this.activePage.render();
        }
    });

    return Router;

});