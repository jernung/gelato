/**
 * @module Framework
 * @class GelatoFunctions
 */
define([], function() {

    /**
     * @method getDistance
     * @param {Object} point1
     * @param {Object} point2
     * @returns {Number}
     */
    function getDistance(point1, point2) {
        var xs = point2.x - point1.x;
        var ys = point2.y - point1.y;
        xs = xs * xs;
        ys = ys * ys;
        return Math.sqrt(xs + ys);
    }

    /**
     * @method getMidPoint
     * @param {Object} point1
     * @param {Object} point2
     * @returns {Object}
     */
    function getMidPoint(point1, point2) {
        return {
            x: (point1.x + point2.x) / 2,
            y: (point1.y + point2.y) / 2
        };
    }

    return {
        getDistance: getDistance,
        getMidPoint: getMidPoint
    };

});