var Application = require('application');

module.exports = (function() {

    function prepareDOM() {
        document.body.appendChild(document.createElement('gelato-application'));
        document.body.appendChild(document.createElement('gelato-dialogs'));
        document.body.appendChild(document.createElement('gelato-navbars'));
        document.body.appendChild(document.createElement('gelato-sidebars'));
    }

    function start() {
        prepareDOM();
        window.app = new Application();
        window.app.start();
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