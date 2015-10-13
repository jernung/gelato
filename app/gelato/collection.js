/**
 * @class GelatoCollection
 * @extends {Backbone.Collection}
 */
module.exports = Backbone.Collection.extend({
    /**
     * @method constructor
     * @param {Array} [models]
     * @param {Object} [options]
     * @param {GelatoApplication} [application]
     * @constructor
     */
    constructor: function(models, options, application) {
        this.app = application;
        Backbone.Collection.prototype.constructor.call(this, models, options);
    },
    /**
     * @property app
     * @type {GelatoApplication}
     */
    app: null,
    /**
     * @property state
     * @type {String}
     */
    state: 'standby',
    /**
     * @method createCollection
     * @param {String} path
     * @param {Array} [models]
     * @param {Object} [options]
     * @returns {GelatoCollection}
     */
    createCollection: function(path, models, options) {
        return new (require(path))(models, options, this.app);
    },
    /**
     * @method createModel
     * @param {String} path
     * @param {Object} [attributes]
     * @param {Object} [options]
     * @returns {GelatoModel}
     */
    createModel: function(path, attributes, options) {
        return new (require(path))(attributes, options, this.app);
    },
    /**
     * @method fetch
     * @param {Object} [options]
     */
    fetch: function(options) {
        options = options || {};
        if (this.state !== 'standby') {
            throw new Error('Unable to fetch while syncing.');
        }
        this.state = 'fetching';
        this._triggerState();
        this._handleRequestEvent(options);
        return Backbone.Collection.prototype.fetch.call(this, options);
    },
    /**
     * @method _handleRequestEvent
     * @param {Object} options
     * @private
     */
    _handleRequestEvent: function(options) {
        var originalOptions = _.clone(options);
        options.complete = (function() {
            this._triggerState();
            if (typeof originalOptions.complete === 'function') {
                originalOptions.complete.apply(originalOptions, arguments);
            }
        }).bind(this);
        options.error = (function() {
            this.state = 'standby';
            if (typeof originalOptions.error === 'function') {
                originalOptions.error.apply(originalOptions, arguments);
            }
        }).bind(this);
        options.success = (function() {
            this.state = 'standby';
            if (typeof originalOptions.success === 'function') {
                originalOptions.success.apply(originalOptions, arguments);
            }
        }).bind(this);
    },
    /**
     * @method _triggerState
     * @private
     */
    _triggerState: function() {
        this.trigger('state', this.state, this);
        this.trigger('state:' + this.state, this);
    }
});
