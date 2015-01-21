/**
 * @module Framework
 */
define(['gelato/GelatoView'], function(GelatoView) {
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
            return this.$('.content').height();
        },
        /**
         * @method getContentWidth
         * @returns {Number}
         */
        getContentWidth: function() {
            return this.$('.content').width();
        }
    });

    return GelatoPage;

});