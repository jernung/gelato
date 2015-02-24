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
         * @property activePage
         * @type GelatoPage
         */
        activePage: null,
        /**
         * @method after
         */
        after: function() {
            if (this.activePage) {
                console.log('PAGE:', this.activePage.getName());
                document.title = this.activePage.title;
            }
        },
        /**
         * @method before
         */
        before: function() {
            if (this.activePage) {
                this.activePage.remove();
                this.activePage = null;
            }
        },
        /**
         * @method start
         */
        start: function() {
            Backbone.history.start({pushState: app.getPushState(), root: app.getRoot()});
        }
    });

    return GelatoRouter;

});