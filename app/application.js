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
    initialize: function() {
        console.log('initializing application');
        window.app = this;
    },
    /**
     * @property defaults
     * @type {Object}
     */
    defaults: {
        description: '{!application-description!}',
        title: '{!application-title!}',
        version: '{!application-version!}'
    },
    /**
     * @method start
     */
    start: function() {
        console.log('starting application');
    }
});
