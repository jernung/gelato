window.Gelato = require('gelato/global');

module.exports = (function() {

  function start() {
    window.app = new (require('./application'))();
    window.app.start();
  }

  if (window.cordova) {
    document.addEventListener('deviceready', start, false);
  } else {
    $(document).ready(start);
  }

})();
