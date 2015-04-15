/**
 * @module Core
 */
define([
    'require.text!templates/components/sidebars.html',
    'core/modules/GelatoView'
], function(Template, GelatoView) {

    /**
     * @class GelatoSidebar
     * @extends GelatoView
     */
    var GelatoSidebar = GelatoView.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function(options) {
            options = options || {};
            this.element = null;
            this.speed = options.speed || 300;
            this.render();
        },
        /**
         * @property el
         * @type String
         */
        el: '#gelato-sidebar',
        /**
         * @method render
         * @returns {GelatoSidebar}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        },
        /**
         * @property events
         * @type Object
         */
        events: {},
        /**
         * @method handleSidebarHidden
         */
        handleSidebarHidden: function() {
            this.$el.removeClass('active');
            this.element = null;
            this.trigger('hidden');
        },
        /**
         * @method handleSidebarShown
         */
        handleSidebarShown: function() {
            this.trigger('shown');
        },
        /**
         * @method hide
         * @param {Object} [options]
         * @returns {GelatoSidebar}
         */
        hide: function(options) {
            this.trigger('hide');
            this.element.hide('slide', {direction: 'left'}, this.speed, $.proxy(this.handleSidebarHidden, this));
            return this;
        },
        /**
         * @method show
         * @param {String} name
         * @param {Object} [options]
         * @returns {GelatoSidebar}
         */
        show: function(name, options) {
            this.trigger('show');
            this.$el.addClass('active');
            this.element = this.$('#' + name);
            this.element.show('slide', {direction: 'left'}, this.speed, $.proxy(this.handleSidebarShown, this));
            return this;
        }
    });

    return GelatoSidebar;

});
