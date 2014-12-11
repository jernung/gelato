define([], function() {
    describe('Core - Libraries', function() {
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
        describe('Pouch', function() {
            it('should be defined in the global scope.', function() {
                expect(PouchDB).toBeDefined();
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