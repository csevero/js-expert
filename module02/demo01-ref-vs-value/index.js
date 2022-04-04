const { deepStrictEqual } = require('assert');
let counter = 0;
let counter2 = counter;

counter2++;
//? -> the result is 0 because for each variable was reserved distinct memory address, so the variables is

const item = { counter: 0 };
const item2 = item;
//? -> the result is counter:1 for both, because in this case an object is stored in memory heap, and it manage the data differently

//primitive type generate a copy in memory
deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

//referente type, copy the memory address and point to the same address
item2.counter++;
deepStrictEqual(item2, { counter: 1 });
item.counter++;
deepStrictEqual(item, { counter: 2 });

//to solve the problem of memory address we can use the follow example
// const customer = Object.create({ ...object });
// customer.age = 20;
//with the code above we grant that our new object doesn't change some data of the original object