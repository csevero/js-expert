'use strict';
// the reflect always ensure security and semantic to our code

const assert = require('assert');

const myObj = {
  add(myValue) {
    //to get the arg1 and arg2 when we call this function we need to pass this arguments
    return this.arg1 + this.arg2 + myValue;
  },
};

// Function.prototype.apply = () => {
//   throw new TypeError('Eita!');
// };

// myObj.add.apply = () => {
//   throw new TypeError('Deu ruim');
// };

//using the .apply first we pass our data context, in this case, our function waits the arg1 and arg2, and the second parameter is the parameter of function, in this case, the myValue
assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 100 }, [100]), 210);

//in some cases it can be happen, somebody change the default behavior of our .apply for example and broking all application(rare)
// Function.prototype.apply = () => {
//   throw new TypeError('Eita!');
// };

//also, somebody can change the default behavior of our .apply of our function to intercept our data
myObj.add.apply = () => {
  throw new TypeError('Deu ruim');
};

assert.throws(() => myObj.add.apply({}, []), {
  name: 'TypeError',
  message: 'Deu ruim',
});

//using reflect method
// -- using the apply, even we replacing the method .apply of our function, the .apply of reflect works normally
const result = Reflect.apply(myObj.add, { arg1: 20, arg2: 20 }, [100]);
assert.deepStrictEqual(result, 140);

// -- defineProperty -- start
function MyDate() {}

//with defineProperty method, we can set methods to some function, in this case it can make with Object or Reflect, both works of the same manner, first property is our function, second it the name of property and third is the return of property
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' });
Reflect.defineProperty(MyDate, 'withReflect', {
  value: () => 'Hey brotha!',
});

assert.deepStrictEqual(MyDate.withObject(), 'Hey there');
assert.deepStrictEqual(MyDate.withReflect(), 'Hey brotha!');

// -- defineProperty -- end

// -- deleteProperty --start

const withDelete = { user: 'Carlos' };
//it's a bad way you need to avoid use this, because affects the JS performance
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflect = { user: 'Joao' };
//it's the better way to remove a property of some object, without affect the JS performance
Reflect.deleteProperty(withReflect, 'user');

assert.deepStrictEqual(withReflect.hasOwnProperty('user'), false);

// -- deleteProperty - end

// -- get - start

//without reflect we can do a get in anything, but the correct is just do a get in objects that has a reference, it will return an undefined
assert.deepStrictEqual((1)['userName'], undefined);

//with reflect it will throw a error to us
assert.throws(() => Reflect.get(1, 'userName'), TypeError);

// -- get - end

// -- has - start

//in normal obj, we can use 'in' to check if a key exists on our object (<key> in <obj>)
assert.ok('superman' in { superman: '' });

//with reflect we can use .has to check, Reflect.has(<obj>, <key>)
assert.ok(Reflect.has({ batman: '' }, 'batman'));

// -- has - end

// -- ownKeys - start

const user = Symbol('user');
const databaseUser = {
  id: 1,
  //we're using the Symbol.for, to after on assert we don't need to pass referente
  [Symbol.for('password')]: 123,
  [user]: 'carlinho',
};

// with object methods, to access properties and symbols, we need to do two requests
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

//with Reflect, we need use just one method to get properties and symbols
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [
  'id',
  Symbol.for('password'),
  user,
]);

// -- ownKeys - end
