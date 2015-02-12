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
        el: '#application',
        /**
         * @method getContentHeight
         * @returns {Number}
         */
        getContentHeight: function() {
            return this.$('.gelato-content').height();
        },
        /**
         * @method getContentWidth
         * @returns {Number}
         */
        getContentWidth: function() {
            return this.$('.gelato-content').width();
        }
    });

    return GelatoPage;

});