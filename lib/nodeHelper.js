const getObjectProperty = require('./getObjectProperty.js');
const isRelativeUrl = require('./isRelativeUrl.js');

function getNodeAttribute (node, attributeName) {
    return node.attrs.find((({ name }) => name === attributeName));
}

module.exports = function (options, node) {
    const {
        sourceAttributes
    } = options;

    const sourceAttribute = sourceAttributes[node.tagName];

    return {
        getNode () {
            return node;
        },

        getSource () {
            const attribute = getNodeAttribute(node, sourceAttribute);
            return attribute && attribute.value || undefined;
        },

        setSource (value) {
            const attribute = getNodeAttribute(node, sourceAttribute);

            if (attribute) {
                attribute.value = value;
            }
        },

        hasValidSource () {
            return node && isRelativeUrl(this.getSource()) ;
        },

        getStart () {
            return getObjectProperty(node, 'sourceCodeLocation.startOffset');
        },

        getEnd () {
            return getObjectProperty(node, 'sourceCodeLocation.endOffset');
        }
    };
};
