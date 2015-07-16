var Application = require('application');

module.exports = (function() {

    $(document).ready(function(){
        window.app = new Application();
        window.app.start();
    });

})();