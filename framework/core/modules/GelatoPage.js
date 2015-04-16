/**
 * @module Core
 */
define([
    'core/modules/GelatoView',
    'core/modules/GelatoDialog',
    'core/modules/GelatoSidebar'
], function(GelatoView, GelatoDialog, GelatoSidebar) {

    /**
     * @class GelatoPage
     * @extends GelatoView
     */
    var GelatoPage = GelatoView.extend({
        /**
         * @property el
         * @type String
         */
        el: '#gelato-application',
        /**
         * @property title
         * @type String
         */
        title: app.strings.global.title,
        /**
         * @method disableForm
         * @param {String} [selector]
         * @returns {GelatoPage}
         */
        disableForm: function(selector) {
            this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', true);
            return this;
        },
        /**
         * @method enableForm
         * @param {String} [selector]
         * @returns {GelatoPage}
         */
        enableForm: function(selector) {
            this.$((selector ? selector : ' ') + ':input').prop('disabled', false);
            return this;
        },
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoPage}
         */
        renderTemplate: function(template) {
            GelatoView.prototype.renderTemplate.call(this, template);
            return this;
        },
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.$('.gelato-page').attr('class').split(/\s/g)[1];
        }
    });

    return GelatoPage;

});