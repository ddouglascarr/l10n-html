## l10n-html [![Build Status](https://travis-ci.org/remixz/l10n-html.png?branch=master)](https://travis-ci.org/remixz/l10n-html)

A module that makes localization much friendlier, by writing the localizations in the HTML. Browser and server ready!

[![NPM](https://nodei.co/npm/l10n-html.png)](https://nodei.co/npm/l10n-html/)

### Explanation

`l10n-html` attempts to make localization of web pages a much friendlier experience. It allows you to write all of your code in your preferred language, without any need for templating helpers. Instead, any HTML tag that needs to be localized will have a `data-l10n` attribute, containing a key to access a translation from a JS object. This module is designed to be barebones, only performing the action of transforming the HTML. Detecting the language, providing the language bundles and any other tasks are up to the implementer.

### Usage

#### HTML Format

```html
<p data-l10n="hello.world">Hello, World!</p>
<!-- l10n-html supports dot and bracket notation. -->
```

#### Server

```js
var l10n = require('l10n-html');

// The first argument may either be a string containing HTML, or a Cheerio object.
// The second argument is an object of the translations.
// The third argument is an object of additional options.
var translated = l10n('<p data-l10n="hello">Hello!</p><p data-l10n="nested.everyone">Everyone.</p>', {
    hello: 'Bonjour!',
    nested: {
        everyone: 'Tout le monde.'
    }
}, {
    returnCheerio: false,
    stripDataAttributes: true
});
// By default, l10n-html returns a string of the parsed HTML, but may also return the Cheerio object if the option is provided.
// l10n-html will strip the data-l10n attribute by default, but can be configured not to.
// translated would return: "<p>Bonjour!</p><p>Tout le monde.</p>"
```

#### Browser

```js
var l10n = require('l10n-html');

// The first argument is an element list. Use a list from document.querySelector().
// The second argument is an object of the translations.
var translated = l10n(document.querySelector('body'), {
    hello: 'Bonjour!',
    nested: {
        everyone: 'Tout le monde.'
    }
});
// l10n-html in the browser will return an element list from querySelectorAll(). It will automatically update the page.
```

```bash
browserify browser.js > bundle.js
```