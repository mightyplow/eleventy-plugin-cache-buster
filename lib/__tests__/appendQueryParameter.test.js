const appendQueryParameter = require('../appendQueryParameter.js');

describe('appendQueryParameter()', function () {
    it('should add via "&"', function () {
        assert.equal(appendQueryParameter('blabla?foo=bar', 'baz', 'blubb'), 'blabla?foo=bar&baz=blubb');
    });

    it('should add via "?"', function () {
        assert.equal(appendQueryParameter('blabla', 'baz', 'blubb'), 'blabla?baz=blubb');
    });

    it('should encode the parameter', function () {
        assert.equal(appendQueryParameter('blabla', 'foo', 'bar baz'), 'blabla?foo=bar%20baz');
    });
});
