/**
 * @module Core
 */
define([], function() {

    /**
     * @class GelatoRouter
     * @extends Backbone.Router
     */
    var GelatoRouter = Backbone.Router.extend({
        /**
         * @property page
         * @type GelatoPage
         */
        page: null,
        /**
         * @method after
         */
        after: function() {
            if (this.page) {
                console.log('PAGE:', this.page.getName());
                document.title = this.page.title;
            }
        },
        /**
         * @method before
         */
        before: function() {
            if (this.page) {
                this.page.remove();
                this.page = null;
                window.scrollTo(0, 0);
            }
        },
        /**
         * @method navigate
         * @param {String} fragment
         * @param {Object} [options]
         * @returns {GelatoRouter}
         */
        navigate: function(fragment, options) {
            options = options || {};
            options.replace = options.replace === undefined ? false : options.replace;
            options.trigger = options.trigger === undefined ? true : options.trigger;
            return Backbone.Router.prototype.navigate.call(this, fragment, options);
        },
        /**
         * @method start
         * @returns {GelatoRouter}
         */
        start: function() {
            Backbone.history.start({pushState: true, root: '/'});
            return this;
        }
    });

    return GelatoRouter;

});