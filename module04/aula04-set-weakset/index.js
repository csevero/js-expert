const assert = require('assert');

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
//join two arrays without set the data can be repeat
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3, ['0', '1', '2', '2', '0', '3']);

//with Set, we've two ways to use, iterable on items and adding on set object
const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);

//or using the spread to join two arrays to Set, this way is beautiful!
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  '0',
  '1',
  '2',
  '3',
]);

//to check if an item exists inside of an array
// [].indexof('1') !== -1 or [0].includes(0)

//with set we need to use .has to check if an item exists inside of it
assert.ok(set.has('3'));

//with Set we can check just if an item exists, but we don't can be intercept it
//but in the documentation has some examples showing how to intercept data

const users01 = new Set(['erick', 'carlos']);
const users02 = new Set(['carlos', 'julho']);

//getting the item that has in both array
const intersection = new Set([...users01].filter(user => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['carlos']);

//getting the different between two arrays, with filter returning just the items that doesn't have on other array
const difference = new Set([...users01].filter(user => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ['erick']);

//getting the union of arrays
const union = new Set([...users01, ...users02].filter(user => user));
assert.deepStrictEqual(Array.from(union), ['erick', 'carlos', 'julho']);

// --weakSet

//the same concept of WeakMap
//isn't iterable
//just has simple methods

const user = { id: 1 };
const user2 = { id: 2 };

const weakSet = new WeakSet([user]);

weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);
