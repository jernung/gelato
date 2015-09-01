/**
 * @class GelatoRouter
 * @extends {Backbone.Router}
 */
module.exports = Backbone.Router.extend({
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
            document.title = this.page.title || app.get('name');
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
     * @method start
     */
    start: function() {
        Backbone.history.start({pushState: location.protocol !== 'file:'});
    }
});
