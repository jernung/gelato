/**
 * @module Core
 */
define([
    'require.text!modules/dialogs/dialogs-template.html',
    'core/modules/GelatoView'
], function(
    Template,
    GelatoView
) {

    /**
     * @class GelatoDialogs
     * @extends GelatoView
     */
    var GelatoDialogs = GelatoView.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {
            this.dialog = null;
            this.element = null;
            this.state = 'hidden';
            this.render();
        },
        /**
         * @property el
         * @type String
         */
        el: 'body',
        /**
         * @method render
         * @returns {GelatoDialogs}
         */
        render: function() {
            this.renderTemplate(Template, 'gelato-dialogs');
            return this;
        },
        /**
         * @property events
         * @type Object
         */
        events: {
            'vclick button': 'handleClickButton',
            'vclick .button': 'handleClickButton'
        },
        /**
         * @method hide
         * @returns {GelatoDialogs}
         */
        close: function() {
            this.dialog.modal('hide');
            return this;
        },
        /**
         * @method getDialogName
         * @returns {String}
         */
        getDialogName: function() {
            return this.element ? this.element.data('name') : null;
        },
        /**
         * @method handleClickButton
         * @param event
         */
        handleClickButton: function(event) {
            var buttonAction = $(event.currentTarget).data('action');
            var dialogName = this.getDialogName();
            if (buttonAction) {
                this.trigger(dialogName + ':' + buttonAction, this.dialog);
                this.trigger(dialogName + ':click', buttonAction, this.dialog);
                this.trigger('button:click', dialogName + ':' + buttonAction, this.dialog);
            } else {
                this.trigger('button:click', dialogName, this.dialog);
            }
        },
        /**
         * @method handleModalHide
         */
        handleModalHide: function() {
            this.state = 'hide';
            this.trigger(this.getDialogName() + ':hide', this.dialog);
            this.trigger('hide', this.dialog);
        },
        /**
         * @method handleModalHidden
         * @param {Event} event
         */
        handleModalHidden: function(event) {
            $(event.target).find('*').off();
            var dialogName = this.getDialogName();
            this.state = 'hidden';
            this.dialog = null;
            this.element = null;
            this.trigger(dialogName + ':hidden', this.dialog);
            this.trigger('hidden');
        },
        /**
         * @method handleModalShow
         */
        handleModalShow: function() {
            this.state = 'show';
            this.trigger(this.getDialogName() + ':show', this.dialog);
            this.trigger('show', this.dialog);
        },
        /**
         * @method handleModalShown
         */
        handleModalShown: function() {
            this.state = 'shown';
            this.trigger(this.getDialogName() + ':shown', this.dialog);
            this.trigger('shown', this.dialog);
        },
        /**
         * @method open
         * @param {String} name
         * @param {Object} [options]
         * @returns {GelatoDialogs}
         */
        open: function(name, options) {
            options = options || {};
            options.backdrop = options.backdrop || 'static';
            options.keyboard = options.keyboard || false;
            options.show = options.show || true;
            options.remote = options.remote || false;
            if (this.state === 'hidden') {
                this.element = this.$('gelato-dialog[data-name="' + name + '"]');
                if (this.element.length) {
                    this.dialog = this.element.find('[role="dialog"]');
                    this.dialog.one('show.bs.modal', $.proxy(this.handleModalShow, this));
                    this.dialog.one('shown.bs.modal', $.proxy(this.handleModalShown, this));
                    this.dialog.one('hide.bs.modal', $.proxy(this.handleModalHide, this));
                    this.dialog.one('hidden.bs.modal', $.proxy(this.handleModalHidden, this));
                    this.dialog.modal(options);
                } else {
                    console.error(new Error('Dialog "' + name +  '" does not exist.'));
                }
            }
            return this;
        }
    });

    return GelatoDialogs;

});
