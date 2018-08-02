# eleventy-cache-buster

A plugin for [eleventy](https://github.com/11ty/eleventy/) which adds a unique query parameter to css and js resources. 
This allows to set unlimited caching for those resources and ensure that they get properly reloaded when they change.
See [this article on Cache Busting](https://www.keycdn.com/support/what-is-cache-busting/).

By now the hash is created out of the resource content. See [notes](#notes).

## Installation
````
npm i @mightyplow/eleventy-plugin-cache-buster -D
````

## Usage

In your projects' _.eleventy.js_ file, add the plugin.

````.js
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');

module.exports = function(eleventyConfig) {
    const cacheBusterOptions = {};
    eleventyConfig.addPlugin(cacheBuster(cacheBusterOptions));
};

````

## Notes

### Valid resource URLs

By now this plugin only works with path-relative URLs.
- what will get processed:
    - '/assets/css/foo.css'
    - '../assets/css/foo.css'

- what will not get processed:
    - '//foo.bar/assets/css/foo.css'
    - 'https&#58;//foo.bar/assets/css/foo.css'

### Build order

In order to create the resource hashes, the resource files have to be built
before the html. You have to ensure this in your build process.
