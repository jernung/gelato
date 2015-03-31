var exec = require('cordova/exec');

module.exports = {
    /**
     * @method setTrackerId
     * @param {String} trackerId
     * @param {Function} [callbackSuccess]
     * @param {Function} [callbackError]
     */
    setTrackerId: function(trackerId, callbackSuccess, callbackError) {
        exec(callbackSuccess, callbackError, 'GelatoPluginGoogleAnalytics', 'setTrackerId', [trackerId]);
    },
    /**
     * @method setTrackerId
     * @param {String} name
     * @param {Function} [callbackSuccess]
     * @param {Function} [callbackError]
     */
    trackView: function(name, callbackSuccess, callbackError) {
        exec(callbackSuccess, callbackError, 'GelatoPluginGoogleAnalytics', 'trackView', [name]);
    }
};