module.exports = function removeQuery (url) {
    return url.replace(/[?].*$/, '');
};
