gelato = (function() {

    /**
     * @property config
     * @type {Object}
     */
    var config = {
        attributes: {
            name: '@@application-name',
            version: '@@application-version'
        },
        fonts: {},
        modules: [
            {
                name: 'core/modules/GelatoLibraries'
            },
            {
                name: 'core/modules/GelatoTests'
            },
            {
                name: 'modules/Application'
            },
            {
                name: 'modules/Router'
            }
        ],
        paths: {
            //framework libraries
            async: 'core/libraries/async-0.9.2',
            backbone: 'core/libraries/backbone-1.1.2',
            'backbone.routefilter': 'core/libraries/backbone.routefilter-0.2.0',
            bootstrap: 'core/libraries/bootstrap-3.3.4',
            'bootstrap.switch': 'core/libraries/bootstrap.switch-3.3.2',
            fastclick: 'core/libraries/fastclick-1.0.6',
            handlebars: 'core/libraries/handlebars-3.0.1',
            jasmine: 'core/libraries/jasmine-2.2.0',
            'jasmine.html': 'core/libraries/jasmine.html-2.2.0',
            jquery: 'core/libraries/jquery-2.1.3',
            'jquery.mobile': 'core/libraries/jquery.mobile.custom-1.4.5',
            'jquery.ui': 'core/libraries/jquery.ui.custom-1.11.3',
            'lzstring': 'core/libraries/lzstring-1.4.3',
            modernizr: 'core/libraries/modernizr.custom-2.8.3',
            moment: 'core/libraries/moment-2.10.2',
            'moment.timezone': 'core/libraries/moment.timezone-0.3.0',
            react: 'core/libraries/react-0.13.2',
            'require.i18n': 'core/libraries/require.i18n-2.0.4',
            'require.text': 'core/libraries/require.text-2.0.12',
            underscore: 'core/libraries/lodash.compat-3.7.0',
            webfont: 'core/libraries/webfontloader-1.5.18'
        },
        plugins: [],
        shim: {
            //framework shims
            backbone: ['jquery', 'underscore'],
            'backbone.routefilter': ['backbone'],
            bootstrap: ['jquery'],
            'bootstrap.switch': ['bootstrap'],
            'jasmine.html': ['jasmine'],
            'jquery.mobile': ['jquery'],
            'jquery.notify': ['jquery'],
            'jquery.ui': ['jquery'],
            'moment.timezones': ['moment']
        }
    };

    /**
     * @property version
     * @type {String}
     */
    var version = '@@framework-version';

    /**
     * @method addCordovaPlugins
     * @param {Array|Object} [plugins]
     */
    function addCordovaPlugins(plugins) {
        config.plugins = mergeArrays(config.plugins, sanitizeArray(plugins));
    }

    /**
     * @method addFonts
     * @param {Object} [fonts]
     */
    function addFonts(fonts) {
        config.fonts = mergeObjects(config.fonts, sanitizeObject(fonts));
    }

    /**
     * @method addModules
     * @param {Array|Object} [modules]
     */
    function addModules(modules) {
        config.modules = mergeArrays(config.modules, sanitizeArray(modules));
    }

    /**
     * @method addPaths
     * @param {Object} [paths]
     */
    function addPaths(paths) {
        config.paths = mergeObjects(config.paths, sanitizeObject(paths));
    }

    /**
     * @method addShim
     * @param {Object} [shim]
     */
    function addShim(shim) {
        config.shim = mergeObjects(config.shim, sanitizeObject(shim));
    }

    /**
     * @method getConfig
     * @param {String} [key]
     * @returns {Array|Object|String}
     */
    function getConfig(key) {
        return key ? config[key] : config;
    }

    /**
     * @method getPushState
     * @returns {Boolean}
     */
    function getPushState() {
        return isCordova() || isLocal() ? false : true;
    }

    /**
     * @method getRoot
     * @returns {String}
     */
    function getRoot() {
        return location.pathname;
    }

    /**
     * @method isCordova
     * @returns {Boolean}
     */
    function isCordova() {
        return location.protocol === 'file:';
    }

    /**
     * @method isLocal
     * @returns {Boolean}
     */
    function isLocal() {
        return location.hostname === 'localhost' || location.port !== '';
    }

    /**
     * @method mergeArrays
     * @param {Array} array1
     * @param {Array} array2
     * @returns {Array}
     */
    function mergeArrays (array1, array2) {
        return array1.concat(array2);
    }

    /**
     * @method mergeObjects
     * @param {Object} object1
     * @param {Object} object2
     * @returns {Object}
     */
    function mergeObjects(object1, object2) {
        for (var key in object2) {
            if (object1[key] && object2[key].constructor === Object) {
                mergeObjects(object1[key], object2[key]);
            } else {
                object1[key] = object2[key];
            }
        }
        return object1;
    }

    /**
     * @method sanitizeArray
     * @param {Array} array
     */
    function sanitizeArray(array) {
        return Array.isArray(array) ? array : [];
    }

    /**
     * @method sanitizeObject
     * @param {Object} object
     */
    function sanitizeObject(object) {
        return Object.prototype.toString.call(object) === '[object Object]' ? object : {};
    }

    return {
        addCordovaPlugins: addCordovaPlugins,
        addFonts: addFonts,
        addModules: addModules,
        addPaths: addPaths,
        addShim: addShim,
        getConfig: getConfig,
        getPushState: getPushState,
        getRoot: getRoot,
        isCordova: isCordova,
        isLocal: isLocal,
        version: version
    };

})();