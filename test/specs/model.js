describe('GelatoModel', function() {
    var model, server;

    before(function() {
        server = sinon.fakeServer.create();
        server.autoRespond = true;
        server.respondWith(
            "GET",
            "fake/path/0",
            [
                200,
                {"Content-Type":"application/json"},
                '{"id": 0, "name": "josh"}'
            ]
        );

    });

    it('should trigger state events', function(done) {
        model = new Gelato.Model({id: 0});
        model.urlRoot = 'fake/path';
        model.on('state:fetching', function() {
            expect(model.state).to.equal('fetching');
        });
        model.on('state:saving', function() {
            expect(model.state).to.equal('saving');
        });
        model.on('state:standby', function() {
            expect(model.state).to.equal('standby');
            if (model.get('name') === 'sam') {
                done();
            }
        });
        model.fetch({
            success: function() {
                model.set('name', 'sam');
                server.respondWith(
                    "PUT",
                    "fake/path/0",
                    [
                        200,
                        {"Content-Type":"application/json"},
                        JSON.stringify(model.toJSON())
                    ]
                );
                model.save();
            }
        });
    });

    after(function() {
        server.restore();
    });

});
