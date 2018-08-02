const minimist = require('minimist');

const addHashes = require('./lib/addHashes');
const getObjectProperty = require('./lib/getObjectProperty.js');

const args = minimist(process.argv.slice(2));
const defaultOutputDir = '_site';

module.exports = function (options) {
    return function (eleventyConfig, pluginNamespace) {
        const outputDirectory = args.output || getObjectProperty(eleventyConfig, 'dir', 'output') || defaultOutputDir;

        eleventyConfig.namespace(pluginNamespace, () => {
            eleventyConfig.addTransform('cacheBuster', addHashes(outputDirectory, options));
        });
    };
};
