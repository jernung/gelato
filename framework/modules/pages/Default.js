/**
 * @module Application
 * @submodule Pages
 */
define([
    'require.text!templates/default.html',
    'core/modules/GelatoPage'
], function(Template, GelatoPage) {

    /**
     * @class DefaultView
     * @extends GelatoPage
     */
    var DefaultView = GelatoPage.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {},
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