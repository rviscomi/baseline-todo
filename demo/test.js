// TODO(baseline/scheduler) Remove this function.
function yieldToMain() {
  if (globalThis.scheduler?.yield) {
    return scheduler.yield();
  }

  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

async function example() {
  // TODO(baseline/scheduler) Use scheduler.yield directly without fallbacks.
  await yieldToMain();
}
