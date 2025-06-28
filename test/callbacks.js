import { describe, it } from 'node:test';
import eachLimit from '../lib/callbacks.js';

describe('run-each-limit (callback)', () => {
  it('should work if tasks array is empty', (t, done) => {
    eachLimit([], 2, () => t.assert.ok(false, 'should not call task'), done);
  });

  it('should error if limit is invalid', (t, done) => {
    eachLimit(
      ['a', 'b', 'c', 'd'],
      0,
      () => t.assert.ok(false, 'should not call task'),
      err => {
        t.assert.ok(err);
        done();
      }
    );
  });

  it('should run all task', (t, done) => {
    const tasks = ['a', 'b', 'c', 'd'];
    let result = '';

    function onItem(item, fn) {
      result += item;
      setTimeout(fn, 5);
    }

    eachLimit(tasks, 2, onItem, err => {
      t.assert.equal(result, 'abcd');
      done(err);
    });
  });

  it('should exit on error', (t, done) => {
    const tasks = ['a', 'b', 'c', 'd'];
    let result = '';

    function onItem(item, fn) {
      setTimeout(() => {
        result += item;
        fn(item === 'b');
      }, 5);
    }

    eachLimit(tasks, 3, onItem, err => {
      t.assert.ok(err);
      t.assert.equal(result, 'ab');
      done();
    });
  });

  it('should respect limit on error', (t, done) => {
    const LIMIT = 4;
    const tasks = ['a', 'b', 'c', 'd', 'e', 'f'];
    let result = '';
    let working = 0;

    function onItem(item, fn) {
      t.assert.ok(++working <= LIMIT, `"working" should be below "LIMIT"${working} ${LIMIT}`);
      setTimeout(() => {
        t.assert.ok(--working <= LIMIT, `"working" should be below "LIMIT"${working} ${LIMIT}`);
        result += item;
        fn();
      }, 10);
    }

    eachLimit(tasks, LIMIT, onItem, err => {
      t.assert.equal(result, 'abcdef');
      done(err);
    });
  });
});
