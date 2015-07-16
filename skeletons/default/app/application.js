var GelatoApplication = require('gelato/application');

/**
 * @class Application
 * @extends {GelatoApplication}
 */
module.exports = GelatoApplication.extend({
    /**
     * @method initialize
     * @constructor
     */
    initialize: function() {},
    /**
     * @property defaults
     * @type {Object}
     */
    defaults: {
        name: '{!application-name!}',
        timestamp: '{!timestamp!}',
        version: '{!application-version!}'
    },
    /**
     * @method start
     */
    start: function() {
        Backbone.history.start({pushState: true});
    }
});
