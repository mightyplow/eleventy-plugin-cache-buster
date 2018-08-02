const path = require('path');

module.exports = function createResourceFilename (outputDir, target, url) {
    if (url.charAt(0) === '/') {
        return path.join(outputDir, url);
    }

    const targetDir = path.dirname(target);
    return path.join(targetDir, url);
}
