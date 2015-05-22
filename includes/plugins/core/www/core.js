var exec = require('cordova/exec');

module.exports = {
    /**
     * @method openGooglePlay
     * @param {String} packageName
     */
    openGooglePlay: function(packageName) {
        exec(null, null, 'GelatoCorePlugin', 'openGooglePlay', [packageName]);
    }
};