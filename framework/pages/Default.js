/**
 * @module Application
 * @submodule Pages
 */
define([
    'core/views/GelatoPage',
    'core/components/GelatoNavbar',
    'require.text!templates/default.html'
], function(GelatoPage, GelatoNavbar, Template) {

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