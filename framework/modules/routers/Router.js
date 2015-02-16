/**
 * @module Application
 * @submodule Routers
 */
define([
    'core/modules/GelatoRouter',
    'modules/pages/Default',
    'modules/pages/Examples'
], function(GelatoRouter, DefaultPage, ExamplesPage) {

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
            '*route': 'showDefault'
        },
        /**
         * @method showDefault
         */
        showDefault: function() {
            this.activePage = new DefaultPage();
            this.activePage.render();
        },
        /**
         * @method showExamples
         */
        showExamples: function() {
            this.activePage = new ExamplesPage();
            this.activePage.render();
        }
    });

    return Router;

});