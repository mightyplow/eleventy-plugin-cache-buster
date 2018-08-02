/**
 * @module findNodes
 * @exports findNodes
 * */

/**
 *
 * @param predicate
 * @param tree
 * @return {*}
 */
module.exports = function findNodes (predicate, tree) {
    return (function inner (foundNodes, node) {
        const { childNodes } = node;
        const matchingNodes = predicate(node) ? [node] : [];

        return childNodes && childNodes.length
            ? foundNodes.concat(...matchingNodes, ...childNodes.map(inner.bind(null, foundNodes)))
            : foundNodes.concat(...matchingNodes);
    }([], tree));
};
