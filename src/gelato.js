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

function isLocalhost() {
  return location.hostname === 'localhost';
}

function isWebsite() {
  return _.includes(document.location, 'http');
}

function setCookie(name, value, days) {
  let expires = '';

  if (days) {
    const date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  }

  document.cookie = name + '=' + value + expires + '; path=/';
}

Gelato.getScreenHeight = getScreenHeight;

Gelato.getScreenWidth = getScreenWidth;

Gelato.isCordova = isCordova;

Gelato.isLocalhost = isLocalhost;

Gelato.isWebsite = isWebsite;

Gelato._BUILD = '{!date!}';

Gelato._VERSION = '{!version!}';
