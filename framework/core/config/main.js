(function() {

    function loadApplication() {
        requirejs(['modules/Libraries'], function() {
            if (location.pathname.indexOf('tests.html') > -1) {
                requirejs(['core/modules/GelatoJasmine', 'core/modules/GelatoTests'], function(Jasmine) {
                    Jasmine.start();
                });
            } else {
                console.log('LOADING:', 'application');
                requirejs(['models/Application'], function(Application) {
                    FastClick.attach(document.body);
                    window.app = $.extend(true, new Application(), app);
                    window.app.router.start();
                });
            }
        });
    }

    function loadCoreLibraries() {
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