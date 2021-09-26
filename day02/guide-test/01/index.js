// 自动化测试之前

// 1. 你平时是有做测试的
// 自动化测试 就是用脚本去自动化帮助我们去测试（单元测试）
const add = require("./add.js");

const a = 1;
const b = 1;

const r = add(a, b);
console.log(r === 2);