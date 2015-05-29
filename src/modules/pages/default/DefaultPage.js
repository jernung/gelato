/**
 * @module Application
 * @submodule Pages
 */
define([
    'require.text!modules/pages/default/default-template.html',
    'core/modules/GelatoPage'
], function(Template, GelatoPage) {

    /**
     * @class DefaultPage
     * @extends GelatoPage
     */
    var DefaultPage = GelatoPage.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {},
        /**
         * @property title
         * @type String
         */
        title: 'Default - ' + i18n.global.title,
        /**
         * @method render
         * @returns {DefaultPage}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        }
    });

    return DefaultPage;

});