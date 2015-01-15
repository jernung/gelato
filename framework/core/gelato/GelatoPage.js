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
        el: '#application'
    });

    return GelatoPage;

});