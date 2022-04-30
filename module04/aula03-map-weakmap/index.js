const assert = require('assert');
const myMap = new Map();

//we set our Map properties with, key first (we use this key to access item before) and value
myMap
  .set(1, 'one')
  .set('Carlos', { text: 'two' })
  .set(true, () => 'hello');

const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
]);

//access the first item that key is 1
assert.deepStrictEqual(myMap.get(1), 'one');
//access the second item that key is 'Carlos'
assert.deepStrictEqual(myMap.get('Carlos'), { text: 'two' });
//access the third item that key is true, we use () after get because this item is a function, and it execute the function
assert.deepStrictEqual(myMap.get(true)(), 'hello');

//to referencing object key you need to pass the memory reference to Map
const obj = { id: 1 };
myMap.set(obj, { name: 'Carlos' });

// doesn't work because to get value of map that has a obj key you need to pass a object reference
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
//passing the object referente to get value
assert.deepStrictEqual(myMap.get(obj), { name: 'Carlos' });

//utility
//get size of our map
assert.deepStrictEqual(myMap.size, 4);

//to check if an item exists in object
//item.key = if doesn't exists return "undefined"
//if() = explicit coercion to boolean, so it will return a boolean
//the correct way using Object is ({name: 'Carlos'}).hasOwnProperty('name')

//to check if an item exists in Map use .has
assert.ok(myMap.has(obj));

//to remove an item in object
// delete item.id
// this is a bad way to JS performance

//to remove an item of Map, we can use, we can use .delete, this method will return a boolean, if item doesn't exists on Map will throw an error
assert.ok(myMap.delete(obj));

//to get values of the Map, you can use the spread, it will return the keys and value, on assertion if you don't use the JSON.stringify will throw an error because even if the results are the same, the reference doesn't are.
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, 'one'],
    ['Carlos', { text: 'two' }],
    [true, () => {}],
  ]),
);

//with for we can key key and value splitted and use each
// for (const [key, value] of myMap) {
//   console.log(key, value);
// }

//Object is unsecure, we can replace the native behavior of it easiest
// ({}).toString() === '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'

// any key can collide with inherits properties, how
// constructor, toString, valueOf and etc.

//in this object we're replacing the toString behavior default
const actor = {
  name: 'Xuxa',
  toString: 'Queen: Xuxa',
};

//even if us replacing some behavior default, when we assign this object to map the behavior default works normally, because map doesn't have name restrictions
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

//to clear an obj we need to reassign it

//to clean a map we need to use .clear()
myMap.clear();

assert.deepStrictEqual([...myMap.keys()], []);

// --WeakMap

// The weakMap is used in specific cases
// It has almost of Map benefits
// but: weakMap isn't iterable
// it's more light and prevents memory leaks, different of Map when instances out of weakMap, all are clear

const weakMap = new WeakMap();

const hero = { name: 'Flash' };

//weakMap has just 4 methods, similar to Map
// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.has(hero);
// weakMap.delete(hero);
