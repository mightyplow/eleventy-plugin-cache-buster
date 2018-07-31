const path = require('path');
const parse5 = require('parse5');
const replaceStrings = require('./replaceStrings');
const findNodes = require('./findNodes.js');
const appendQueryParameter = require('./appendQueryParameter.js');
const nodeHelper = require('./nodeHelper.js');
const createResourceHash = require('./createResourceHash.js');
const merge = require('deepmerge');

const parserOptions = {
    // required to get the tags' start and end position
    sourceCodeLocationInfo: true
};

const defaultOptions = {
    baseDir: './dist',
    hashParameter: 'v',
    sourceAttributes: {
        link: 'href',
        script: 'src'
    }
};

module.exports = function (options = defaultOptions) {
    const {
        baseDir,
        hashParameter,
        sourceAttributes
    } = merge(defaultOptions, options);

    const resourceTagNames = Object.keys(sourceAttributes);
    const isResourceTag = (node) => resourceTagNames.includes(node.tagName);
    const findResourceNodes = findNodes.bind(null, isResourceTag);

    return function addContentHashes (content, target) {
        // ignore empty contents
        if (!content.trim().length) {
            return content;
        }
        // TODO: merge target with relative paths

        const document = parse5.parse(content, parserOptions);

        const resourceNodes = findResourceNodes(document)
            .map((node) => nodeHelper({ sourceAttributes }, node))
            .filter((node) => node.hasValidSource());

        const replacements = resourceNodes.map(function (nodeHelper) {
            const source = nodeHelper.getSource();
            const hash = createResourceHash(baseDir, source);
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
