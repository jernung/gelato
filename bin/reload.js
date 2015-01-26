/**
 * @method reload
 * @param {String} name
 * @returns {Module}
 */
function reload(name) {
    var path = require.resolve(name);
    var module = require.cache[path];
    if (module) {
        uncache(module);
    }
    return require(name);
}
/**
 * @method uncache
 * @param {Module} module
 */
function uncache(module) {
    module.children.forEach(uncache);
    delete require.cache[module.id];
}

module.exports = reload;