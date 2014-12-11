(function() {

    function loadApplication() {
        if (location.pathname.indexOf('tests.html') > -1) {
            requirejs(['core/Jasmine', 'core/Tests'], function(Jasmine) {
                Jasmine.start();
            });
        } else {
            console.log('LOADING:', 'application');
            requirejs(['Application', 'routers/Router'], function(Application, Router) {
                FastClick.attach(document.body);
                window.app = $.extend(new Application(), app);
                window.app.router = new Router();
                window.setTimeout(function() {
                    $('body').removeClass('loading');
                    Backbone.history.start({pushState: app.getPushState(), root: app.getRoot()});
                }, 2000);
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
        config: {moment: {noGlobal: true}},
        paths: app.config.paths,
        shim: app.config.shim,
        urlArgs: app.isLocal() ? 'bust=' + (new Date()).getTime() : undefined,
        waitSeconds: 120
    });

})();