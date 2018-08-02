const createResourceFilename = require('../createResourceFilename.js');

const outputDir = './dist';

describe('createResourceFilename()', function () {
    it('should return correct paths', function () {
        assert.equal(
            createResourceFilename(outputDir, './dist/articles/index.html', 'css/foo.css'),
            'dist/articles/css/foo.css'
        );

        assert.equal(
            createResourceFilename(outputDir, './dist/articles/index.html', '/css/foo.css'),
            'dist/css/foo.css'
        );

        assert.equal(
            createResourceFilename(outputDir, './dist/articles/index.html', './css/foo.css'),
            'dist/articles/css/foo.css'
        );

        assert.equal(
            createResourceFilename(outputDir, './dist/articles/index.html', '../css/foo.css'),
            'dist/css/foo.css'
        );
    });
})
