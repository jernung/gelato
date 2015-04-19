/**
 * @module Core
 */
define([
    'require.text!templates/components/dialogs.html',
    'core/modules/GelatoView'
], function(Template, GelatoView) {

    /**
     * @class GelatoDialog
     * @extends GelatoView
     */
    var GelatoDialog = GelatoView.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {
            this.element = null;
            this.state = 'hidden';
            this.render();
        },
        /**
         * @property el
         * @type String
         */
        el: 'gelato-dialog',
        /**
         * @method render
         * @returns {GelatoDialog}
         */
        render: function() {
            this.renderTemplate(Template);
            return this;
        },
        /**
         * @property events
         * @type Object
         */
        events: {
            'vclick button': 'handleClickButton'
        },
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
          return this.element ? this.element.get(0).id : null;
        },
        /**
         * @method handleClickButton
         * @param event
         */
        handleClickButton: function(event) {
            var buttonAction = $(event.currentTarget).data('action');
            var dialogName = this.getName();
            if (buttonAction) {
                this.trigger(dialogName + ':' + buttonAction, event);
                this.trigger('button:click', dialogName + ':' + buttonAction, event);
            } else {
                this.trigger('button:click', dialogName, event);
            }
        },
        /**
         * @method handleModalHide
         * @param {Event} event
         */
        handleModalHide: function(event) {
            this.state = 'hide';
            this.trigger('hide', event);
        },
        /**
         * @method handleModalHidden
         * @param {Event} event
         */
        handleModalHidden: function(event) {
            $(event.target).find('*').off();
            this.state = 'hidden';
            this.element = null;
            this.$el.removeClass('active');
            this.trigger('hidden', event);
        },
        /**
         * @method handleModalShow
         * @param {Event} event
         */
        handleModalShow: function(event) {
            this.state = 'show';
            this.trigger('show', event);
        },
        /**
         * @method handleModalShown
         * @param {Event} event
         */
        handleModalShown: function(event) {
            this.state = 'shown';
            this.trigger('shown', event);
        },
        /**
         * @method hide
         * @returns {GelatoDialog}
         */
        hide: function() {
            this.element.modal('hide');
            return this;
        },
        /**
         * @method show
         * @param {String} name
         * @param {Object} [options]
         * @returns {GelatoDialog}
         */
        show: function(name, options) {
            options = options || {};
            options.backdrop = options.backdrop || 'static';
            options.keyboard = options.keyboard || false;
            options.show = options.show || true;
            options.remote = options.remote || false;
            if (this.state === 'hidden') {
                this.$el.addClass('active');
                this.element = this.$('#' + name);
                this.element.one('show.bs.modal', $.proxy(this.handleModalShow, this));
                this.element.one('shown.bs.modal', $.proxy(this.handleModalShown, this));
                this.element.one('hide.bs.modal', $.proxy(this.handleModalHide, this));
                this.element.one('hidden.bs.modal', $.proxy(this.handleModalHidden, this));
                this.element.modal(options);
            }
            return this;
        }
    });

    return GelatoDialog;

});
