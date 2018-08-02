/** @module isRelativeUrl */

/**
 * Checks, whether a given string is a path relative URL. Therefore it checks, whether
 * this string starts with a protocol and/or 2 slashes.
 *
 * @param {string} url
 * @return {boolean}
 */
module.exports = function isRealtiveUrl (url) {
    return url && !/^(?:[a-z0-9]*:)?[/]{2}/i.test(url);
};
