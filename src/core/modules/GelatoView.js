/**
 * @module Core
 */
define([], function() {

    /**
     * @class GelatoView
     * @extends Backbone.View
     */
    var GelatoView = Backbone.View.extend({
        /**
         * @method initialize
         * @param {Object} [options]
         * @constructor
         */
        initialize: function(options) {
            options = options || {};
            this.app = options.app;
        },
        /**
         * @method renderEvents
         * @returns {GelatoView}
         */
        renderEvents: function() {
            var self = this;
            var resize = null;
            this.$('[data-dialog]').off().on('vclick', $.proxy(this.handleClickDataDialog, this));
            this.$('[data-sidebar]').off().on('vclick', $.proxy(this.handleClickDataSidebar, this));
            this.$('[data-url]').off().on('vclick', $.proxy(this.handleClickDataUrl, this));
            $(window).resize(function(event) {
                clearTimeout(resize);
                resize = setTimeout(function() {
                    self.trigger('resize', event);
                }, 100);
            });
            return this;
        },
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoView}
         */
        renderTemplate: function(template) {
            this.$el.html(Handlebars.compile(template)(i18n));
            this.renderEvents();
            return this;
        },
        /**
         * @method disableForm
         * @param {String} [selector]
         * @returns {GelatoView}
         */
        disableForm: function(selector) {
            this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', true);
            return this;
        },
        /**
         * @method enableForm
         * @param {String} [selector]
         * @returns {GelatoView}
         */
        enableForm: function(selector) {
            this.$((selector ? selector : ' ') + ':input').prop('disabled', false);
            return this;
        },

        /**
         * @method handleClickDataDialog
         * @param {Event} event
         */
        handleClickDataDialog: function(event) {
            event.preventDefault();
            var dialogName = $(event.currentTarget).data('dialog');
            if (this.app && this.app.dialog) {
                this.app.dialog.show(dialogName);
            }
        },
        /**
         * @method handleClickDataSidebar
         * @param {Event} event
         */
        handleClickDataSidebar: function(event) {
            event.preventDefault();
            var sidebarName = $(event.currentTarget).data('sidebar');
            if (this.app && this.app.sidebar) {
                this.app.sidebar.show(sidebarName);
            }
        },
        /**
         * @method handleClickDataUrl
         * @param {Event} event
         */
        handleClickDataUrl: function(event) {
            event.preventDefault();
            var url = $(event.currentTarget).data('url').replace('#', gelato.isLocal() ? '/#' : '');
            var replace = $(event.currentTarget).data('replace');
            var trigger = $(event.currentTarget).data('trigger');
            this.app.router.navigate(url, {
                replace: replace === undefined ? false : replace,
                trigger: trigger === undefined ? true : trigger
            });
        },
        /**
         * @method hide
         * @returns {GelatoView}
         */
        hide: function() {
            this.$el.hide();
            return this;
        },
        /**
         * @method remove
         * @returns {GelatoView}
         */
        remove: function() {
            this.$el.empty();
            this.$el.find('*').off();
            this.stopListening();
            this.undelegateEvents();
            $(window).off('resize');
            return this;
        },
        /**
         * @method show
         * @returns {GelatoView}
         */
        show: function() {
            this.$el.show();
            return this;
        }
    });

    return GelatoView;

});