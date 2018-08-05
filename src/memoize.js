/**
 * Caches the result of a function.
 *
 * @param {function} fn
 * @return {function}
 */
module.exports = function memoize (fn) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (!(key in cache)) {
            cache[key] = fn(...args);
        }

        return cache[key];
    };
};
