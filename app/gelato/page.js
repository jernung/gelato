var GelatoView = require('gelato/view');

/**
 * @class GelatoPage
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property bodyClass
     * @type {String}
     */
    bodyClass: null,
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
     * @param {Object} [context]
     * @returns {GelatoPage}
     */
    renderTemplate: function(context) {
        if (this.bodyClass) {
            $('body').addClass(this.bodyClass);
        }
        if (this.title) {
            document.title = this.title;
        }
        return GelatoView.prototype.renderTemplate.call(this, context);
    },
    /**
     * @method remove
     * @returns {GelatoPage}
     */
    remove: function() {
        if (this.bodyClass) {
            $('body').removeClass(this.bodyClass);
        }
        if (this.title) {
            document.title = '';
        }
        return GelatoView.prototype.remove.call(this);
    },
    /**
     * @method setTitle
     * @param {String} value
     * @returns {GelatoPage}
     */
    setTitle: function(value) {
        document.title = value;
        this.title = value;
        return this;
    }
});
