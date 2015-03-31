(function() {

    function loadApplication() {
        requirejs(['require.i18n!locale/nls/strings', 'modules/Libraries'], function(Strings) {
            window.app.strings = Strings;
            if (location.pathname.indexOf('tests.html') > -1) {
                console.log('LOADING:', 'tests');
                requirejs(['core/modules/GelatoJasmine', 'core/modules/GelatoTests'], function(Jasmine) {
                    Jasmine.start();
                });
            } else {
                console.log('LOADING:', 'application');
                requirejs([
                    'modules/Application',
                    'modules/Router'
                ], function(Application, Router) {
                    FastClick.attach(document.body);
                    window.plugin = window.plugin || {};
                    window.app = $.extend(true, new Application(), app);
                    if (typeof window.app.start === 'function') {
                        window.app.start();
                    } else {
                        window.app.router = new Router();
                        window.app.router.start();
                    }
                });
            }
        });
    }

    function loadCoreLibraries() {
        window.Async = undefined;
        window.FastClick = undefined;
        window.Handlebars = undefined;
        window.LZString = undefined;
        window.Moment = undefined;
        window.React = undefined;
        window.WebFont = undefined;
        console.log('LOADING:', 'core libraries');
        requirejs(['core/modules/GelatoLibraries'], function() {
            if (app.isCordova()) {
                requirejs(['cordova'], function() {
                    document.addEventListener('deviceready', loadFonts, false);
                });
            } else {
                $(document).ready(loadFonts);
            }
        });
    }

    function loadFonts() {
        if (Object.keys(app.fonts).length) {
            console.log('LOADING:', 'fonts');
            app.fonts.active = loadApplication;
            app.fonts.inactive = loadApplication;
            WebFont.load(app.fonts);
        } else {
            loadApplication();
        }
    }

    requirejs.config({
        baseUrl: './',
        callback: loadCoreLibraries,
        config: {
            moment: {noGlobal: true}
        },
        locale: app.getSetting('locale') || 'en-us',
        paths: app.config.paths,
        shim: app.config.shim,
        urlArgs: app.isLocal() ? 'bust=' + (new Date()).getTime() : undefined,
        waitSeconds: 120
    });

})();