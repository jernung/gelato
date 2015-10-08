/**
 * @class GelatoRouter
 * @extends {Backbone.Router}
 */
module.exports = Backbone.Router.extend({
    /**
     * @method constructor
     * @param {Object} [options]
     * @param {GelatoApplication} [application]
     */
    constructor: function(options, application) {
        this.app = application;
        Backbone.Router.prototype.constructor.call(this, options);
    },
    /**
     * @property app
     * @type {GelatoApplication}
     */
    app: null,
    /**
     * @property page
     * @type {String}
     */
    page: null,
    /**
     * @method after
     */
    after: function() {
        if (this.page) {
            document.title = this.page.title || this.app.get('name');
            window.scrollTo(0, 0);
        }
    },
    /**
     * @method before
     */
    before: function() {
        if (this.page) {
            this.page.remove();
        }
    },
    /**
     * @method createPage
     * @param {String} name
     * @param {Object} [options]
     * @returns {GelatoPage}
     */
    createPage: function(name, options) {
        return new (require('pages/' + name + '/view'))(options, this.app);
    },
    /**
     * @method start
     * @returns {Boolean}
     */
    start: function() {
        return Backbone.history.start({
            pushState: location.protocol !== 'file:',
            root: '/'
        });
    }
});
