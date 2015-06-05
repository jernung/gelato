(function() {

    function isCordova() {
        return location.protocol === 'file:';
    }

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
                    window.app = new Application(gelato.getConfig('attributes'));
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
            if (isCordova()) {
                requirejs(['cordova'], function() {
                    document.addEventListener('deviceready', loadFonts, false);
                });
            } else {
                $(document).ready(loadFonts);
            }
        });
    }

    function loadFonts() {
        var fonts = gelato.getConfig('fonts');
        if (fonts.custom) {
            fonts.custom.urls = isCordova() ? ['fonts.css'] : ['/fonts.css'];
        }
        if (Object.keys(fonts).length) {
            console.log('LOADING:', 'fonts');
            fonts.active = loadApplication;
            fonts.inactive = loadApplication;
            WebFont.load(fonts);
        } else {
            loadApplication();
        }
    }

    requirejs.config({
        baseUrl: isCordova() ? './' : '/',
        callback: loadCoreLibraries,
        config: {
            moment: {noGlobal: true}
        },
        locale: localStorage.getItem('application-locale') || 'en-us',
        paths: gelato.getConfig('paths'),
        shim: gelato.getConfig('shim'),
        urlArgs: function() {
            return location.href.indexOf('dev.') > -1 ? 'bust=' + (new Date()).getTime() : null;
        }(),
        waitSeconds: 120
    });

})();