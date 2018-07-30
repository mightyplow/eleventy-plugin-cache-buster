const path = require('path');
const parse5 = require('parse5');
const replaceStrings = require('./replaceStrings');
const findNodes = require('./findNodes.js');
const createFileChecksum = require('./createFileChecksum.js');
const appendQueryParameter = require('./appendQueryParameter.js');
const nodeHelper = require('./nodeHelper.js');

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
    const hashParameter = 'v';

    const sourceAttributes = {
        link: 'href',
        script: 'src'
    };

    const resourceTagNames = Object.keys(sourceAttributes);
    const isResourceTag = (node) => resourceTagNames.includes(node.tagName);
    const findResourceNodes = findNodes.bind(null, isResourceTag);

    return function addContentHashes (content, target) {
        // ignore empty contents
        if (!content.trim().length) {
            return content;
        }

        const document = parse5.parse(content, parserOptions);

        const resourceNodes = findResourceNodes(document)
            .map((node) => nodeHelper({ sourceAttributes }, node))
            .filter((node) => node.hasValidSource());

        const replacements = resourceNodes.map(function (nodeHelper) {
            const source = nodeHelper.getSource();
            const hash = createContentHash(baseDir, source);
            nodeHelper.setSource(appendQueryParameter(source, hashParameter, hash));

            return {
                start: nodeHelper.getStart(),
                end: nodeHelper.getEnd(),
                value: parse5.serialize({ childNodes: [nodeHelper.getNode()] })
            };
        });

        return replaceStrings(content, replacements);
    };
};
