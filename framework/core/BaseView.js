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
        el: '#application',
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {BaseView}
         */
        renderTemplate: function(template) {
            this.$el.html(Handlebars.compile(template)(app.strings));
            return this;
        }
    });

    return BaseView;
});