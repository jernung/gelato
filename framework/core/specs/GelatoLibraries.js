define([], function() {
    describe('Core - GelatoLibraries', function() {
        describe('Async', function() {
            it('should be defined in the global scope.', function() {
                expect(Async).toBeDefined();
            });
        });
        describe('Backbone', function() {
            it('should be defined in the global scope.', function() {
                expect(Backbone).toBeDefined();
            });
            it('should have routefilter events defined.', function() {
                expect(typeof Backbone.Router.prototype.after).toEqual('function');
                expect(typeof Backbone.Router.prototype.before).toEqual('function');
            });
            it('should have a valid reference to jquery.', function() {
                expect($.guid).toEqual(Backbone.$.guid);
            });
        });
        describe('CreateJS', function() {
            it('should be defined in the global scope.', function() {
                expect(createjs).toBeDefined();
            });
            it('should contain the easel library.', function() {
                expect(createjs.EaselJS).toBeDefined();
            });
            it('should contain the preload library.', function() {
                expect(createjs.PreloadJS).toBeDefined();
            });
            it('should contain the sound library.', function() {
                expect(createjs.SoundJS).toBeDefined();
            });
            it('should contain the tween library.', function() {
                expect(createjs.TweenJS).toBeDefined();
            });
        });
        describe('FastClick', function() {
            it('should be defined in the global scope.', function() {
                expect(FastClick).toBeDefined();
            });
        });
        describe('FontLoader', function() {
            it('should be defined in the global scope.', function() {
                expect(WebFont).toBeDefined();
            });
        });
        describe('Handlebars', function() {
            it('should be defined in the global scope.', function() {
                expect(Handlebars).toBeDefined();
            });
        });
        describe('Jquery', function() {
            it('should be defined in the global namespace.', function() {
                expect($).toBeDefined();
            });
            it('should include the bootstrap plugin.', function() {
                expect($.fn.modal).toBeDefined();
            });
            it('should include the notify plugin.', function() {
                expect($.notify).toBeDefined();
            });
        });
        describe('Modernizr', function() {
            it('should be defined in the global scope.', function() {
                expect(Modernizr).toBeDefined();
            });
        });
        describe('Moment', function() {
            it('should be defined in the global scope.', function() {
                expect(moment).toBeUndefined();
                expect(Moment).toBeDefined();
            });
            it('should include custom timezone data.', function() {
                expect(Moment.tz).toBeDefined();
            });
        });
        describe('React', function() {
            it('should be defined in the global scope.', function() {
                expect(React).toBeDefined();
            });
        });
        describe('Underscore', function() {
            it('should be defined in the global scope.', function() {
                expect(_).toBeDefined();
            });
        });
    });
});