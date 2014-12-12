(function() {

    function loadApplication() {
        if (location.pathname.indexOf('tests.html') > -1) {
            requirejs(['core/Jasmine', 'core/Tests'], function(Jasmine) {
                Jasmine.start();
            });
        } else {
            console.log('LOADING:', 'application');
            requirejs([
                'Application',
                'routers/Router',
                'require.i18n!locale/nls/strings'
            ], function(Application, Router, Strings) {
                FastClick.attach(document.body);
                window.app = $.extend(new Application(), app);
                window.app.router = new Router();
                window.app.strings = Strings;
                Backbone.history.start({pushState: app.getPushState(), root: app.getRoot()});
            });
        }
    }

    function loadCoreLibraries() {
        console.log('LOADING:', 'core libraries');
        requirejs(['core/Libraries'], function() {
            if (app.isCordova()) {
                document.addEventListener('deviceready', loadFonts, false);
            } else {
                $(document).ready(loadFonts);
            }
        });
    }

    function loadFonts() {
        if (app.fonts) {
            console.log('LOADING:', 'fonts');
            app.fonts.active = loadApplication;
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