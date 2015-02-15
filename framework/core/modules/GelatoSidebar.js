/**
 * @module Core
 */
define([
    'core/modules/GelatoView'
], function(GelatoView) {

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
            options = options === undefined ? {} : options;
            this.defaultSpeed = options.speed === undefined ? 300 : options.speed;
            this.element = options.name === undefined ? this.$('#sidebar-main') : this.$('#sidebar-' + options.name);
            if (this.isExpanded()) {
                this.$('[data-sidebar]').addClass('active').focus();
            } else {
                this.$('[data-sidebar]').removeClass('active').blur();
            }
        },
        /**
         * @property events
         * @type Object
         */
        events: {
            'swipeleft .gelato-sidebar': 'handleSwipeLeftSidebar',
            'swiperight .gelato-sidebar': 'handleSwipeRightSidebar',
            'vclick [data-sidebar]': 'handleClickSidebarToggle'
        },
        /**
         * @method getDirection
         * @returns {String}
         */
        getDirection: function() {
            return this.element.hasClass('right') ? 'right' : 'left';
        },
        /**
         * @method handleClickSidebarToggle
         * @param {Event} event
         */
        handleClickSidebarToggle: function(event) {
            event.preventDefault();
            this.toggle($(event.currentTarget).data('speed'));
        },
        /**
         * @method handleSwipeLeftSidebar
         * @param {Event} event
         */
        handleSwipeLeftSidebar: function(event) {
            event.preventDefault();
            if (this.isExpanded() && this.getDirection() === 'left') {
                this.hide();
            }
        },
        /**
         * @method handleSwipeRightSidebar
         * @param {Event} event
         */
        handleSwipeRightSidebar: function(event) {
            event.preventDefault();
            if (this.isExpanded() && this.getDirection() === 'right') {
                this.hide();
            }
        },
        /**
         * @method hide
         * @param {Number} [speed]
         * @returns {GelatoSidebar}
         */
        hide: function(speed) {
            var self = this;
            this.element.addClass('collapsing');
            this.$('[data-sidebar]').removeClass('active').blur();
            this.element.hide('slide', {direction: this.getDirection()}, speed || this.defaultSpeed, function() {
                self.element.addClass('collapsed');
                self.element.removeClass('collapsing expanded');
            });
            return this;
        },
        /**
         * @method isCollapsed
         * @returns {Boolean}
         */
        isCollapsed: function() {
            return this.element.hasClass('collapsed');
        },
        /**
         * @method isExpanded
         * @returns {Boolean}
         */
        isExpanded: function() {
            return this.element.hasClass('expanded');
        },
        /**
         * @method show
         * @param {Number} [speed]
         * @returns {GelatoSidebar}
         */
        show: function(speed) {
            var self = this;
            this.element.addClass('expanding');
            this.$('[data-sidebar]').addClass('active').focus();
            this.element.show('slide', {direction: this.getDirection()}, speed || this.defaultSpeed, function() {
                self.element.addClass('expanded');
                self.element.removeClass('collapsed expanding');
            });
            return this;
        },
        /**
         * @method swap
         * @param name
         * @returns {GelatoSidebar}
         */
        swap: function(name) {
            this.element = this.$('#sidebar-' + name) || this.$('#sidebar-main');
            return this;
        },
        /**
         * @method toggle
         * @param {Number} [speed]
         * @returns {GelatoSidebar}
         */
        toggle: function(speed) {
            if (this.isExpanded()) {
                this.hide(speed);
            } else {
                this.show(speed);
            }
            return this;
        }
    });

    return GelatoSidebar;

});
