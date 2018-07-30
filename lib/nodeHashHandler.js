const path = require('path');
const createFileChecksum = require('./createFileChecksum');

module.exports = function createContentHash (src) {
    const resourcePath = path.join(baseDir, src);
    return createFileChecksum(resourcePath);
};

/**
 * @param {resourceNode} node
 * @return {string}
 */
function getNodeHash (node) {
    const sourceValue = node.source;
    return createContentHash(sourceValue);
}

/**
 * @param {resourceNode} node
 * @return {resourceNode}
 */
module.exports = function setHashedSource (node) {
    const hash = getNodeHash(node);
    const sourceValue = node.source;
    node.source = sourceValue + `?v=${hash}`;
    return node;
};
