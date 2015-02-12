/**
 * @module Application
 * @submodule Pages
 */
define([
    'require.text!templates/default.html',
    'core/modules/GelatoPage',
    'core/components/GelatoNavbar'
], function(Template, GelatoPage, GelatoNavbar) {

    /**
     * @class DefaultView
     * @extends GelatoPage
     */
    var DefaultView = GelatoPage.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {
            this.navbar = new GelatoNavbar();
        },
        /**
         * @method render
         * @returns {GelatoPage}
         */
        render: function() {
            this.renderTemplate(Template);
            this.navbar.setElement(this.$('.gelato-navbar')).render();
            return this;
        }
    });

    return DefaultView;

});