/**
 * @module Application
 * @submodule Pages
 */
define([
    'require.text!templates/examples.html',
    'core/modules/GelatoPage'
], function(Template, GelatoPage) {

    /**
     * @class ExamplesView
     * @extends GelatoPage
     */
    var ExamplesView = GelatoPage.extend({
        /**
         * @method render
         * @returns {ExamplesView}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        },
        /**
         * @property events
         * @type Object
         */
        events: {}
    });

    return ExamplesView;

});