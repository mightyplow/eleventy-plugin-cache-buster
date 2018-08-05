const removeQuery = require('./removeQuery.js');
const createResourceFilename = require('./createResourceFilename.js');
const memoize = require('./memoize.js');
const createFileChecksum = memoize(require('./createFileChecksum.js'));

/**
 * Creates the content hash for a passed url. It requires a basepath
 * in which it can look for the file.
 *
 * @param {string} baseDir
 * @param {string} url
 * @return {string}
 */
module.exports = function createResourceHash (baseDir, url, target) {
    const plainUrl = removeQuery(url);
    const resourceFilename = createResourceFilename(baseDir, target, plainUrl);
    return createFileChecksum(resourceFilename);
};
