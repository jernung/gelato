(function() {

    function loadApplication() {
        FastClick.attach(document.body);
        requirejs(['require.i18n!locale/nls/strings', 'modules/Libraries'], function(Strings) {
            window.i18n = Strings;
            if (location.pathname.indexOf('tests.html') > -1) {
                console.log('LOADING:', 'tests');
                requirejs(['core/modules/GelatoJasmine', 'core/modules/GelatoTests'], function(Jasmine) {
                    Jasmine.start();
                });
            } else {
                console.log('LOADING:', 'application');
                requirejs(['modules/Application'], function(Application) {
                    window.plugin = window.plugin || {};
                    window.app = $.extend(true, new Application(), window.app);
                    window.app.start();
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