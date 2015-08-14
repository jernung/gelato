/**
 * @class GelatoCollection
 * @extends {Backbone.Collection}
 */
module.exports = Backbone.Collection.extend({
    /**
     * @method constructor
     * @constructor
     */
    constructor: function() {
        Backbone.Collection.apply(this, arguments);
    },
    /**
     * @method fetch
     * @param {Object} [options]
     */
    fetch: function(options) {
        options = options || {};
        this.state = 'fetching';
        this.trigger('state', 'fetching', this);
        this.trigger('state:fetching', this);
        options.error = this._onRequestError.bind(this);
        options.success = this._onRequestSuccess.bind(this);
        return Backbone.Collection.prototype.fetch.call(this, options);
    },
    /**
     * @property standby
     * @type {String}
     */
    state: 'standby',
    /**
     * @method _onRequestError
     * @private
     */
    _onRequestError: function() {
        this.state = 'standby';
        this.trigger('state', 'standby', this);
        this.trigger('state:standby', this);
    },
    /**
     * @method _onRequestSuccess
     * @private
     */
    _onRequestSuccess: function() {
        this.state = 'standby';
        this.trigger('state', 'standby', this);
        this.trigger('state:standby', this);
    }
});
