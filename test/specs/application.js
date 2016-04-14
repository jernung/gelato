describe('GelatoApplication', function() {
  var application;

  beforeEach(function() {
    application = new Gelato.Application();
  });

  it('getHeight()', function() {
    expect(application.getHeight()).to.be.above(0);
  });

  it('getLocalStorage()', function() {
    localStorage.setItem('hello', JSON.stringify('world'));
    expect(application.getLocalStorage('hello')).to.equal('world');
  });

  it('getPlatform()', function() {
    expect(application.getPlatform()).to.equal('Website');
    window.device = {platform: 'Android'};
    expect(application.getPlatform()).to.equal('Android');
    window.device = {platform: 'iOS'};
    expect(application.getPlatform()).to.equal('iOS');
  });

  it('getSetting()', function() {
    localStorage.setItem('application-hello', JSON.stringify('world'));
    expect(application.getSetting('hello')).to.equal('world');
  });

  it('getWidth()', function() {
    expect(application.getWidth()).to.be.above(0);
  });

  it('isAndroid()', function() {
    window.device = {platform: 'Android'};
    expect(application.isAndroid()).to.be.true;
  });

  it('isIOS()', function() {
    window.device = {platform: 'iOS'};
    expect(application.isIOS()).to.be.true;
  });

  it('isLandscape()', function() {
    Backbone.$('gelato-application').height(300);
    Backbone.$('gelato-application').width(400);
    expect(application.isLandscape()).to.be.true;
  });

  it('isPortrait()', function() {
    Backbone.$('gelato-application').height(400);
    Backbone.$('gelato-application').width(300);
    expect(application.isPortrait()).to.be.true;
  });

  it('isWebsite()', function() {
    window.device = {platform: 'Website'};
    expect(application.isWebsite()).to.be.true;
  });

  it('removeLocalStorage()', function() {
    localStorage.setItem('hello', JSON.stringify('world'));
    application.removeLocalStorage('hello', 'world');
    expect(JSON.parse(localStorage.getItem('application-hello'))).to.be.null;
  });

  it('removeSetting()', function() {
    localStorage.setItem('application-hello', 'world');
    application.removeSetting('hello', 'world');
    expect(localStorage.getItem('application-hello')).to.be.null;
  });

  it('setLocalStorage()', function() {
    application.setLocalStorage('hello', 'world');
    expect(JSON.parse(localStorage.getItem('hello'))).to.equal('world');
  });

  it('setSetting()', function() {
    application.setSetting('hello', 'world');
    expect(JSON.parse(localStorage.getItem('application-hello'))).to.equal('world');
  });

  afterEach(function() {
    Backbone.$('gelato-application').height('100%');
    Backbone.$('gelato-application').width('100%');
    localStorage.removeItem('application-hello');
    localStorage.removeItem('hello');
    window.device = undefined;
  });

});
