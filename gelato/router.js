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
     * @method go
     * @param {String} path
     * @param {Object} [options]
     * @returns {GelatoPage}
     */
    go: function(path, options) {
        if (this.page) {
            this.page.remove();
        }
        window.scrollTo(0, 0);
        this.page = new (require(path + '/view'))(options);
        return this.page.render();
    },
    /**
     * @method start
     * @returns {Boolean}
     */
    start: function() {
        return Backbone.history.start({
            pushState: app.isWebsite(),
            root: '/'
        });
    }
});
