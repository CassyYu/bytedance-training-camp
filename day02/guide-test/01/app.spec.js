const add = require('./add');

// 三部曲
// input && output
// function
// output
//  1. return value
//  2. call other function
//  3. change state
//  4. throw error

test('should 1+1 = 2', () => {
  // 单测三部曲
  // 1. 准备测试数据 -> given
  const a = 1;
  const b = 1;
  // 2. 触发测试动作 -> when
  const r = add(a, b);
  // 3. 验证 -> then
  expect(add(1, 1)).toBe(2);
  // jest —> 匹配器的概念
})