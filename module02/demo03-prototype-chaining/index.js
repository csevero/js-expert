const assert = require('assert');
const obj = {};
const arr = [];
const fn = () => {};

//internally, literal objects be explicits functions

// __proto__ is the object reference that contains all properties
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

console.log(obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log(arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log(fn.__proto__ === Function.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// the __proto__ of Object.prototype is null
console.log(obj.__proto__.__proto__);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

function Employee() {}

Employee.prototype.salary = () => 'salary**';

function Supervisor() {}

//inherits the employee instance
Supervisor.prototype = Object.create(Employee.prototype);
// console.log(Supervisor.prototype.salary());

Supervisor.prototype.profitShare = () => 'profitShare**';

function Manager() {}

Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**';

// if not call the "new", the first __proto__ will be always the function instance, without inherits our classes, to access the classes without "new", can be accessed via prototype

// console.log(Manager.prototype.profitShare());
// console.log(Manager.profitShare());

assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

// when we call with "new" the __proto__ receives the prototype
console.log(new Manager().__proto__, new Manager().profitShare());
console.log(
  'Supervisor.prototype === new Manager.__proto__.__proto__',
  Supervisor.prototype === new Manager().__proto__.__proto__,
);

const manager = new Manager();

console.log('manager.salary()', manager.salary());
console.log('manager.profitShare()', manager.profitShare());
console.log('manager.monthlyBonuses()', manager.monthlyBonuses());

// //with the first proto we access the manager prototype
// console.log(manager.__proto__);
// //with the second we access the Supervisor prototype
// console.log(manager.__proto__.__proto__);
// //with the third we access the Employee prototype (will show the salary method)
// console.log(manager.__proto__.__proto__.__proto__);
// //with the fourth we access the null prototype that returns a null object
// console.log(manager.__proto__.__proto__.__proto__.__proto__);
// // with the fifth we get a null return because doesn't have nothing inside of our proto
// console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__);

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employee.prototype,
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype,
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null,
);

class T1 {
  ping() {
    return 'ping';
  }
}

class T2 extends T1 {
  pong() {
    return 'pong';
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot';
  }
}

const t3 = new T3();

console.log(t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null);
console.log('t3.ping()', t3.ping());
console.log('t3.pong()', t3.pong());
console.log('t3.shoot()', t3.shoot());

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype,
);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null,
);
