const appendQueryParameter = require('../appendQueryParameter.js');

describe('appendQueryParameter()', function () {
    it('should add via "&"', function () {
        expect(appendQueryParameter('blabla?foo=bar', 'baz', 'blubb')).toBe('blabla?foo=bar&baz=blubb');
    });

    it('should add via "?"', function () {
        expect(appendQueryParameter('blabla', 'baz', 'blubb')).toBe('blabla?baz=blubb');
    });

    it('should encode the parameter', function () {
        expect(appendQueryParameter('blabla', 'foo', 'bar baz')).toBe('blabla?foo=bar%20baz');
    });
});
