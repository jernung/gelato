/**
 * @class GelatoClass
 * @constructor
 */
function GelatoClass() {
}

/**
 * @method extend
 * @param {Object} protoProps
 * @param {Object} staticProps
 * @returns {Object}
 */
GelatoClass.prototype.extend = function (protoProps, staticProps) {
	var parent = this;
	var child = undefined;
	if (protoProps && _.has(protoProps, 'constructor')) {
		child = protoProps.constructor;
	} else {
		child = function () {
			return parent.apply(this, arguments);
		};
	}
	_.extend(child, parent, staticProps);
	child.prototype = _.create(parent.prototype, protoProps);
	child.prototype.constructor = child;
	child.__super__ = parent.prototype;
	return child;
};

_.extend(GelatoClass.prototype, Backbone.Events);

module.exports = GelatoClass;
