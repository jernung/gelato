var globals = require('globals');

/**
 * @class GelatoView
 * @extends {Backbone.View}
 */
module.exports = Backbone.View.extend({
    /**
     * @property template
     * @type {Function}
     */
    template: null,
    /**
     * @method renderEvents
     * @returns {GelatoView}
     */
    renderEvents: function() {
        var resize = null;
        $(window).resize((function(event) {
            clearTimeout(resize);
            resize = setTimeout((function() {
                this.trigger('resize', event);
            }).bind(this), 100);
        }).bind(this));
        this.$('a[href]').on('vclick', this.handleClickHref);
        return this;
    },
    /**
     * @method renderTemplate
     * @param {Object} [properties]
     * @returns {GelatoView}
     */
    renderTemplate: function(properties) {
        this.$el.html(this.template(this.getContext(properties)));
        this.renderEvents();
        return this;
    },
    /**
     * @method disableForm
     * @param {String} [selector]
     * @returns {GelatoView}
     */
    disableForm: function(selector) {
        this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', true);
        return this;
    },
    /**
     * @method handleClickHref
     * @param {Event} event
     */
    handleClickHref: function(event) {
        var target = $(event.currentTarget);
        var href = target.attr('href');
        var ignore = target.data('ignore');
        if (!ignore &&
            href.indexOf('http://') !== 0 &&
            href.indexOf('https://') !== 0) {
            event.preventDefault();
            app.router.navigate(href, {
                replace: target.data('replace') || false,
                trigger: target.data('trigger') || true
            });
        }
    },
    /**
     * @method enableForm
     * @param {String} [selector]
     * @returns {GelatoView}
     */
    enableForm: function(selector) {
        this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', false);
        return this;
    },
    /**
     * @method getContext
     * @param {Object} [properties]
     * @returns {Object}
     */
    getContext: function(properties) {
        globals.view = this;
        globals = $.extend(true, globals, properties || {});
        return globals;
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
        this.undelegateEvents();
        $(window).off('resize');
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
