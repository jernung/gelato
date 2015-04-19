/**
 * @module Core
 */
define([
    'core/modules/GelatoView'
], function(GelatoView) {

    /**
     * @class GelatoComponent
     * @extends GelatoView
     */
    var GelatoComponent = GelatoView.extend({
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.$('gelato-component').data('name');
        }
    });

    return GelatoComponent;

});