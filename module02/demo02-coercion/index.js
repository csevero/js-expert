true + 2;
// 3
true - 2;
// -1
'21' + true;
//'21true'
'21' - true;
//20
9999999999999999;
//10000000000000000
0.1 + 0.2;
//0.30000000000000004
3 > 2;
//true
2 > 1;
//true
3 > 2 > 1;
//false
'21' - -1;
//22
'1' == 1;
//true
3 > 2 >= 1;
//true
'B' + 'a' + +'a' + 'a';
// 'BaNaNa'

//when you use the loose equality operator, the condition will try convert the '1' to a number to check if is equal true
'1' == true;
//when you use the strict equality operator, the condition not try to convert the value and will check the value if the actual state
'1' === true;

console.assert(String(123) === '123', 'explicit convertion to string');
console.assert(123 + '', 'implicit convertion to string');

console.assert(
  ('hello' || 123) === 'hello',
  '|| returns the first element with the all are true',
);
console.assert(
  ('hello' && 123) === 123,
  '&& returns the last element of condition',
);

const item = {
  name: 'Severo',
  age: 21,
  //if is primitive type call toString first, else call the valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  //if is a number call valueOf first, else call the toString
  valueOf() {
    //if you uncomment the line below the valueOf will return a NaN because it's not a number and after it will try to run the toString()
    // return { hey: 'dude' };
    return 7;
  },
  //this is the main method of the conversion
  [Symbol.toPrimitive](coercionType) {
    // console.log('Trying to convert to', coercionType);
    const types = {
      string: JSON.stringify(this),
      number: '0007',
    };

    return types[coercionType] || types.string;
  },
};

console.assert(item + 0 === '{"name":"Severo","age":21}0');
console.assert(!!item);

console.assert('ae'.concat(item), 'ae{"name":"Severo","age":21}');

console.assert(item == String(item));

const item2 = { ...item, name: 'Zezin', age: 20 };
console.assert(item2.name === 'Zezin' && item2.age === 20);
