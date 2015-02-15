/**
 * @module Core
 */
define([
    'core/modules/GelatoView',
    'core/modules/GelatoSidebar'
], function(GelatoView, GelatoSidebar) {

    /**
     * @class GelatoPage
     * @extends GelatoView
     */
    var GelatoPage = GelatoView.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {
            this.sidebar = null;
        },
        /**
         * @property el
         * @type String
         */
        el: '#application',
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoPage}
         */
        renderTemplate: function(template) {
            GelatoView.prototype.renderTemplate.call(this, template);
            this.sidebar = new GelatoSidebar({el: this.$el});
            return this;
        },
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
        },
        /**
         * @method remove
         * @returns {GelatoPage}
         */
        remove: function() {
            this.sidebar.remove();
            GelatoView.prototype.remove.call(this);
            return this;
        }
    });

    return GelatoPage;

});