'use strict';

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

var Gelato = {};

Gelato._BUILD = '{!date!}';

Gelato._VERSION = '{!version!}';

Gelato.isLocalhost = function() {
  return location.hostname === 'localhost';
};

Gelato.isWebsite = function() {
  return _.includes(location.protocol, 'http');
};
