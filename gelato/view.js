/**
 * @class GelatoView
 * @extends {Backbone.View}
 */
var GelatoView = Backbone.View.extend({
    /**
     * @property $view
     * @type {jQuery}
     */
    $view: null,
    /**
     * @property template
     * @type {Function}
     */
    template: null,
    /**
     * @method getHeight
     * @returns {Number}
     */
    getHeight: function() {
        return this.$view.height();
    },
    /**
     * @method getWidth
     * @returns {Number}
     */
    getWidth: function() {
        return this.$view.width();
    },
    /**
     * @method handleClickHref
     * @param {Event} event
     */
    handleClickHref: function(event) {
        var target = Backbone.$(event.target);
        var href = target.attr('href');
        if (window.app !== undefined &&
            window.app.router !== undefined &&
            href !== undefined &&
            href.indexOf('#') !== 0 &&
            href.indexOf('http://') !== 0 &&
            href.indexOf('https://') !== 0) {
            event.preventDefault();
            window.app.router.navigate(href, {
                replace: target.data('replace') || false,
                trigger: target.data('trigger') || true
            });
        }
    },
    /**
     * @method getContext
     * @param {Object} [context]
     * @returns {Object}
     */
    getContext: function(context) {
        var globals = require('globals') || {};
        globals.app = window.app;
        globals.view = this;
        globals = Backbone.$.extend(true,  globals, context || {});
        return globals;
    },
    /**
     * @method hide
     * @returns {GelatoView}
     */
    hide: function() {
        this.$view.hide(arguments.length ? arguments : 0);
        return this;
    },
    /**
     * @method parseTemplate
     * @param {Function} template
     * @param {Object} [context]
     * @returns {Object}
     */
    parseTemplate: function(template, context) {
        if (typeof template === 'function') {
            return template(this.getContext(context));
        }
        return template;
    },
    /**
     * @method remove
     * @returns {GelatoView}
     */
    remove: function() {
        this.stopListening();
        this.undelegateEvents();
        this.$el.find('*').off();
        this.$el.empty();
        Backbone.$(window).off('resize.View');
        return this;
    },
    /**
     * @method render
     * @returns {GelatoView}
     */
    render: function() {
        this.renderTemplate();
        return this;
    },
    /**
     * @method renderTemplate
     * @param {Object} [context]
     * @returns {GelatoView}
     */
    renderTemplate: function(context) {
        this.$view = Backbone.$(this.parseTemplate(this.template, context));
        this.$el.html(this.$view);
        this.$('a[href]').on('click vclick', this.handleClickHref);
        Backbone.$(window).on('resize.View', (function(event) {
            clearTimeout(this._resize);
            this._resize = setTimeout((function() {
                this._resize = null;
                this.trigger('resize', event);
            }).bind(this), 200);
        }).bind(this));
        return this;
    },
    /**
     * @method show
     * @returns {GelatoView}
     */
    show: function() {
        this.$view.show(arguments.length ? arguments : 0);
        return this;
    }
});

module.exports = GelatoView;
