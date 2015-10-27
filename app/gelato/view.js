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
        this.app = application || window.app;
        Backbone.View.prototype.constructor.call(this, options);
    },
    /**
     * @property app
     * @type {GelatoApplication}
     */
    app: null,
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
        return this.$el.height();
    },
    /**
     * @method getWidth
     * @returns {Number}
     */
    getWidth: function() {
        return this.$el.width();
    },
    /**
     * @method handleClickHref
     * @param {Event} event
     */
    handleClickHref: function(event) {
        var target = $(event.currentTarget);
        var href = target.attr('href');
        if (this.app !== undefined &&
            href.indexOf('#') !== 0 &&
            href.indexOf('http://') !== 0 &&
            href.indexOf('https://') !== 0) {
            event.preventDefault();
            this.app.router.navigate(href, {
                replace: target.data('replace') || false,
                trigger: target.data('trigger') || true
            });
        }
    },
    /**
     * @method handleResize
     * @param {Event} event
     */
    handleResize: function(event) {
        this.trigger('resize', event);
    },
    /**
     * @method getContext
     * @param {Object} [context]
     * @returns {Object}
     */
    getContext: function(context) {
        globals.app = this.app;
        globals.view = this;
        globals = $.extend(true, globals, context || {});
        return globals;
    },
    /**
     * @method hide
     * @returns {GelatoPage}
     */
    hide: function() {
        this.$el.hide(arguments.length ? arguments : 0);
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
        Backbone.$(window).off('resize', this.handleResize.bind(this));
        return this;
    },
    /**
     * @method renderTemplate
     * @param {Object} [context]
     * @returns {GelatoView}
     */
    renderTemplate: function(context) {
        /***
         * TODO: review this concept for implementation
        this.$view = $(document.createElement('gelato-view'));
        this.$view.html(this.template(this.getContext(context)));
         ***/
        this.$el.html(this.template(this.getContext(context)));
        this.$('a[href]').on('click vclick', this.handleClickHref.bind(this));
        Backbone.$(window).off('resize', this.handleResize.bind(this));
        Backbone.$(window).on('resize', this.handleResize.bind(this));
        return this;
    },
    /**
     * @method show
     * @returns {GelatoView}
     */
    show: function() {
        this.$el.show(arguments.length ? arguments : 0);
        return this;
    }
});
