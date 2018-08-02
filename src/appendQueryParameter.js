/**
 * Appends a key/value pair to a string. The parameter gets encoded.
 *
 * @param {string} str
 * @param {string} key
 * @param {string} value
 * @return {string}
 */
module.exports = function appendQueryParameter (str, key, value) {
    const separator = str.includes('?') ? '&' : '?';
    const parameter = [key, value].map(encodeURIComponent).join('=');
    return [str, parameter].join(separator);
};
