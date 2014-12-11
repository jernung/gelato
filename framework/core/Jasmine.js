define([], function() {

    window.jasmine = jasmineRequire.core(jasmineRequire);

    jasmineRequire.html(jasmine);

    var env = jasmine.getEnv();

    var jasmineInterface = jasmineRequire.interface(jasmine, env);

    if (typeof window == 'undefined' && typeof exports == 'object') {
        extend(exports, jasmineInterface);
    } else {
        extend(window, jasmineInterface);
    }

    var queryString = new jasmine.QueryString({
        getWindowLocation: function() {
            return window.location;
        }
    });

    var catchingExceptions = queryString.getParam('catch');
    env.catchExceptions(typeof catchingExceptions === 'undefined' ? true : catchingExceptions);

    var jasmineReporter = new jasmine.HtmlReporter({
        env: env,
        onRaiseExceptionsClick: function() {
            queryString.setParam('catch', !env.catchingExceptions());
        },
        getContainer: function() {
            return document.getElementById('reporter');
        },
        createElement: function() {
            return document.createElement.apply(document, arguments);
        },
        createTextNode: function() {
            return document.createTextNode.apply(document, arguments);
        },
        timer: new jasmine.Timer()
    });

    env.addReporter(jasmineInterface.jsApiReporter);
    env.addReporter(jasmineReporter);

    window.setTimeout = window.setTimeout;
    window.setInterval = window.setInterval;
    window.clearTimeout = window.clearTimeout;
    window.clearInterval = window.clearInterval;

    function execute() {
        env.updateInterval = 1000;
        env.execute();
    }

    function extend(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }

    function initialize() {
        jasmineReporter.initialize();
    }

    function start() {
        initialize();
        execute();
    }

    return {
        initialize: initialize,
        execute: execute,
        start: start
    };
});