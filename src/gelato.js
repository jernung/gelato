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

function getScreenHeight() {
  return $(window).height();
}

function getScreenWidth() {
  return $(window).width();
}

function isCordova() {
  return _.isObject(window.cordova);
}

function isFileSystem() {
  return location.protocol === 'file:';
}

function isLocalhost() {
  return location.hostname === 'localhost';
}

function isWebsite() {
  return _.includes(['http:', 'https:'], location.protocol);
}

Gelato.getScreenHeight = getScreenHeight;

Gelato.getScreenWidth = getScreenWidth;

Gelato.isCordova = isCordova;

Gelato.isFileSystem = isFileSystem;

Gelato.isLocalhost = isLocalhost;

Gelato.isWebsite = isWebsite;

Gelato._BUILD = '{!date!}';

Gelato._VERSION = '{!version!}';
