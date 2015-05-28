/**
 * @module Core
 */
define([
    'core/modules/GelatoDialogs',
    'core/modules/GelatoSidebars',
    'modules/Router'
], function(GelatoDialog, GelatoSidebar, Router) {

    /**
     * @class GelatoApplication
     * @extends Backbone.Model
     */
    var GelatoApplication = Backbone.Model.extend({
        /**
         * @property dialogs
         * @type {GelatoDialog}
         */
        dialogs: new GelatoDialog(),
        /**
         * @property router
         * @type {Router}
         */
        router: new Router(),
        /**
         * @property sidebars
         * @type {GelatoSidebar}
         */
        sidebars: new GelatoSidebar(),
        /**
         * @method getHeight
         * @returns {Number}
         */
        getHeight: function() {
            return $(window).height();
        },
        /**
         * @method getSetting
         * @param {String} name
         * @returns {String}
         */
        getSetting: function(name) {
            return JSON.parse(localStorage.getItem('application-' + name));
        },
        /**
         * @method getWidth
         * @returns {Number}
         */
        getWidth: function() {
            return $(window).width();
        },
        /**
         * @method isLandscape
         * @returns {Boolean}
         */
        isLandscape: function() {
            return this.getWidth() > this.getHeight();
        },
        /**
         * @method isPortrait
         * @returns {Boolean}
         */
        isPortrait: function() {
            return this.getWidth() <= this.getHeight();
        },
        /**
         * @method reload
         */
        reload: function() {
            location.href = '';
        },
        /**
         * @method removeSetting
         * @param {String} name
         */
        removeSetting: function(name) {
            localStorage.removeItem('application-' + name);
        },
        /**
         * @method setSetting
         * @param {String} name
         * @param {Boolean|Object|String} value
         */
        setSetting: function(name, value) {
            localStorage.setItem('application-' + name, JSON.stringify(value));
        },
        /**
         * @method start
         * @returns {GelatoApplication}
         */
        start: function() {
            this.router.start();
            return this;
        }
    });

    return GelatoApplication;

});