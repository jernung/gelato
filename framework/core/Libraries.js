/**
 * @module Framework
 * @class CoreLibraries
 */
define([
    'async',
    'fastclick',
    'handlebars',
    'moment',
    'pouchdb',
    'react',
    'backbone',
    'backbone.routefilter',
    'bootstrap',
    'bootstrap.switch',
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
], function(Async, FastClick, Handlebars, Moment, PouchDB, React) {
    window.Async = Async;
    window.FastClick = FastClick;
    window.Handlebars = Handlebars;
    window.Moment = Moment;
    window.PouchDB = PouchDB;
    window.React = React;
});