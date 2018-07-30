const path = require('path');
const createFileChecksum = require('./createFileChecksum.js');

/**
 * Creates the content hash for a passed url. It requires a basepath
 * in which it can look for the file.
 *
 * @param {string} baseDir
 * @param {string} url
 * @return {string}
 */
module.exports = function createResourceHash (baseDir, url) {
    const plainUrl = url.replace(/[?].*$/, '');
    const resourcePath = path.join(baseDir, plainUrl);
    return createFileChecksum(resourcePath);
};
