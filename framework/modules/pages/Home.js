/**
 * @module Application
 * @submodule Pages
 */
define([
    'require.text!templates/home.html',
    'core/modules/GelatoPage'
], function(Template, GelatoPage) {

    /**
     * @class PageHome
     * @extends GelatoPage
     */
    var PageHome = GelatoPage.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {},
        /**
         * @method render
         * @returns {PageHome}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        }
    });

    return PageHome;

});