/**
 * Traverse through an object to find a value.
 *
 * @param {Object} current
 * @param {string[]} parts
 * @return {*}
 */
function getDeepObjectProperty (current, parts) {
    const [ next ] = parts;

    return !next
        ? current
        : !(next in current)
            ? undefined
            : getDeepObjectProperty(current[next], parts.slice(1));
}

/**
 * Returns a nested property out of an object. The property is passed as a dot-separated string.
 *
 * @example getObjectProperty({ foo: { bar: 'baz' } }, 'foo.bar') // => 'baz'
 *
 * @param {Object} obj
 * @param {string} prop
 * @return {*}
 */
module.exports = function getObjectProperty (obj, prop = '') {
    return typeof obj !== 'object' || obj === null
        ? undefined
        : getDeepObjectProperty(obj, prop.split('.'));
};
