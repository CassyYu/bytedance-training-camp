// 浏览器天然支持 esm
// vue 它不理解
// ./foo 理解不了 路径必须是全的
// 引入 style.css 也不能理解

import foo from './foo.js';

console.log(foo);