/**
 * @module Framework
 * @class CoreLibraries
 */
define([
    'async',
    'fastclick',
    'handlebars',
    'moment',
    'react',
    'backbone',
    'backbone.routefilter',
    'bootstrap',
    'bootstrap.switch',
    'createjs.easel',
    'createjs.preload',
    'createjs.sound',
    'createjs.tween',
    'jasmine',
    'jasmine.html',
    'jquery',
    'jquery.mobile',
    'jquery.notify',
    'modernizr',
    'moment.timezone',
    'require.i18n',
    'require.text',
    'underscore',
    'webfont'
], function(Async, FastClick, Handlebars, Moment, React) {
    window.Async = Async;
    window.FastClick = FastClick;
    window.Handlebars = Handlebars;
    window.Moment = Moment;
    window.React = React;
});