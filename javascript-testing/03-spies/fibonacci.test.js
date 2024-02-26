const Fibonacci = require('./src/fibonacci');
const assert = require('assert');
const sinon = require('sinon');

// Fibonacci Test: 0 1 1 2 3 5 8 13 21 34 55 89 144

(async () => {
  {
    const expectedCallCount = 4
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    for await (const i of fibonacci.execute(3)) {};
    
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const expectedResult = [0, 1, 1, 2, 3, 5, 8, 13]
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(8)

    const { args } = spy.getCall(2);
    const expectedParams = Object.values({ input: 6, current: 1, next: 2 })
    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
})(); 