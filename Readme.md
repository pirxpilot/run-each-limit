[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# run-each-limit

Run an async task for each array element in parallel, but limit the number of tasks executing at the same time.

## Install

```sh
$ npm install --save run-each-limit
```

## Usage

### Callback

```js
import eachLimit from 'run-each-limit';

const items = ['a', 'b', 'c', 'd'];
const result = '';

function onItem(item, fn) {
  result += item;
  setTimeout(fn, 200);
}

eachLimit(items, 2, onItem, function(err) {
  console.log(result); // 'abcd'
});

```

### Promise

```js
import eachLimit from 'run-each-limit';

const items = ['a', 'b', 'c', 'd'];
const result = '';

function onItem(item) {
  result += item;
  return new Promise(resolve => setTimeout(resolve, 200));
}

eachLimit(items, 2, onItem).then(() => {
  console.log(result); // 'abcd'
});

```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/run-each-limit
[npm-url]: https://npmjs.org/package/run-each-limit

[build-url]: https://github.com/pirxpilot/run-each-limit/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/run-each-limit/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/run-each-limit
[deps-url]: https://libraries.io/npm/run-each-limit
