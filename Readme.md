[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]

# run-each-limit

Run an async task for each array element in parallel, but limit the number of tasks executing at the same time.

## Install

```sh
$ npm install --save run-each-limit
```

## Usage

```js
var eachLimit = require('run-each-limit');

var items = ['a', 'b', 'c', 'd'];
var result = '';

function onItem(item, fn) {
  result += item;
  setTimeout(fn, 200);
}

eachLimit(items, 2, onItem, function(err) {
  console.log(result); // 'abcd'
});

```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/run-each-limit.svg
[npm-url]: https://npmjs.org/package/run-each-limit

[travis-url]: https://travis-ci.org/pirxpilot/run-each-limit
[travis-image]: https://img.shields.io/travis/pirxpilot/run-each-limit.svg

[gemnasium-image]: https://img.shields.io/gemnasium/pirxpilot/run-each-limit.svg
[gemnasium-url]: https://gemnasium.com/pirxpilot/run-each-limit
