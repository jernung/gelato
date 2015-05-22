var exec = require('cordova/exec');

module.exports = {
    /**
     * @method cacheInterstitial
     * @param {String} [location]
     */
    cacheInterstitial: function(location) {
        exec(null, null, 'ChartboostPlugin', 'cacheInterstitial', [location]);
    },
    /**
     * @method cacheRewardedVideo
     * @param {String} [location]
     */
    cacheRewardedVideo: function(location) {
        exec(null, null, 'ChartboostPlugin', 'cacheRewardedVideo', [location]);
    },
    /**
     * @method initialize
     * @param {String} appId
     * @param {String} appSignature
     */
    initialize: function(appId, appSignature) {
        exec(null, null, 'ChartboostPlugin', 'initialize', [appId, appSignature]);
    },
    /**
     * @method showInterstitial
     * @param {String} [location]
     */
    showInterstitial: function(location) {
        exec(null, null, 'ChartboostPlugin', 'showInterstitial', [location]);
    },
    /**
     * @method showRewardedVideo
     * @param {String} [location]
     */
    showRewardedVideo: function(location) {
        exec(null, null, 'ChartboostPlugin', 'showRewardedVideo', [location]);
    }
};