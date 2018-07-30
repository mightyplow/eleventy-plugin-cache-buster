const addHashes = require('./lib/addHashes');

module.exports = function (options) {
  return function(eleventyConfig, pluginNamespace) {
        eleventyConfig.namespace(pluginNamespace, () => {
            eleventyConfig.addTransform('cacheBuster', addHashes('./dist'));
        });
    };
};
