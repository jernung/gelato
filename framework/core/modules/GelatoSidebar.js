/**
 * @module Core
 */
define([
    'core/modules/GelatoView'
], function(GelatoView) {
    //TODO: improve swapping between different sidebars

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
            this.element = options.name === undefined ? $(this.$('.gelato-sidebar').get(0)) : this.$('#' + options.name);
            this.page = options.page;
            this.speed = options.speed === undefined ? 300 : options.speed;
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
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.element.get(0).id.replace('sidebar-', '');
        },
        /**
         * @method getSpeed
         * @returns {Number}
         */
        getSpeed: function() {
            return this.speed;
        },
        /**
         * @method handleClickSidebarToggle
         * @param {Event} event
         */
        handleClickSidebarToggle: function(event) {
            event.preventDefault();
            var name = $(event.currentTarget).data('sidebar');
            var speed = $(event.currentTarget).data('speed');
            this.swap(name);
            this.toggle(speed);
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
         * @param {Function} [callback]
         * @returns {GelatoSidebar}
         */
        hide: function(speed, callback) {
            var self = this;
            this.element.addClass('collapsing');
            this.$('[data-sidebar]').removeClass('active').blur();
            speed = speed === undefined ? this.speed : speed;
            this.element.hide('slide', {direction: this.getDirection()}, speed, function() {
                self.element.addClass('collapsed');
                self.element.removeClass('collapsing expanded');
                self.$('.gelato-content').css('opacity', 1);
                if (typeof callback === 'function') {
                    callback();
                }
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
         * @param {Function} [callback]
         * @returns {GelatoSidebar}
         */
        show: function(speed, callback) {
            var self = this;
            this.element.addClass('expanding');
            this.$('[data-sidebar]').addClass('active').focus();
            this.$('.gelato-content').css('opacity', 0.3);
            speed = speed === undefined ? this.speed : speed;
            this.element.show('slide', {direction: this.getDirection()}, speed, function() {
                self.element.addClass('expanded');
                self.element.removeClass('collapsed expanding');
                if (typeof callback === 'function') {
                    callback();
                }
            });
            return this;
        },
        /**
         * @method swap
         * @param name
         * @returns {GelatoSidebar}
         */
        swap: function(name) {
            if (this.getName() !== name) {
                this.hide(0);
                this.element = this.$('#' + name) || $(this.$('.gelato-sidebar').get(0));
            }
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
