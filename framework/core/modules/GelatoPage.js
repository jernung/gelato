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
            this.$((selector ? selector + ' ': '') + ':input').prop('disabled', true);
            return this;
        },
        /**
         * @method enableForm
         * @param {String} [selector]
         * @returns {GelatoPage}
         */
        enableForm: function(selector) {
            this.$((selector ? selector: ' ') + ':input').prop('disabled', false);
            return this;
        },
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
            //this.renderDialog();
            //this.renderSidebar();
            return this;
        },
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.$('.gelato-page').attr('class').split(/\s/g)[1];
        },
        /**
         * @method remove
         * @returns {GelatoView}
         */
        remove: function() {
            //this.dialog.remove();
            //this.sidebar.remove();
            return GelatoView.prototype.remove.call(this);
        }
    });

    return GelatoPage;

});