const fs = require('fs');
const md5 = require('md5');

/**
 * Reads the content of a file and creates a checksum.
 *
 * @param {string} filePath
 * @return {string}
 */
module.exports = function createFileChecksum (filePath) {
    const fileContent = fs.readFileSync(filePath);
    return md5(fileContent.toString());
};
