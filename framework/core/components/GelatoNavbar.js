/**
 * @module Core
 * @submodule Components
 */
define([
    'core/views/GelatoView',
    'require.text!core/templates/gelato-navbar.html'
], function(GelatoView, Template) {

    /**
     * @class GelatoNavbar
     * @extends GelatoView
     * @constructor
     */
    var GelatoNavbar = GelatoView.extend({
        /**
         * @method render
         * @returns {GelatoNavbar}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        }
    });

    return GelatoNavbar;

});
