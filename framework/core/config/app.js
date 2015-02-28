app = (function() {

    /**
     * @property attributes
     * @type {Object}
     */
    var attributes = {
        name: '@@application-name',
        version: '@@application-version'
    };

    /**
     * @property config
     * @type {Object}
     */
    var config = {
        modules: [
            {
                name: 'core/modules/GelatoLibraries'
            },
            {
                name: 'core/modules/GelatoTests'
            },
            {
                name: 'modules/models/Application'
            }
        ],
        paths: {
            //framework libraries
            async: 'core/libraries/async-0.9.2',
            backbone: 'core/libraries/backbone-1.1.2',
            'backbone.routefilter': 'core/libraries/backbone.routefilter-0.2.0',
            bootstrap: 'core/libraries/bootstrap-3.3.2',
            'bootstrap.switch': 'core/libraries/bootstrap.switch-3.3.2',
            fastclick: 'core/libraries/fastclick-1.0.6',
            firebase: 'core/libraries/firebase-2.2.0',
            handlebars: 'core/libraries/handlebars-3.0.0',
            jasmine: 'core/libraries/jasmine-2.2.0',
            'jasmine.html': 'core/libraries/jasmine.html-2.2.0',
            jquery: 'core/libraries/jquery-2.1.3',
            'jquery.mobile': 'core/libraries/jquery.mobile.custom-1.4.5',
            'jquery.notify': 'core/libraries/jquery.notify-0.3.1',
            'jquery.ui': 'core/libraries/jquery.ui.custom-1.11.3',
            'lzstring': 'core/libraries/lzstring-1.4.0',
            modernizr: 'core/libraries/modernizr.custom-2.8.3',
            moment: 'core/libraries/moment-2.9.0',
            'moment.timezone': 'core/libraries/moment.timezone-0.3.0',
            react: 'core/libraries/react-0.12.2',
            'require.i18n': 'core/libraries/require.i18n-2.0.4',
            'require.text': 'core/libraries/require.text-2.0.12',
            underscore: 'core/libraries/lodash.compat-3.3.1',
            webfont: 'core/libraries/webfontloader-1.5.14'
        },
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
     * @property fonts
     * @type {Object}
     */
    var fonts = {};

    /**
     * @property framework
     * @type {Object}
     */
    var framework = {
        type: 'gelato',
        version: '@@framework-version'
    };

    /**
     * @method addFonts
     * @param {Object} [fonts]
     */
    function addFonts(fonts) {
        mergeObjects(this.fonts, fonts);
    }

    /**
     * @method addPaths
     * @param {Object} [paths]
     */
    function addPaths(paths) {
        mergeObjects(this.config.paths, paths);
    }

    /**
     * @method addShim
     * @param {Object} [shim]
     */
    function addShim(shim) {
        mergeObjects(this.config.shim, shim);
    }

    /**
     * @method getHeight
     * @returns {Number}
     */
    function getHeight() {
        return $(window).height();
    }

    /**
     * @method getLocalStorageSize
     * @returns {Number}
     */
    function getLocalStorageSize() {
        var size = 0;
        for (var key in localStorage) {
            size += localStorage[key].length * 2;
        }
        return parseFloat((size / 1024 / 1024).toFixed(2));
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
     * @method getSetting
     * @param {String} name
     * @returns {String}
     */
    function getSetting(name) {
        return localStorage.getItem('application-' + name);
    }

    /**
     * @method getWidth
     * @returns {Number}
     */
    function getWidth() {
        return $(window).width();
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
     * @method reload
     */
    function reload() {
        if (app.router) {
            app.router.navigate('');
            location.reload(true);
        } else {
            location.href = '';
        }
    }

    /**
     * @method removeSetting
     * @param {String} name
     */
    function removeSetting(name) {
        localStorage.removeItem('application-' + name);
    }

    /**
     * @method setSetting
     * @param {String} name
     * @param {String} value
     */
    function setSetting(name, value) {
        localStorage.setItem('application-' + name, value);
    }

    return {
        addFonts: addFonts,
        addPaths: addPaths,
        addShim: addShim,
        attributes: attributes,
        config: config,
        fonts: fonts,
        framework: framework,
        getHeight: getHeight,
        getLocalStorageSize: getLocalStorageSize,
        getPushState: getPushState,
        getRoot: getRoot,
        getSetting: getSetting,
        getWidth: getWidth,
        isCordova: isCordova,
        isLocal: isLocal,
        mergeObjects: mergeObjects,
        reload: reload,
        removeSetting: removeSetting,
        setSetting: setSetting
    };

})();