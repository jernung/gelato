var GelatoView = require('gelato/view');

/**
 * @class GelatoPage
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property $element
     * @type {jQuery}
     */
    $element: null,
    /**
     * @property bodyClass
     * @type {String}
     */
    bodyClass: null,
    /**
     * @property application
     * @type {GelatoApplication}
     */
    app: null,
    /**
     * @property el
     * @type {String}
     */
    el: 'gelato-application',
    /**
     * @property title
     * @type {String}
     */
    title: null,
    /**
     * @method renderTemplate
     * @param {Object} [properties]
     * @returns {GelatoPage}
     */
    renderTemplate: function(properties) {
        GelatoView.prototype.renderTemplate.call(this, properties);
        this.$element = $(this.$('gelato-page').get(0));
        if (this.bodyClass) {
            $('body').addClass(this.bodyClass);
        }
        return this;
    },
    /**
     * @method createComponent
     * @param {String} name
     * @param {Object} [options]
     * @returns {GelatoComponent}
     */
    createComponent: function(name, options) {
        return new (require('components/' + name + '/view'))(options, this.app);
    },
    /**
     * @method getName
     * @returns {String}
     */
    getName: function() {
        return this.$element.data('name');
    },
    /**
     * @method hide
     * @returns {GelatoPage}
     */
    hide: function() {
        this.$element.hide();
        return this;
    },
    /**
     * @method remove
     * @returns {GelatoPage}
     */
    remove: function() {
        if (this.bodyClass) {
            $('body').removeClass(this.bodyClass);
        }
        this.$element.empty();
        this.$element.find('*').off();
        return GelatoView.prototype.remove.call(this);
    },
    /**
     * @method setTitle
     * @param {String} value
     * @returns {GelatoPage}
     */
    setTitle: function(value) {
        document.title = this.title = value;
        return this;
    },
    /**
     * @method show
     * @returns {GelatoPage}
     */
    show: function() {
        this.$element.show();
        return this;
    }
});
