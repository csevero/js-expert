import timers from 'timers/promises';

const timeoutAsync = timers.setTimeout;

// const results = ['1', '2'].map(async item => {
//   console.log('starting process');
//   await timeoutAsync(100);
//   console.count('debug');
//   console.log(await Promise.resolve('timeout order!'));
//   await timeoutAsync(100);
//   console.count('debug');

//   return parseInt(item) * 2;
// });

// console.log(await Promise.all(results));

setTimeout(async () => {
  console.log('starting process');
  await timeoutAsync(100);
  console.count('debug');
  console.log(await Promise.resolve('timeout order!'));
  await timeoutAsync(100);
  console.count('debug');

  await Promise.reject('promise reject on timeout');
}, 1000);

const throwError = msg => {
  throw new Error(msg);
};

try {
  console.log('hey');
  throwError('error dentro do try catch');
} catch (err) {
  console.log('pego no catch', err.message);
} finally {
  console.log('execute after all');
}

//this event is used to capture an unhandled error on application, this avoids that our application crashes
process.on('unhandledRejection', err => {
  console.log('unhandledRejection', err.message || err);
});

//this event is used to capture errors without context
process.on('uncaughtException', err => {
  console.log('uncaughtException', err.message || err);
});

//if the promise reject is inside of some context, it'll be captured by unhandledRejection
setTimeout(async () => {
  await Promise.reject('promised rejected!');
});
//but if the promise reject is on the global context, it'll be captured by uncaughtException
// await Promise.reject('promised rejected!');

setTimeout(() => {
  throwError('error fora do catch');
});
