/**
 * @module Framework
 */
define([], function() {
    /**
     * @class BaseRouter
     * @extends Backbone.Router
     */
    var BaseRouter = Backbone.Router.extend({
        /**
         * @method after
         */
        after: function(route) {},
        /**
         * @method before
         */
        before: function(route) {},
        /**
         * @method start
         */
        start: function() {
            Backbone.history.start({pushState: app.getPushState(), root: app.getRoot()});
        }
    });

    return BaseRouter;

});