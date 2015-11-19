var GelatoComponent = require('gelato/component');

/**
 * @class Primary
 * @extends {GelatoComponent}
 */
module.exports = GelatoComponent.extend({
    /**
     * @method initialize
     * @constructor
     */
    initialize: function() {},
    /**
     * @property template
     * @type {Function}
     */
    template: require('./template'),
    /**
     * @method render
     * @returns {Primary}
     */
    render: function() {
        this.renderTemplate();
        return this;
    }
});
