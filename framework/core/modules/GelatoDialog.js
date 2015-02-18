/**
 * @module Core
 */
define([
    'core/modules/GelatoView'
], function(GelatoView) {

    /**
     * @class GelatoSidebar
     * @extends GelatoView
     */
    var GelatoSidebar = GelatoView.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function(options) {
            options = options === undefined ? {} : options;
            this.element = options.name === undefined ? $(this.$('.gelato-sidebar').get(0)) : this.$('#sidebar-' + options.name);
            this.page = options.page;
        },
        /**
         * @property events
         * @type Object
         */
        events: {},
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.element.get(0).id.replace('sidebar-', '');
        }
    });

    return GelatoSidebar;

});
