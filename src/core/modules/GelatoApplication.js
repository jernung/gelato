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
         * @method getPlatform
         * @returns {String}
         */
        getPlatform: function() {
            return window.device ? window.device.platform : 'Desktop';
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
         * @method isAndroid
         * @returns {Boolean}
         */
        isAndroid: function() {
            return this.getPlatform() === 'Android';
        },
        /**
         * @method isCordova
         * @returns {Boolean}
         */
        isCordova: function() {
            return location.protocol === 'file:';
        },
        /**
         * @method isDevelopment
         * @returns {Boolean}
         */
        isDevelopment: function() {
            return location.href.indexOf('http://dev.') > -1;
        },
        /**
         * @method isIOS
         * @returns {Boolean}
         */
        isIOS: function() {
            return getPlatform() === 'iOS';
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
         * @method isProduction
         * @returns {Boolean}
         */
        isProduction: function() {
            return !this.isDevelopment();
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