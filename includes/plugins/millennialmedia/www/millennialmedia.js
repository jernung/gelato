var exec = require('cordova/exec');

module.exports = {
    /**
     * @method showBanner
     * @param {String} apid
     */
    showBanner: function(apid) {
        exec(null, null, 'GelatoPluginMillennialMedia', 'showBanner', [apid]);
    }
};