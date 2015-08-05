/**
 * @class GelatoApplication
 * @extends {Backbone.Model}
 */
module.exports = Backbone.Model.extend({
    /**
     * @property gelato
     * @type {Object}
     */
    gelato: {
        version: '{!gelato-version!}'
    },
    /**
     * @property dialog
     * @type {GelatoDialog}
     */
    dialog: null,
    /**
     * @property sidebar
     * @type {GelatoSidebar}
     */
    sidebar: null,
    /**
     * @method closeDialog
     */
    closeDialog: function() {
        if (this.dialog) {
            this.dialog.close();
        }
    },
    /**
     * @method closeSidebar
     */
    closeSidebar: function() {
        if (this.sidebar) {
            this.sidebar.close();
        }
    },
    /**
     * @method getHeight
     * @returns {Number}
     */
    getHeight: function() {
        return $(window).height();
    },
    /**
     * @method getSetting
     * @param {String} key
     * @returns {Boolean|Number|Object|String}
     */
    getSetting: function(key) {
        return JSON.parse(localStorage.getItem('application-' + key));
    },
    /**
     * @method getWidth
     * @returns {Number}
     */
    getWidth: function() {
        return $(window).width();
    },
    /**
     * @method isDevelopment
     * @returns {Boolean}
     */
    isDevelopment: function() {
        return location.hostname === 'localhost';
    },
    /**
     * @method isProduction
     * @returns {Boolean}
     */
    isProduction: function() {
        return location.hostname !== 'localhost';
    },
    /**
     * @method openDialog
     * @param {String} name
     * @param {Object} [options]
     */
    openDialog: function(name, options) {
        var dialog = new (require('dialogs/' + name + '/view'));
        if (!this.dialog && dialog) {
            dialog.render().open(options);
        }
    },
    /**
     * @method openSidebar
     * @param {String} name
     * @param {Object} [options]
     */
    openSidebar: function(name, options) {
        var sidebar = new (require('sidebars/' + name + '/view'));
        if (!this.sidebar && sidebar) {
            sidebar.render().open(options);
        }
    },
    /**
     * @method reload
     */
    reload: function() {
        location.reload(true);
    },
    /**
     * @method removeSetting
     * @param {String} key
     */
    removeSetting: function(key) {
        localStorage.removeItem('application-' + key);
    },
    /**
     * @method setSetting
     * @param {String} key
     * @param {Boolean|Number|Object|String} value
     */
    setSetting: function(key, value) {
        localStorage.setItem('application-' + key, JSON.stringify(value));
    }
});
