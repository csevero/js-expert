import Benchmark from 'benchmark';
import CartPriceNew from './cart-id-price-new.js';
import CartPriceOld from './cart-id-price-old.js';
// import CartRmPropOld from './cart-rm-prop-old.js';
// import CartRmPropNew from './cart-rm-prop-new.js';
// import CartOld from './cart-id-old.js';
// import CartNew from './cart-id-new.js';
import database from '../database.js';

const suite = new Benchmark.Suite();

// suite
//   .add('Cart#cartIdUUID', function () {
//     new CartOld();
//   })
//   .add('Cart#cartIdCrypto', function () {
//     new CartNew();
//   })
//   .on('cycle', event => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//   })
//   .run();

// const data = {
//   products: [
//     {
//       id: 'ae',
//       n: undefined,
//       abc: undefined,
//       a: null,
//       b: 123,
//     },
//     {
//       id: 'ae',
//       n: undefined,
//       abc: undefined,
//       a: null,
//       b: 123,
//     },
//   ],
// };

// suite
//   .add('Cart#rmPropMapReduce', function () {
//     new CartRmPropOld(data);
//   })
//   .add('Cart#rmEmptyPropsFor', function () {
//     new CartRmPropNew(data);
//   })
//   .on('cycle', event => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//   })
//   .run({ async: false });

suite
  .add('Cart#calcPriceMapReduce', function () {
    new CartPriceOld(database);
  })
  .add('Cart#calcPriceFor', function () {
    new CartPriceNew(database);
  })
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: false });
