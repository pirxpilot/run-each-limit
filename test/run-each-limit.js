const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const eachLimit = require('../');

describe('run-each-limit', () => {
  it('should work if tasks array is empty', (_, done) => {
    eachLimit(
      [],
      2,
      () => {
        assert.ok(false, 'should not call task');
      },
      done
    );
  });

  it('should run all task', (_, done) => {
    const tasks = ['a', 'b', 'c', 'd'];
    let result = '';

    function onItem(item, fn) {
      result += item;
      setTimeout(fn, 5);
    }

    eachLimit(tasks, 2, onItem, err => {
      assert.equal(result, 'abcd');
      done(err);
    });
  });

  it('should exit on error', (_, done) => {
    const tasks = ['a', 'b', 'c', 'd'];
    let result = '';

    function onItem(item, fn) {
      setTimeout(() => {
        result += item;
        fn(item === 'b');
      }, 5);
    }

    eachLimit(tasks, 1, onItem, err => {
      assert.ok(err);
      assert.equal(result, 'ab');
      done();
    });
  });

  it('should respect limit on error', (_, done) => {
    const LIMIT = 4;
    const tasks = ['a', 'b', 'c', 'd', 'e', 'f'];
    let result = '';
    let working = 0;

    function onItem(item, fn) {
      assert.ok(++working <= LIMIT, `"working" should be below "LIMIT"${working} ${LIMIT}`);
      setTimeout(() => {
        assert.ok(--working <= LIMIT, `"working" should be below "LIMIT"${working} ${LIMIT}`);
        result += item;
        fn();
      }, 10);
    }

    eachLimit(tasks, LIMIT, onItem, err => {
      assert.equal(result, 'abcdef');
      done(err);
    });
  });
});
