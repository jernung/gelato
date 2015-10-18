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
     * @property $view
     * @type {jQuery}
     */
    $view: null,
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
     * @method createCollection
     * @param {String} path
     * @param {Array} [models]
     * @param {Object} [options]
     * @returns {GelatoCollection}
     */
    createCollection: function(path, models, options) {
        return new (require(path))(models, options, this.app);
    },
    /**
     * @method createComponent
     * @param {String} path
     * @param {Object} [options]
     * @returns {GelatoComponent}
     */
    createComponent: function(path, options) {
        return new (require(path + '/view'))(options, this.app);
    },
    /**
     * @method createModel
     * @param {String} path
     * @param {Object} [attributes]
     * @param {Object} [options]
     * @returns {GelatoModel}
     */
    createModel: function(path, attributes, options) {
        return new (require(path))(attributes, options, this.app);
    },
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
        var target = $(event.currentTarget);
        var href = target.attr('href');
        if (href.indexOf('#') !== 0 &&
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
     * @method getContext
     * @param {Object} [context]
     * @returns {Object}
     */
    getContext: function(context) {
        globals.view = this;
        globals = $.extend(true, globals, context || {});
        return globals;
    },
    /**
     * @method getName
     * @returns {String}
     */
    getName: function() {
        return this.$el.data('name');
    },
    /**
     * @method getType
     * @returns {String}
     */
    getType: function() {
        return this.$el.data('type');
    },
    /**
     * @method hide
     * @returns {GelatoPage}
     */
    hide: function() {
        Backbone.$.fn.hide.apply(this.$el, arguments);
        return this;
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
        if (this.resize) {
            Backbone.$(window).off('resize', this.resize);
        }
        return this;
    },
    /**
     * @method renderTemplate
     * @param {Object} [context]
     * @returns {GelatoView}
     */
    renderTemplate: function(context) {
        this.$el.html(this.template(this.getContext(context)));
        this.$view = this.$el.children();
        this.$('a[href]').on('click', this.handleClickHref);
        Backbone.$(window).resize((function(event) {
            clearTimeout(this.resize);
            this.resize = setTimeout((function() {
                this.trigger('resize', event);
            }).bind(this), 100);
        }).bind(this));
        return this;
    },
    /**
     * @method show
     * @returns {GelatoPage}
     */
    show: function() {
        Backbone.$.fn.show.apply(this.$el, arguments);
        return this;
    }
});
