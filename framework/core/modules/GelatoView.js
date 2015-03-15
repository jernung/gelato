/**
 * @module Core
 */
define([], function() {

    /**
     * @class GelatoView
     * @extends Backbone.View
     */
    var GelatoView = Backbone.View.extend({
        /**
         * @method renderEvents
         * @returns {GelatoView}
         */
        renderEvents: function() {
            this.$('[data-url]').off().on('vclick', $.proxy(this.handleNavigateClicked, this));
            return this;
        },
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoView}
         */
        renderTemplate: function(template) {
            var self = this;
            var resize = null;
            this.$el.html(Handlebars.compile(template)(app.strings));
            this.renderEvents();
            $(window).resize(function(event) {
                clearTimeout(resize);
                resize = setTimeout(function() {
                    self.trigger('resize', event);
                }, 100);
            });
            return this;
        },
        /**
         * @method handleNavigateClicked
         * @param {Event} event
         */
        handleNavigateClicked: function(event) {
            event.preventDefault();
            var url = $(event.currentTarget).data('url').replace('#', app.isLocal() ? '/#' : '');
            var replace = $(event.currentTarget).data('replace');
            var trigger = $(event.currentTarget).data('trigger');
            app.router.navigate(url, {
                replace: replace === undefined ? false : replace,
                trigger: trigger === undefined ? true : trigger
            });
        },
        /**
         * @method hide
         * @returns {GelatoView}
         */
        hide: function() {
            this.$el.hide();
            return this;
        },
        /**
         * @method remove
         * @returns {GelatoView}
         */
        remove: function() {
            this.$el.empty();
            this.$el.find('*').off();
            this.stopListening();
            $(window).off('resize');
            return this;
        },
        /**
         * @method resize
         * @returns {GelatoView}
         */
        resize: function() {
            return this;
        },
        /**
         * @method show
         * @returns {GelatoView}
         */
        show: function() {
            this.$el.show();
            return this;
        }
    });

    return GelatoView;

});