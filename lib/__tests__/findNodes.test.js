const findNodes = require('../findNodes.js');

describe('findNodes()', function () {
    function predicate (node) {
        return node.true === true;
    }

    const findTestNodes = findNodes.bind(null, predicate);

    const truthyNode = { true: true };
    const falsyNode = { true: false };

    const a = { ...truthyNode, name: 'a' };
    const b = { ...falsyNode, name: 'b' };
    const c = { ...truthyNode, name: 'c' };

    it('should return an empty array', function () {
        expect(findTestNodes({})).toEqual([]);
    });

    it('should not return the root when not matching', function () {
        expect(findTestNodes(falsyNode)).toEqual([]);
    });

    it('should return the root when matching', function () {
        expect(findTestNodes(truthyNode)).toEqual([truthyNode]);
    });

    it('should return matching root and childNodes', function () {
        const tree = {
            ...truthyNode,
            childNodes: [a, b, c]
        };

        expect(findTestNodes(tree)).toEqual([tree, a, c]);
    });

    it('should return matching deep childNodes', function () {
        const d = {
            childNodes: [c],
            name: 'd'
        };

        const e = {
            childNodes: [],
            name: 'e'
        };

        const tree = {
            ...truthyNode,
            childNodes: [a, b, c, d]
        };

        expect(findTestNodes(tree)).toEqual([tree, a, c, c]);
    });
});
