/**
 * @module Framework
 */
define([], function() {
    /**
     * @class GelatoView
     * @extends Backbone.View
     */
    var GelatoView = Backbone.View.extend({
        /**
         * @property el
         * @type String
         */
        el: '#application',
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoView}
         */
        renderTemplate: function(template) {
            this.$el.html(Handlebars.compile(template)(app.strings));
            return this;
        }
    });

    return GelatoView;

});