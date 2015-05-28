/**
 * @module Core
 */
define([
    'require.text!modules/sidebars/sidebars-template.html',
    'core/modules/GelatoView'
], function(
    Template,
    GelatoView
) {

    /**
     * @class GelatoSidebars
     * @extends GelatoView
     */
    var GelatoSidebars = GelatoView.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {
            this.element = null;
            this.sidebar = null;
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
         * @returns {GelatoSidebars}
         */
        render: function() {
            this.renderTemplate(Template, 'gelato-sidebars');
            return this;
        },
        /**
         * @property events
         * @type Object
         */
        events: {},
        /**
         * @method close
         * @returns {GelatoSidebars}
         */
        close: function() {
            this.sidebar.offcanvas('hide');
            return this;
        },
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.element ? this.element.data('name') : null;
        },
        /**
         * @method handleSidebarHide
         * @param {Event} event
         */
        handleSidebarHide: function(event) {
            this.state = 'hide';
            this.trigger('hide', event);
        },
        /**
         * @method handleSidebarHidden
         * @param {Event} event
         */
        handleSidebarHidden: function(event) {
            $(event.target).find('*').off();
            this.element = null;
            this.sidebar = null;
            this.state = 'hidden';
            this.trigger('hidden', event);
        },
        /**
         * @method handleSidebarShow
         * @param {Event} event
         */
        handleSidebarShow: function(event) {
            this.state = 'show';
            this.trigger('show', event);
        },
        /**
         * @method handleSidebarShown
         * @param {Event} event
         */
        handleSidebarShown: function(event) {
            this.state = 'shown';
            this.trigger('shown', event);
        },
        /**
         * @method open
         * @param {String} name
         * @param {Object} [options]
         * @returns {GelatoSidebars}
         */
        open: function(name, options) {
            options = options || {};
            this.element = this.$('gelato-sidebar[data-name="' + name + '"]');
            if (this.element.length) {
                this.sidebar = this.element.find('[role="navigation"]');
                this.sidebar.one('show.bs.offcanvas', $.proxy(this.handleSidebarShow, this));
                this.sidebar.one('shown.bs.offcanvas', $.proxy(this.handleSidebarShown, this));
                this.sidebar.one('hide.bs.offcanvas', $.proxy(this.handleSidebarHide, this));
                this.sidebar.one('hidden.bs.offcanvas', $.proxy(this.handleSidebarHidden, this));
                this.sidebar.offcanvas(options);
            } else {
                console.error(new Error('Sidebar "' + name +  '" does not exist.'));
            }
            return this;
        }
    });

    return GelatoSidebars;

});
