/**
 * @module Core
 */
define([
    'core/modules/GelatoDialog',
    'core/modules/GelatoSidebar',
    'modules/Router'
], function(GelatoDialog, GelatoSidebar, Router) {

    /**
     * @class GelatoApplication
     * @extends Backbone.Model
     */
    var GelatoModel = Backbone.Model.extend({
        /**
         * @property dialog
         * @type {GelatoDialog}
         */
        dialog: new GelatoDialog(),
        /**
         * @property router
         * @type {Router}
         */
        router: new Router(),
        /**
         * @property sidebar
         * @type {GelatoSidebar}
         */
        sidebar: new GelatoSidebar(),
        /**
         * @method start
         * @returns {GelatoApplication}
         */
        start: function() {
            this.router.start();
            return this;
        }
    });

    return GelatoModel;

});