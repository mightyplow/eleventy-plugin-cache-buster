const getObjectProperty = require('../getObjectProperty.js');

describe('getObjectProperty', function () {
    it('should return undefined when no object passed', function () {
        assert.equal(getObjectProperty(), undefined);
    });

    it('should return the base object', function () {
        const obj = { a: 1 };
        assert.equal(getObjectProperty(obj), obj);
    });

    it('should return a deep value', function () {
        const obj = { a: { b: 1, d: null } };
        assert.equal(getObjectProperty(obj, 'a'), obj.a);
        assert.equal(getObjectProperty(obj, 'b'), undefined);
        assert.equal(getObjectProperty(obj, 'a.b'), obj.a.b);
        assert.equal(getObjectProperty(obj, 'a.c'), undefined);
        assert.equal(getObjectProperty(obj, 'a.d'), null);
    });
});
