const removeQuery = require('../removeQuery.js');

describe('removeQuery()', function () {
    it('should remove the query string', function () {
        assert.equal(removeQuery('//foo.bar/?foo=bar'), '//foo.bar/');
        assert.equal(removeQuery('//foo.bar/?foo=bar&bla=blubb'), '//foo.bar/');
        assert.equal(removeQuery('http://foo.bar/?foo=bar&bla=blubb'), 'http://foo.bar/');
        assert.equal(removeQuery('assets/foo.bar?foo=bar&bla=blubb'), 'assets/foo.bar');
    });
});
