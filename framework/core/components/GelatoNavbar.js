/**
 * @module Core
 * @submodule Components
 */
define([
    'require.text!../../templates/gelato-navbar.html',
    '../modules/GelatoView'
], function(Template, GelatoView) {

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
