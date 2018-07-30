const getObjectProperty = require('./getObjectProperty.js');

// TODO: add node engine to package.json >= 4

/**
 * @typedef {Object} resourceNode
 * @property {Object} node
 * @property {number} start
 * @property {number} end
 * @property {string} tagName
 * @property {string} source
 * @property {function} getAttribute
 * @property {function} setAttribute
 */

module.exports = function resourceNodeFactory (options) {
    const {
        sourceAttributes
    } = options;

    /**
     * @param {Object} node
     * @return {resourceNode}
     */
    return function resourceNode (node) {
        const sourceAttribute = sourceAttributes[node.tagName];

        return {
            get tagName () {
                return node.tagName;
            },

            get attrs () {
                return node.attrs;
            },

            get start () {
                return getObjectProperty(node, 'sourceCodeLocation.startOffset');
            },

            get end () {
                return getObjectProperty(node, 'sourceCodeLocation.endOffset');
            },

            get node () {
                return node;
            },

            get source () {
                return this.getAttribute(sourceAttribute);
            },

            set source (value) {
                this.setAttribute(sourceAttribute, value);
            },

            hasSource () {
                return node && this.source !== undefined;
            },

            getAttribute (key) {
                const attribute = node.attrs.find((({ name }) => name === key));
                return attribute && attribute.value || undefined;
            },

            setAttribute (key, value) {
                const attribute = node.attrs.find((({ name }) => name === key));

                if (attribute) {
                    attribute.value = value;
                }
            }
        };
    };
};
