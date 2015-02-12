/**
 * @module Framework
 * @class GelatoFunctions
 */
define([], function() {

    /**
     * @method cloneJSON
     * @param {Array|Object} data
     * @returns {Array|Object}
     */
    function cloneJSON(data) {
        return JSON.parse(JSON.stringify(data));
    }

    /**
     * @method getBoundingRectangle
     * @param {Array} points
     * @param {Number} areaWidth
     * @param {Number} areaHeight
     * @param {Number} pointRadius
     * @return {Object}
     */
    function getBoundingRectangle(points, areaWidth, areaHeight, pointRadius) {
        var left = areaWidth;
        var top = 0.0;
        var right = 0.0;
        var bottom = areaHeight;
        for (var i = 0, length = points.length; i < length; i++) {
            var x = points[i].x;
            var y = points[i].y;
            if (x - pointRadius < left) {
                left = x - pointRadius;
            }
            if (y + pointRadius > top) {
                top = y + pointRadius;
            }
            if (x + pointRadius > right) {
                right = x + pointRadius;
            }
            if (y - pointRadius < bottom) {
                bottom = y - pointRadius;
            }
        }
        var width = right - left;
        var height = top - bottom;
        var center = {x: width / 2 + left, y: height / 2 + bottom};
        return {x: left, y: bottom, width: width, height: height, center: center};
    }

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
        cloneJSON: cloneJSON,
        getBoundingRectangle: getBoundingRectangle,
        getDistance: getDistance,
        getMidPoint: getMidPoint
    };

});