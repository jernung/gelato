/**
 * @module Framework
 */
define([], function() {
    /**
     * @class BaseView
     * @extends Backbone.View
     */
    var BaseView = Backbone.View.extend({
        /**
         * @property el
         * @type String
         */
        el: 'application'
    });

    return BaseView;
});