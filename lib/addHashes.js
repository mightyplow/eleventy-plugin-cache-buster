const path = require('path');
const parse5 = require('parse5');
const replaceStrings = require('./replaceStrings');
const findNodes = require('./findNodes.js');
const resourceNodeFactory = require('./resourceNode.js');
const createFileChecksum = require('./createFileChecksum.js');

const parserOptions = {
    // required to get the tags' start and end position
    sourceCodeLocationInfo: true
};

function createContentHash (baseDir, src) {
    const resourcePath = path.join(baseDir, src);
    return createFileChecksum(resourcePath);
}

module.exports = function (basePath) {
    // TODO: use as configuration option
    const baseDir = './dist';

    const sourceAttributes = {
        link: 'href',
        script: 'src'
    };

    const resourceNode = resourceNodeFactory({ sourceAttributes });
    const resourceTagNames = Object.keys(sourceAttributes);
    const isResourceTag = (node) => resourceTagNames.includes(node.tagName);
    const findResourceNodes = findNodes.bind(null, isResourceTag);

    return function addContentHashes (content, target) {
        if (!content.trim().length) {
            return content;
        }

        const document = parse5.parse(content, parserOptions);

        const resourceNodes = findResourceNodes(document)
            .map(resourceNode)
            .filter((node) => node.hasSource());

        const replacements = resourceNodes.map(function (node) {
            const { start, end, source } = node;
            const hash = createContentHash(baseDir, source);
            node.source = source + `?v=${hash}`;

            return {
                start,
                end,
                value: parse5.serialize({ childNodes: [node] })
            };
        });

        return replaceStrings(content, replacements);
    };
};
