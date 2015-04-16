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
            }
        },
        /**
         * @method start
         * @returns {GelatoRouter}
         */
        start: function() {
            Backbone.history.start({
                pushState: app.getPushState(),
                root: app.getRoot()
            });
            return this;
        }
    });

    return GelatoRouter;

});