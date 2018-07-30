/** @module createFileChecksum */

const fs = require('fs');
const md5 = require('md5');

/**
 *
 * @param filePath
 * @return {*}
 */
module.exports = function createFileChecksum (filePath) {
    const fileContent = fs.readFileSync(filePath);
    return md5(fileContent.toString());
};
