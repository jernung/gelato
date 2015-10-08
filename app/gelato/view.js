var globals = require('globals');

/**
 * @class GelatoView
 * @extends {Backbone.View}
 */
module.exports = Backbone.View.extend({
    /**
     * @method constructor
     * @param {Object} [options]
     * @param {GelatoApplication} [application]
     */
    constructor: function(options, application) {
        this.app = application;
        Backbone.View.prototype.constructor.call(this, options);
    },
    /**
     * @property app
     * @type {GelatoApplication}
     */
    app: null,
    /**
     * @property resize
     * @type {Object}
     */
    resize: null,
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
        $(window).resize((function(event) {
            clearTimeout(this.resize);
            this.resize = setTimeout((function() {
                this.trigger('resize', event);
            }).bind(this), 100);
        }).bind(this));
        this.$('a[href]').on('click', this.handleClickHref);
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
     * @method getHeight
     * @returns {Number}
     */
    getHeight: function() {
        return this.$element.height();
    },
    /**
     * @method getWidth
     * @returns {Number}
     */
    getWidth: function() {
        return this.$element.width();
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
        globals.app = this.app;
        globals.view = this;
        globals = $.extend(true, globals, properties || {});
        return globals;
    },
    /**
     * @method remove
     * @returns {GelatoView}
     */
    remove: function() {
        this.stopListening();
        this.undelegateEvents();
        $(window).off('resize');
        return this;
    }
});
