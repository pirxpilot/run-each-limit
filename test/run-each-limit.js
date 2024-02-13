const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const eachLimit = require('../');

describe('run-each-limit', function () {
  it('should work if taks array is empty', function (_, done) {
    eachLimit(
      [],
      2,
      function () {
        assert.ok(false, 'should not call task');
      },
      done
    );
  });

  it('should run all task', function (_, done) {
    const tasks = ['a', 'b', 'c', 'd'];
    let result = '';

    function onItem(item, fn) {
      result += item;
      setTimeout(fn, 5);
    }

    eachLimit(tasks, 2, onItem, function (err) {
      assert.equal(result, 'abcd');
      done(err);
    });

  });

  it('should exit on error', function (_, done) {
    const tasks = ['a', 'b', 'c', 'd'];
    let result = '';

    function onItem(item, fn) {
      setTimeout(function () {
        result += item;
        fn(item === 'b');
      }, 5);
    }

    eachLimit(tasks, 1, onItem, function (err) {
      assert.ok(err);
      assert.equal(result, 'ab');
      done();
    });

  });

  it('should respect limit on error', function (_, done) {
    const LIMIT = 4;
    const tasks = ['a', 'b', 'c', 'd', 'e', 'f'];
    let result = '';
    let working = 0;

    function onItem(item, fn) {
      assert.ok(++working <= LIMIT, '"working" should be below "LIMIT"' + working + ' ' + LIMIT);
      setTimeout(function () {
        assert.ok(--working <= LIMIT, '"working" should be below "LIMIT"' + working + ' ' + LIMIT);
        result += item;
        fn();
      }, 10);
    }

    eachLimit(tasks, LIMIT, onItem, function (err) {
      assert.equal(result, 'abcdef');
      done(err);
    });

  });
});
