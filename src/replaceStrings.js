/**
 * @typedef {Object} replacement
 * @property {int} start
 * @property {int} end
 * @property {string} value
 */

/**
 * Replaces a set of replacement objects in a string.
 *
 * @param source
 * @param {replacement[]} replacements
 * @return {*}
 */
module.exports = function replaceStrings (source, replacements) {
    return (function inner (restReplacements, result, start) {
        const [ next, ...rest ] = restReplacements;

        if (!next) {
            return result + source.substring(start);
        }

        const before = source.substring(start, next.start);
        return result + inner(rest, [before, next.value].join(''), next.end);
    }(replacements, '', 0));
};
