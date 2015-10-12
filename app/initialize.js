var Application = require('application');

module.exports = (function() {

    function start() {
        document.body.appendChild(document.createElement('gelato-application'));
        document.body.appendChild(document.createElement('bootstrap-dialogs'));
        document.body.appendChild(document.createElement('bootstrap-navbars'));
        new Application().start();
    }

    if (location.protocol === 'file:') {
        $.ajax({
            url: 'cordova.js',
            dataType: 'script'
        }).done(function() {
            document.addEventListener('deviceready', start, false);
        }).fail(function() {
            console.error(new Error('Unable to load cordova.js file.'));
        });
    } else {
        $(document).ready(start);
    }

})();