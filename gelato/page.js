var GelatoView = require('./view');

/**
 * @class GelatoPage
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property el
     * @type {String}
     */
    el: 'gelato-application',
    /**
     * @method renderTemplate
     * @param {Object} [context]
     * @returns {GelatoPage}
     */
    renderTemplate: function(context) {
        document.title = _.result(this, 'title', app.get('title'));
        return GelatoView.prototype.renderTemplate.call(this, context);
    },
    /**
     * @method remove
     * @returns {GelatoPage}
     */
    remove: function() {
        return GelatoView.prototype.remove.call(this);
    }
});
