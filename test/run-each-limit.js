var should = require('should');
var runEachLimit = require('../');

describe('run-each-limit node module', function () {
  it('must have at least one test', function () {
    runEachLimit();
    should.fail('Need to write tests.');
  });
});
