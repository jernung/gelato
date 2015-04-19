/**
 * @module Core
 */
define([
    'core/modules/GelatoView'
], function(GelatoView) {

    /**
     * @class GelatoPage
     * @extends GelatoView
     */
    var GelatoPage = GelatoView.extend({
        /**
         * @property el
         * @type String
         */
        el: 'gelato-application',
        /**
         * @property title
         * @type String
         */
        title: i18n.global.title,
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.$('gelato-page').data('name');
        }
    });

    return GelatoPage;

});