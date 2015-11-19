var Application = require('./application');

module.exports = (function() {

    function start() {
        new Application().start();
    }

    if (window.cordova) {
        document.addEventListener('deviceready', start, false);
    } else {
        $(document).ready(start);
    }

})();