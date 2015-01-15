/**
 * @module Framework
 */
define(['gelato/GelatoPage', 'require.text!templates/default.html'], function(GelatoPage, Template) {
    /**
     * @class DefaultView
     * @extends GelatoPage
     */
    var DefaultView = GelatoPage.extend({
        /**
         * @method render
         * @returns {GelatoPage}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        }
    });

    return DefaultView;

});