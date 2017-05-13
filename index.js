module.exports = runEachLimit;

function runEachLimit(items, limit, task, done) {

  var pending = items.length;
  var working = 0;
  var index = 0;
  var completed = false;


  if (pending === 0) {
    // empty array - nothing to do
    return done();
  }

  if (limit <= 0) {
    return done('limit has to be > 0');
  }

  function taskDone(err) {
      pending -= 1;
      working -= 1;
      if (completed) {
        // we are already done with this
        return;
      }
      if (err || pending === 0) {
        completed = true;
        return done(err);
      }
      if (working <= limit && index < items.length) {
        next();
      }
  }

  function next() {
    var item = items[index++];
    working += 1;
    task(item, taskDone);
  }

  var jumpStart = Math.min(limit, items.length);
  while(jumpStart--) {
    next();
  }
}
