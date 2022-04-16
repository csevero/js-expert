const assert = require('assert');

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  //when we use the yield* the generator understand that function must be executed, if you don't use the * with the yield the generator doesn't will be execute the function
  yield* calculation(20, 10);
}

const generator = main();

//when you execute a generator, it will print the first yield argument, the structure is { value: 'xxx', done: boolean}, the done just is true when all functions yields are returned
assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

//forms to get all yields value of function generator without use .next() every time.
//we can use the Array.from(<function_generator>) to return an array with function generator result
assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200]);
//we can use the rest spread to return the function generator result
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200]);

//async iterators
const { readFile, stat, readdir } = require('fs/promises');

function* promiseField() {
  yield readFile(__filename);
  yield Promise.resolve('Hey dude');
}

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { value: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const directories = await readdir(__dirname);
  yield { directories };
}

//forms to resolve a promise inside generator function

//we can use Promise.all to get results
// Promise.all([...promiseField()]).then(results =>
//   console.log('promiseField', results),
// );

//we can use a closure to execute and use for await to get results
// (async () => {
//   for await (const item of promiseField()) {
//     console.log('for await', item);
//   }
// })();
(async () => {
  for await (const item of systemInfo()) {
    console.log('for await', item);
  }
})();
