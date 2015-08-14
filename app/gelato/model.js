/**
 * @class GelatoModel
 * @extends {Backbone.Model}
 */
module.exports = Backbone.Model.extend({
    /**
     * @method constructor
     * @constructor
     */
    constructor: function() {
        Backbone.Model.apply(this, arguments);
    },
    /**
     * @method fetch
     * @param {Object} [options]
     */
    fetch: function(options) {
        this.state = 'fetching';
        this._triggerState();
        this._handleRequestEvent(options);
        return Backbone.Model.prototype.fetch.call(this, options);
    },
    /**
     * @method save
     * @param [attributes]
     * @param [options]
     */
    save: function(attributes, options) {
        this.state = 'saving';
        this._triggerState();
        this._handleRequestEvent(options);
        return Backbone.Model.prototype.save.call(this, attributes, options);
    },
    /**
     * @method _handleRequestEvent
     * @param {Object} options
     * @private
     */
    _handleRequestEvent: function(options) {
        var internalOptions = options || {};
        var originalOptions = _.clone(options || {});
        internalOptions.complete = (function() {
            this._triggerState();
            if (typeof originalOptions.complete === 'function') {
                originalOptions.complete.apply(originalOptions, arguments);
            }
        }).bind(this);
        internalOptions.error = (function() {
            this.state = 'standby';
            if (typeof originalOptions.error === 'function') {
                originalOptions.error.apply(originalOptions, arguments);
            }
        }).bind(this);
        internalOptions.success = (function() {
            this.state = 'standby';
            if (typeof originalOptions.complete === 'function') {
                originalOptions.success.apply(original, arguments);
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
