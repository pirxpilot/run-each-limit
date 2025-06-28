export default async function runEachLimit(items, limit, task) {
  const queue = new Array(limit).fill(Promise.resolve());
  let i = 0;
  await Promise.all(queue.map(next));

  function next(p) {
    if (i >= items.length) {
      return p;
    }
    const item = items[i++];
    return p.then(() => next(task(item)));
  }
}
