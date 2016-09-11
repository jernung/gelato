'use strict';

let Gelato = {};

if ($ === undefined) {
  throw 'Gelato requires jQuery as a dependency.'
} else {
  window.jQuery = window.$ = $;
}

if (_ === undefined) {
  throw 'Gelato requires Lodash as a dependency.'
} else {
  window._ = _;
}

if (Backbone === undefined) {
  throw 'Gelato requires Backbone as a dependency.'
} else {
  window.Backbone = Backbone;
}

Gelato._BUILD = '{!date!}';

Gelato._VERSION = '{!version!}';

Gelato.getCookie = function(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');

  if (parts.length == 2) {
    return parts.pop().split(';').shift();
  }
};

Gelato.isCordova = function() {
  return window.cordova !== undefined;
};

Gelato.isLocalhost = function() {
  return location.hostname === 'localhost';
};

Gelato.isWebsite = function() {
  return location.protocol.indexOf('http') !== -1;
};
