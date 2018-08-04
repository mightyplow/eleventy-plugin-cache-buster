const path = require('path');

/**
 * Creates the filename for a resource url depending on whether it's domain relative or path relative.
 *
 * @param {string} outputDir
 * @param {string} target
 * @param {string} url
 * @return {string}
 */
module.exports = function createResourceFilename (outputDir, target, url) {
    if (url.charAt(0) === '/') {
        return path.join(outputDir, url);
    }

    const targetDir = path.dirname(target);
    return path.join(targetDir, url);
}
