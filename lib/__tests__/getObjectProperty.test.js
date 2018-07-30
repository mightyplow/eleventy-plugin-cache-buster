const getObjectProperty = require('../getObjectProperty.js');

describe('getObjectProperty', function () {
    it('should return undefined when no object passed', function () {
        expect(getObjectProperty()).toBeUndefined();
    });

    it('should return the base object', function () {
        const obj = { a: 1 };
        expect(getObjectProperty(obj)).toBe(obj);
    });

    it('should return a deep value', function () {
        const obj = { a: { b: 1, d: null } };
        expect(getObjectProperty(obj, 'a')).toBe(obj.a);
        expect(getObjectProperty(obj, 'b')).toBeUndefined();
        expect(getObjectProperty(obj, 'a.b')).toBe(obj.a.b);
        expect(getObjectProperty(obj, 'a.c')).toBeUndefined();
        expect(getObjectProperty(obj, 'a.d')).toBe(null);
    });
});
