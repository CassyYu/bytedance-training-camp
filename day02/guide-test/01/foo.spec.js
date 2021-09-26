const foo = require('./foo')
const bar = require('./bar');
const { ExpectationFailed } = require('http-errors');

// mock
jest.mock("./bar.js", () => {
  // function -> 属性
  return jest.fn();
})

test('foo', () => {
  foo();

  // 看看 bar 有没有被调用
  expect(bar).toHaveBeenCalled();
})

// 前端做测试时，一般 mock
// axios -> call other function