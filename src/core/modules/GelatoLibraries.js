/**
 * @module Framework
 * @class GelatoLibraries
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
    'bootstrap.notify',
    'bootstrap.switch',
    'jasmine',
    'jasmine.html',
    'jquery',
    'jquery.chosen',
    'jquery.mobile',
    'jquery.ui',
    'lzstring',
    'modernizr',
    'moment.timezone',
    'require.i18n',
    'require.text',
    'underscore',
    'webfontloader'
], function(Async, FastClick, Handlebars, Moment, React) {
    window.Async = Async;
    window.FastClick = FastClick;
    window.Handlebars = Handlebars;
    window.Moment = Moment;
    window.React = React;
});