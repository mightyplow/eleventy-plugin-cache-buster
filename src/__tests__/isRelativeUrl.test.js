const isRelativeUrl = require('../isRelativeUrl.js');

describe('isRelativeUrl()', function () {
    it('should return true for relative urls', function () {
        assert.equal(isRelativeUrl('/foo/bar?bla'), true);
        assert.equal(isRelativeUrl('foo/bar?bla'), true);
        assert.equal(isRelativeUrl('../foo/bar?bla'), true);
    });

    it('should return false for absolute urls', function () {
        assert.equal(isRelativeUrl('//foo/bar?bla'), false);
        assert.equal(isRelativeUrl('http://foo/bar?bla'), false);
        assert.equal(isRelativeUrl('://foo/bar?bla'), false);
    });
});
