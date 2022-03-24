const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const assert = require('assert');
// Fibonacci: the next value is the sum of the two last numbers
// dado 3
// 0,1,1
// dado 5
// 0,1,1,2,3
(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    /**
     * generators return iterators, (.next)
     * exists 3 way to read all data of a generate function
     * with functions .next, for await and rest/spread
     */
    for await (const i of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4;
    console.log('callcount', spy.callCount);

    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    //with the spread is the same thing the for await
    const [...results] = fibonacci.execute(5);
    //[0] - 5, 0, 1
    //[1] - 4, 1, 1
    //[2] - 3, 1, 2
    //[3] - 2, 2, 3
    //[4] - 1, 3, 5
    //[5] - 0 -> stop

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
    // console.log(call);
  }
})();
