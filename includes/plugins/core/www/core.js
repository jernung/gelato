var exec = require('cordova/exec');

module.exports = {
    openGooglePlay: function(packageName) {
        exec(null, null, 'GelatoPluginCore', 'openGooglePlay', [packageName]);
    }
};