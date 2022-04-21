const assert = require('assert');

// keys
const uniqueKey = Symbol('userName');
const user = {};

user['userName'] = 'value for normal Objects';
user[uniqueKey] = 'value for Symbol';

// console.log('getting normal object', user.userName);
// //the next console will return undefined because the Symbol('userName') doesn't be found on address memory
// console.log('getting normal object', user[Symbol('userName')]);
// //the next console will return the Symbol text because we're referencing the address memory to user object
// console.log('getting normal object', user[uniqueKey]);

assert.deepStrictEqual(user.userName, 'value for normal Objects');
assert.deepStrictEqual(user[uniqueKey], 'value for Symbol');
assert.deepStrictEqual(user[Symbol('uniqueKey')], undefined);

//get all symbols that has in our user object
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - bad practice
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);

// Well know Symbols
const obj = {
  //iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        //remove the last element and return array
        value: this.items.pop(),
      };
    },
  }),
};

assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

//we can use Symbol to create private methods/properties in objects, class, functions
const kItems = Symbol('kItems');

//when we call this class it populate the kItems
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }
  [Symbol.toPrimitive](coercionType) {
    console.log(coercionType);
    if (coercionType !== 'string') throw new TypeError();

    const itens = this[kItems].map(item =>
      new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(item),
    );

    return new Intl.ListFormat('pt-BR', {
      style: 'long',
      type: 'conjunction',
    }).format(itens);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms));

    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  //we can replace the default behavior of class, for example when we call the Object.prototype.toString.call(myDate), by default it will return '[object Object'] with this code above we replace this default behavior and will return '[object WHAT?]'
  get [Symbol.toStringTag]() {
    return 'WHAT?';
  }
}

const myDate = new MyDate([2020, 03, 01], [2018, 02, 02]);
const expectedDates = [new Date(2020, 03, 01), new Date(2018, 02, 02)];

//if we print the value of myDate we see the Symbol item, and if we want to see specific object we can use the myDate[kItems] because we need to pass the Symbol that we create above
// console.log(myDate[kItems]);

//we can change the default behavior of our class when we use .toString method, instead of class return [object Object], we can change that value using the Symbol.toStringTag()
assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  '[object WHAT?]',
);

//we can use the .throws to check if something returns an error of correct type
assert.throws(() => myDate + 1, TypeError);

//when we use the Symbol.toPrimitive inside of our class, we change the normal of it to handle with conversions, e.g. if the conversion was different of string, we return an error that was shown above, if the conversion is string we handle if data and return it.
assert.deepStrictEqual(
  String(myDate),
  '01 de abril de 2020 e 02 de março de 2018',
);

//when we use the spread on class, we're using the Symbol.iterator method
assert.deepStrictEqual([...myDate], expectedDates);

// (async () => {
//   for await (const item of myDate) {
//     console.log('asyncIterator', item);
//   }
// })();

//in some cases that we need to use async iterators we can use this way, in our class we have the async *[Symbol.asyncIterator]() that is responsible for handle if async iterator method
(async () => {
  const dates = [];
  for await (const date of myDate) {
    dates.push(date);
  }
  // const dates = await Promise.all([...myDate]);
  const expectedDatesInISOString = expectedDates.map(item =>
    item.toISOString(),
  );

  assert.deepStrictEqual(dates, expectedDatesInISOString);
})();
