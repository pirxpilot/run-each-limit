import { describe, it } from 'node:test';
import runEachLimit from '../lib/promises.js';

describe('run-each-limit (promises)', () => {
  it('should work if tasks array is empty', async t => {
    await runEachLimit([], 2, () => t.assert.ok(false, 'should not call task'));
  });

  it('should error if limit is invalid', async t => {
    try {
      await runEachLimit(['a', 'b', 'c', 'd'], 0, () => t.assert.ok(false, 'should not call task'));
      t.assert.fail('Expected error for invalid limit');
    } catch (err) {
      t.assert.ok(err, 'Error should be thrown for invalid limit');
    }
  });

  it('should run all tasks', async t => {
    const tasks = ['a', 'b', 'c', 'd'];
    let result = '';

    async function onItem(item) {
      result += item;
      await new Promise(resolve => setTimeout(resolve, 5));
    }

    await runEachLimit(tasks, 2, onItem);
    t.assert.equal(result, 'abcd', 'All tasks should run in order');
  });

  it('should exit on error', async t => {
    const tasks = ['a', 'b', 'c', 'd'];
    let result = '';

    async function onItem(item) {
      await new Promise(resolve => setTimeout(resolve, 5));
      result += item;
      if (item === 'b') {
        throw new Error('Task error');
      }
    }

    try {
      await runEachLimit(tasks, 3, onItem);
      t.assert.fail('Expected error to be thrown');
    } catch (err) {
      t.assert.ok(err, 'Error should be thrown');
      t.assert.equal(result, 'ab', 'Execution should stop after error');
    }
  });

  it('should respect limit on error', async t => {
    const LIMIT = 4;
    const tasks = ['a', 'b', 'c', 'd', 'e', 'f'];
    let result = '';
    let working = 0;

    async function onItem(item) {
      t.assert.ok(++working <= LIMIT, `"working" should be below "LIMIT": ${working} <= ${LIMIT}`);
      await new Promise(resolve => setTimeout(resolve, 10));
      t.assert.ok(--working <= LIMIT, `"working" should be below "LIMIT": ${working} <= ${LIMIT}`);
      result += item;
    }

    await runEachLimit(tasks, LIMIT, onItem);
    t.assert.equal(result, 'abcdef', 'All tasks should run respecting the limit');
  });
});
