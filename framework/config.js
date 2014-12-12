app = (function() {

    /**
     * @property config
     * @type {Object}
     */
    var config = {
        modules: [
            {name: 'core/Libraries'},
            {name: 'core/Tests'}
        ],
        paths: {
            //default directories
            collections: 'collections',
            components: 'components',
            core: 'core',
            models: 'models',
            modules: 'modules',
            router: 'routers',
            templates: 'templates',
            views: 'views',
            //framework libraries
            async: 'libraries/async-0.9.0',
            backbone: 'libraries/backbone-1.1.2',
            'backbone.routefilter': 'libraries/backbone.routefilter-0.2.0',
            bootstrap: 'libraries/bootstrap-3.3.1',
            'bootstrap.switch': 'libraries/bootstrap.switch-3.2.2',
            fastclick: 'libraries/fastclick-1.0.3',
            handlebars: 'libraries/handlebars-2.0.0',
            jasmine: 'libraries/jasmine-2.1.3',
            'jasmine.html': 'libraries/jasmine.html-2.1.3',
            jquery: 'libraries/jquery-2.1.1',
            'jquery.mobile': 'libraries/jquery.mobile-1.4.5',
            'jquery.notify': 'libraries/jquery.notify-0.3.1',
            modernizr: 'libraries/modernizr.custom-2.8.3',
            moment: 'libraries/moment-2.8.4',
            'moment.timezone': 'libraries/moment.timezone-0.2.5',
            pouchdb: 'libraries/pouchdb-3.2.0',
            react: 'libraries/react-0.12.1',
            'require.i18n': 'libraries/require.i18n-2.0.4',
            'require.text': 'libraries/require.text-2.0.12',
            underscore: 'libraries/lodash.underscore-2.4.1',
            webfont: 'libraries/webfontloader-1.5.8'
        },
        shim: {
            backbone: ['jquery', 'underscore'],
            'backbone.routefilter': ['backbone'],
            bootstrap: ['jquery'],
            'bootstrap.switch': ['bootstrap'],
            'jasmine.html': ['jasmine'],
            'jquery.mobile': ['jquery'],
            'jquery.notify': ['jquery'],
            'moment.timezones': ['moment']
        }
    };

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
        return location.hostname === 'localhost';
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
        config: config,
        getPushState: getPushState,
        getRoot: getRoot,
        getSetting: getSetting,
        isCordova: isCordova,
        isLocal: isLocal,
        removeSetting: removeSetting,
        setSetting: setSetting
    };

})();