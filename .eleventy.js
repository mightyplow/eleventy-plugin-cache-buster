const minimist = require('minimist');

const addHashes = require('./src/addHashes');
const getObjectProperty = require('./src/getObjectProperty.js');

const args = minimist(process.argv.slice(2));
const defaultOutputDir = '_site';

module.exports = function (options) {
    return function (eleventyConfig, pluginNamespace) {
        const outputDirectory = args.output || options.outputDirectory || defaultOutputDir;

        eleventyConfig.namespace(pluginNamespace, () => {
            eleventyConfig.addTransform('cacheBuster', addHashes(outputDirectory, options));
        });
    };
};
