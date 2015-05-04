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
         * @property component
         * @typeof {jQuery}
         */
        $component: null,
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoView}
         */
        renderTemplate: function(template) {
            GelatoView.prototype.renderTemplate.call(this, template);
            this.$component = $(this.$('gelato-component').get(0));
            return this;
        },
        /**
         * @method getComponent
         * @returns {jQuery}
         */
        getComponent: function() {
            return this.$component;
        },
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.$component.data('name');
        },
        /**
         * @method height
         * @param {Number} [size]
         * @returns {Number}
         */
        height: function(size) {
            return this.$component.height(size);
        },
        /**
         * @method width
         * @param {Number} [size]
         * @returns {Number}
         */
        width: function(size) {
            return this.$component.width(size);
        }
    });

    return GelatoComponent;

});