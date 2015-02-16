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
        el: '#application',
        /**
         * @method renderDialog
         * @returns {GelatoPage}
         */
        renderDialog: function() {
            this.dialog = new GelatoDialog({el: this.$el, page: this});
            return this;
        },
        /**
         * @method renderSidebar
         * @returns {GelatoPage}
         */
        renderSidebar: function() {
            this.sidebar = new GelatoSidebar({el: this.$el, page: this});
            return this;
        },
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoPage}
         */
        renderTemplate: function(template) {
            GelatoView.prototype.renderTemplate.call(this, template);
            this.renderDialog();
            this.renderSidebar();
            return this;
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