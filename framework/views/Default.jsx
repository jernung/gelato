/**
 * @module Framework
 */
define(['core/GelatoView', 'require.text!templates/default.html'], function(GelatoView, Template) {
    /**
     * @class DefaultView
     * @extends GelatoView
     */
    var DefaultView = GelatoView.extend({
        /**
         * @method render
         * @returns {DefaultView}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        }
    });

    return DefaultView;

});